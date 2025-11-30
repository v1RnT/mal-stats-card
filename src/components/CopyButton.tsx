"use client";

import { useState } from "react";
import { CopyButtonProps } from "../types/CopyButtonProps";

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 rounded bg-neutral-800 px-3 py-1 text-xs font-medium text-white hover:bg-neutral-700 transition-all border border-neutral-700"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};
