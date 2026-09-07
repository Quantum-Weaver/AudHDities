"""Proves docs/sql/036-the-acid-test-ten-drawn.sql against the live base without
changing it: the three functions run inside one block that ends by raising, so
Postgres rolls everything back and hands the checks out through the message.

    python prove-036.py            -> prints the checks, writes results-036.json

Reads SUPABASE_ACCESS_TOKEN and SUPABASE_URL_SUPERPOSITION from the bridge's
.env by path; nothing from it is printed."""
import json
import re
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
HOUSE = HERE.parents[4]
SQL = HOUSE / "AudHDities" / "docs" / "sql" / "036-the-acid-test-ten-drawn.sql"
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
                 "User-Agent": "audhdities-proof/036"})
    try:
        return json.load(urllib.request.urlopen(req, timeout=120)), None
    except urllib.error.HTTPError as err:
        return None, UUID.sub("<uuid>", err.read().decode("utf-8", "replace"))


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


CHECKS = r"""
  jsonb_build_object(
    'draws', (select jsonb_agg(x) from (
        select jsonb_build_object(
          'n', (r->>'total_questions')::int,
          'categories', (select count(*) from jsonb_object_keys(r->'categories')),
          'ids_distinct', (select count(distinct e->>'id') from jsonb_array_elements(r->'questions') e)
        ) as x
        from (select public.get_acid_test_questions() as r from generate_series(1,5)) d) s),
    'score_top', (
        with d as (select public.get_acid_test_questions() as r),
        p as (select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index',
                 (select idx - 1 from jsonb_array_elements(e->'options') with ordinality o(opt, idx)
                   order by (opt->>'score')::int desc limit 1))) as answers
              from d, jsonb_array_elements(d.r->'questions') e)
        select public.score_acid_test(p.answers) - 'category_scores' from p),
    'score_first_option', (
        with d as (select public.get_acid_test_questions() as r),
        p as (select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index', 0)) as answers
              from d, jsonb_array_elements(d.r->'questions') e)
        select public.score_acid_test(p.answers) - 'category_scores' from p),
    'score_empty', public.score_acid_test('[]'::jsonb),
    'three_takes_one_vessel', v_takes,
    'rows_for_vessel', v_n
  )
"""

BODY = r"""
declare
  v_user uuid; v_mid jsonb; v_top jsonb; v_low jsonb; r1 jsonb; r2 jsonb; r3 jsonb; v_takes jsonb; v_n int;
begin
  __EXECS__
  select id into v_user from public.community_profiles order by created_at limit 1;
  perform set_config('request.jwt.claims', json_build_object('sub', v_user, 'role', 'authenticated')::text, true);
  select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index', 2)) into v_mid
    from jsonb_array_elements(public.get_acid_test_questions()->'questions') e;
  select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index',
           (select idx - 1 from jsonb_array_elements(e->'options') with ordinality o(opt, idx) order by (opt->>'score')::int desc limit 1)))
    into v_top from jsonb_array_elements(public.get_acid_test_questions()->'questions') e;
  select jsonb_agg(jsonb_build_object('question_id', e->>'id', 'option_index', 0)) into v_low
    from jsonb_array_elements(public.get_acid_test_questions()->'questions') e;
  r1 := public.submit_acid_test(v_user, v_mid);
  r2 := public.submit_acid_test(v_user, v_top);
  r3 := public.submit_acid_test(v_user, v_low);
  v_takes := jsonb_build_array(
    jsonb_build_object('take', 'middle', 'persona', r1->>'persona', 'total', r1->>'total_score', 'max', r1->>'max_total'),
    jsonb_build_object('take', 'best', 'persona', r2->>'persona', 'total', r2->>'total_score', 'max', r2->>'max_total'),
    jsonb_build_object('take', 'worst', 'persona', r3->>'persona', 'total', r3->>'total_score', 'max', r3->>'max_total'));
  select count(*) into v_n from public.assessment_results where created_by = v_user and category = 'acid_test';
  raise exception 'PROOF %', (__CHECKS__);
end
"""


def main():
    src = SQL.read_text(encoding="utf-8")
    src = src[: src.index("-- CHECK")]
    stmts = statements(src)
    execs = "\n".join("execute $s%d$ %s $s%d$;" % (i, s, i) for i, s in enumerate(stmts))
    block = "do $proof$ " + BODY.replace("__EXECS__", execs).replace("__CHECKS__", CHECKS) + " $proof$;"
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
    results = json.loads(m.group(1))
    after, _ = query("select count(*) as n from public.assessment_results")
    results["assessment_results_rows_after"] = after[0]["n"]
    (HERE / "results-036.json").write_text(json.dumps(results, indent=1), encoding="utf-8", newline="\n")
    print(json.dumps(results, indent=1))


if __name__ == "__main__":
    main()
