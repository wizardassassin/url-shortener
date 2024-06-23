"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copyText, setCopyText] = useState("Copy");

  const clickEvent = (event: any) => {
    navigator.clipboard.writeText(text);
    setCopyText("Copied");
  };

  return (
    <button
      onClick={clickEvent}
      className="hover:outline outline-2 rounded-md outline-indigo-500"
    >
      {copyText}
    </button>
  );
}
