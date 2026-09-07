"""Proves docs/sql/037-the-acid-test-signed-out.sql two ways: inside one
rolled-back block as the anon role and then as a signed-in vessel, and through
the front door as a visitor with the publishable key and no session.

    python prove-037.py            -> prints the checks, writes results-037.json

Reads the superposition keys from the bridge's .env by path; nothing from it is
printed. The front-door walk stores nothing: a visitor's submit is refused."""
import json
import re
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
HOUSE = HERE.parents[4]
SQL = HOUSE / "AudHDities" / "docs" / "sql" / "037-the-acid-test-signed-out.sql"
ENV = HOUSE / "resonance-bridge" / ".env"
UUID = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")


def env():
    out = {}
    for line in ENV.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            out[k.strip()] = v.strip().strip('"').strip("'")
    return out


def query(sql):
    e = env()
    ref = e["SUPABASE_URL_SUPERPOSITION"].split("//")[1].split(".")[0]
    req = urllib.request.Request(
        "https://api.supabase.com/v1/projects/%s/database/query" % ref,
        data=json.dumps({"query": sql}).encode(), method="POST",
        headers={"Authorization": "Bearer " + e["SUPABASE_ACCESS_TOKEN"],
                 "Content-Type": "application/json",
                 "User-Agent": "audhdities-proof/037"})
    try:
        return json.load(urllib.request.urlopen(req, timeout=120)), None
    except urllib.error.HTTPError as err:
        return None, UUID.sub("<uuid>", err.read().decode("utf-8", "replace"))


def rpc(name, body):
    e = env()
    url = e["SUPABASE_URL_SUPERPOSITION"].rstrip("/")
    key = e["SUPABASE_PUBLISHABLE_KEY_SUPERPOSITION"]
    req = urllib.request.Request(url + "/rest/v1/rpc/" + name, data=json.dumps(body).encode(), method="POST",
                                 headers={"apikey": key, "Authorization": "Bearer " + key,
                                          "Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=30))


def statements(sql):
    """Splits on semicolons outside dollar-quoted bodies; drops comment-only text."""
    out, buf, i, tag = [], "", 0, None
    while i < len(sql):
        if tag is None:
            if sql.startswith("--", i):
                nl = sql.find("\n", i)
                i = len(sql) if nl < 0 else nl
                continue
            m = re.match(r"\$[A-Za-z_][A-Za-z0-9_]*\$|\$\$", sql[i:])
            if m:
                tag = m.group(0); buf += tag; i += len(tag); continue
            if sql[i] == ";":
                s = buf.strip()
                if s:
                    out.append(s)
                buf = ""; i += 1; continue
        elif sql.startswith(tag, i):
            buf += tag; i += len(tag); tag = None; continue
        buf += sql[i]; i += 1
    return out


BODY = r"""
declare
  v_user uuid; v_draw jsonb; v_ans jsonb; v_prev jsonb; r1 jsonb; r2 jsonb; v_row jsonb; v_n int;
begin
  __EXECS__
  execute 'set local role anon';
  v_draw := public.get_acid_test_questions();
  select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index', 2)) into v_ans
    from jsonb_array_elements(v_draw->'questions') e;
  v_prev := public.preview_acid_test(v_ans);
  execute 'reset role';
  select id into v_user from public.community_profiles order by created_at limit 1;
  execute 'set local role authenticated';
  perform set_config('request.jwt.claims', json_build_object('sub', v_user, 'role', 'authenticated')::text, true);
  r1 := public.submit_acid_test(v_user, v_ans);
  select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index', 0)) into v_ans
    from jsonb_array_elements(public.get_acid_test_questions()->'questions') e;
  r2 := public.submit_acid_test(v_user, v_ans);
  execute 'reset role';
  select jsonb_build_object('rank', result_data->>'persona_rank', 'persona', result_data->>'persona_name', 'takes', result_data->>'takes')
    into v_row from public.assessment_results where created_by = v_user and category = 'acid_test';
  select count(*) into v_n from public.assessment_results where created_by = v_user and category = 'acid_test';
  raise exception 'PROOF %', jsonb_build_object(
    'visitor_draw', jsonb_build_object('ok', v_draw->>'success', 'n', v_draw->>'total_questions'),
    'visitor_preview', jsonb_build_object('ok', v_prev->>'success', 'stored', v_prev->>'stored', 'persona', v_prev->>'persona',
                                          'total', v_prev->>'total_score', 'max', v_prev->>'max_total', 'readings', jsonb_array_length(v_prev->'readings')),
    'vessel_take_same_answers', jsonb_build_object('ok', r1->>'success', 'stored', r1->>'stored', 'persona', r1->>'persona', 'total', r1->>'total_score'),
    'vessel_take_bottom', jsonb_build_object('ok', r2->>'success', 'persona', r2->>'persona', 'total', r2->>'total_score'),
    'the_one_row', v_row, 'rows', v_n);
end
"""


def main():
    src = SQL.read_text(encoding="utf-8")
    src = src[: src.index("-- CHECK")]
    stmts = statements(src)
    execs = "\n".join("execute $s%d$ %s $s%d$;" % (i, s, i) for i, s in enumerate(stmts))
    block = "do $proof$ " + BODY.replace("__EXECS__", execs) + " $proof$;"
    rows, err = query(block)
    if not err:
        sys.exit("no exception was raised; the block did not roll back: %r" % rows)
    try:
        msg = json.loads(err).get("message", err)
    except Exception:
        msg = err
    m = re.search(r"PROOF (\{.*\})", msg, re.S)
    if not m:
        sys.exit("the proof did not come back: " + msg[:1200])
    results = {"rolled_back_block": json.loads(m.group(1))}

    draw = rpc("get_acid_test_questions", {})
    answers = [{"question_id": e["id"], "option_index": 3} for e in draw.get("questions", [])]
    prev = rpc("preview_acid_test", {"p_answers": answers})
    try:
        sub = rpc("submit_acid_test", {"p_user_id": "00000000-0000-0000-0000-000000000000", "p_answers": answers})
        refused = sub.get("success") is False
    except urllib.error.HTTPError:
        refused = True
    after, _ = query("select count(*) as n from public.assessment_results")
    results["front_door_as_visitor"] = {
        "draw_success": draw.get("success"), "draw_total_questions": draw.get("total_questions"),
        "preview_success": prev.get("success"), "preview_stored": prev.get("stored"),
        "preview_persona": prev.get("persona"), "preview_readings": len(prev.get("readings", [])),
        "submit_refused": refused, "assessment_results_rows_after": after[0]["n"],
    }
    (HERE / "results-037.json").write_text(json.dumps(results, indent=1), encoding="utf-8", newline="\n")
    print(json.dumps(results, indent=1))


if __name__ == "__main__":
    main()
