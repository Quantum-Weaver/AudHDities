// components/asgard/domains/hermes/checkout/CheckoutForm.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE THRESHOLD — the exchange's completing moment                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// THE FINISHING (2026-07-31, at KP's ⚛ word "we are ready to finish
// Hermes"): the checkout's states learned the settled tongue (a threshold,
// never a transaction funnel — the register law of the doors applies to the
// moment of exchange), and the create→decorate loop gained its LAST LINK:
// "taken into your keeping" now offers THE HANGING — the kept thing goes
// home, into a room the vessel chooses, as a vessel_decoration
// (decoration_type ware/work, reference_id pointing at the kept thing).
// The loop closes: the Loom creates → the Bazaar exchanges → the home
// wears it. Everything opt-in (the offer is a button, never automatic);
// error grammar plain (what happened / it is safe to try again); law 7's
// PriceBreakdown untouched upstream.

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/yggdrasil/Button";
import { Card } from "@/components/runes/Card";
import { Spinner } from "@/components/yggdrasil/Spinner";
import { CheckCircle, AlertCircle, Home } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useVesselRoomsList } from "@/hooks/generated/hestia-core/vessel_rooms";
import { useCreateVesselDecorations } from "@/hooks/generated/hestia-core/vessel_decorations";

interface KeptThing {
  kind: "ware" | "work";
  id: string;
  name: string;
}

interface CheckoutFormProps {
  sessionId?: string;
  saleId?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function CheckoutForm({ sessionId, saleId, onSuccess, onError }: CheckoutFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [kept, setKept] = useState<KeptThing | null>(null);
  const statusRef = useRef(status);
  statusRef.current = status;

  // THE HANGING — the vessel's rooms (own-only; params memoized per the
  // house pattern: the generated hooks refetch on params identity)
  const { user } = useUser();
  const roomParams = useMemo(
    () =>
      user?.id
        ? { filters: { created_by: user.id }, sort: "display_order", order: "asc" as const }
        : undefined,
    [user?.id]
  );
  const rooms = useVesselRoomsList(roomParams);
  const { create: createDecoration } = useCreateVesselDecorations();
  const [hangRoomId, setHangRoomId] = useState("");
  const [hanging, setHanging] = useState(false);
  const [hungIn, setHungIn] = useState<string | null>(null);
  const [hangNote, setHangNote] = useState<string | null>(null);

  const effectiveSessionId = sessionId || searchParams?.get("session_id");

  useEffect(() => {
    if (!effectiveSessionId) {
      setStatus("error");
      setErrorMessage("No exchange session was found.");
      onError?.("No exchange session was found.");
      return;
    }

    let interval: NodeJS.Timeout | null = null;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/auth/checkout/session/${effectiveSessionId}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "The exchange could not be confirmed.");

        if (data.payment_status === "paid") {
          setStatus("success");
          if (data.kept) setKept(data.kept);
          onSuccess?.();
          if (interval) clearInterval(interval);
        } else if (data.status === "expired") {
          setStatus("error");
          setErrorMessage("This exchange session has closed. Nothing was taken.");
          onError?.("This exchange session has closed.");
          if (interval) clearInterval(interval);
        } else {
          setStatus("pending");
        }
      } catch (err) {
        setStatus("error");
        const msg = err instanceof Error ? err.message : "The exchange could not be confirmed.";
        setErrorMessage(msg);
        onError?.(msg);
        if (interval) clearInterval(interval);
      }
    };

    checkStatus();

    interval = setInterval(() => {
      if (statusRef.current === "pending") checkStatus();
      else if (interval) clearInterval(interval);
    }, 2000);

