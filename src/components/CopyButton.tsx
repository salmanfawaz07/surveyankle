"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full md:w-auto px-6 py-3 rounded-lg font-bold text-white transition ${
        copied
          ? "bg-green-600"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {copied ? "✓ COPIED!" : "COPY CODE"}
    </button>
  );
}
