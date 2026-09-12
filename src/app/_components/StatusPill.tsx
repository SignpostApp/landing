"use client";

import { useEffect, useState } from "react";

import {
  STATUS_LABELS,
  STATUS_URL,
  type StatusKey,
} from "./statusData";

const DOT_CLASS: Record<StatusKey, string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  downtime: "bg-red-500",
  maintenance: "bg-blue-500",
  unknown: "bg-slate-300",
};

export default function StatusPill() {
  const [status, setStatus] = useState<StatusKey | null>(null);
  const [label, setLabel] = useState(STATUS_LABELS.unknown);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/status", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data || !(data.status in DOT_CLASS)) return;
        setStatus(data.status as StatusKey);
        if (typeof data.label === "string") setLabel(data.label);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const dot = DOT_CLASS[status ?? "unknown"];
  const live = status !== null && status !== "unknown";

  return (
    <a
      href={STATUS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:text-slate-900 transition-colors w-fit"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {live && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${dot}`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {label}
    </a>
  );
}
