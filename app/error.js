"use client";

import { useEffect, useState } from "react";

// Next.js's App Router loads each route's JS on demand. If the site has been
// redeployed since this tab was opened, the browser may try to fetch a JS
// chunk that no longer exists at that URL (the new deploy renamed it) and
// throw — which otherwise looks like a dead click or a blank/broken page.
// Catching that specific case and doing one silent reload fixes it
// automatically instead of leaving the visitor stuck.
const CHUNK_ERROR_PATTERN = /ChunkLoadError|Loading chunk|dynamically imported module|Failed to fetch/i;

export default function GlobalError({ error, reset }) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const message = error?.message || "";
    const alreadyTried = sessionStorage.getItem("pakitini_chunk_reload");
    if (CHUNK_ERROR_PATTERN.test(message) && !alreadyTried) {
      sessionStorage.setItem("pakitini_chunk_reload", "1");
      setReloading(true);
      window.location.reload();
    }
  }, [error]);

  if (reloading) return null;

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Something went wrong</h2>
      <p style={{ color: "#6E6462", fontSize: 14.5, marginBottom: 22, maxWidth: 360 }}>
        Please try again, or refresh the page.
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: "#1F6F4A",
          color: "#fff",
          border: "none",
          padding: "13px 24px",
          borderRadius: 5,
          fontWeight: 700,
          fontSize: 14.5,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