    return () => { if (interval) clearInterval(interval); };
  }, [effectiveSessionId]);

  const hangItHome = async () => {
    if (!kept || !hangRoomId || !user) return;
    setHanging(true);
    setHangNote(null);
    try {
      const result = await createDecoration({
        name: kept.name,
        decoration_type: kept.kind,
        reference_id: kept.id,
        room_id: hangRoomId,
        is_displayed: true,
        display_order: 0,
        created_by: user.id,
      });
      if (result.error) {
        setHangNote("It was not hung this time. It is safe to try again.");
      } else {
        const room = rooms.data.find((r) => r.id === hangRoomId);
        setHungIn(room?.name ?? "your home");
      }
    } catch {
      setHangNote("It was not hung this time. It is safe to try again.");
    } finally {
      setHanging(false);
    }
  };

  if (status === "loading") {
    return (
      <Card data={{ id: 'checkout-verify', type: 'value', title: 'Completing the exchange', value: '' }} variant="default" radius="lg" shadow="md" className="p-8 text-center">
        <Spinner className="w-8 h-8 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-star-dust mb-2">Completing the exchange</h2>
        <p className="text-star-dust/60">A moment while the exchange is confirmed.</p>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card data={{ id: 'checkout-process', type: 'value', title: 'The exchange is crossing', value: '' }} variant="default" radius="lg" shadow="md" className="p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-4">
          <Spinner className="w-6 h-6 text-warning" />
        </div>
        <h2 className="text-xl font-semibold text-star-dust mb-2">The exchange is crossing</h2>
        <p className="text-star-dust/60 mb-4">This can take a moment. Nothing is lost while it does.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Look again</Button>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card data={{ id: 'checkout-error', type: 'value', title: 'The exchange did not complete', value: '' }} variant="default" radius="lg" shadow="md" className="p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-error" />
        </div>
        <h2 className="text-xl font-semibold text-star-dust mb-2">The exchange did not complete</h2>
        <p className="text-star-dust/60 mb-4">{errorMessage || "Something interrupted it. Nothing was taken, and it is safe to try again."}</p>
        <Button onClick={() => router.back()}>Go back</Button>
      </Card>
    );
  }

  return (
    <Card data={{ id: 'checkout-success', type: 'value', title: 'Taken into your keeping', value: '' }} variant="default" radius="lg" shadow="md" className="p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-6 h-6 text-success" />
      </div>
      <h2 className="text-xl font-semibold text-star-dust mb-2">
        {kept ? `${kept.name} — taken into your keeping.` : "Taken into your keeping."}
      </h2>
      <p className="text-star-dust/60 mb-1">The exchange is complete.</p>
      {/* The third word at the going — a goodbye carrying a return inside it */}
      <p className="text-star-dust/40 text-sm italic mb-6">Gweld ti&apos;n fuan — see you soon.</p>

      {/* THE HANGING — the loop's last link, offered never imposed.
          The exchange completes at the vessel's fire. */}
      {kept && !hungIn && rooms.data.length > 0 && (
        <div className="mb-6 rounded-lg border border-star-dust/10 bg-white/5 p-4 text-left">
          <p className="mb-2 text-sm text-star-dust/70">
            Hang it in your home, if you like — it will stay where you put it.
          </p>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="hang-room">Choose a room</label>
            <select
              id="hang-room"
              value={hangRoomId}
              onChange={(e) => setHangRoomId(e.target.value)}
              className="min-w-0 flex-1 rounded border border-star-dust/20 bg-(--color-surface) px-2 py-1.5 text-sm text-star-dust"
            >
              <option value="">Choose a room…</option>
              {rooms.data.filter((r) => r.is_active).map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              disabled={!hangRoomId || hanging}
              onClick={hangItHome}
            >
              <Home className="mr-1 h-3.5 w-3.5" />
              Hang it
            </Button>
          </div>
          {hangNote && (
            <p role="status" className="mt-2 text-xs text-star-dust/50">{hangNote}</p>
          )}
        </div>
      )}
      {hungIn && (
        <p role="status" className="mb-6 text-sm text-star-dust/70">
          It hangs in {hungIn}. Your home keeps it now.
        </p>
      )}

      <div className="flex gap-3 justify-center">
        <Button onClick={() => router.push("/bazaar/creations")}>Return to the Tapestry</Button>
        <Button variant="outline" onClick={() => router.push("/vessel/home")}>Stand in your home</Button>
      </div>
    </Card>
  );
}
