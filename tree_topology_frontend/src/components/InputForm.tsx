"use client";

import { useId } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onRun: () => void;
};

/**
 * PUBLIC_INTERFACE
 * InputForm renders a textarea for subtree sets input and a run button.
 * Accepts JSON matrix or newline-based lists. Entirely client-side.
 */
export default function InputForm({ value, onChange, onRun }: Props) {
  const id = useId();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title text-lg">Input subtree sets</h2>
        <span className="code-chip text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
          Supports JSON and newline formats
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Subtree sets input
      </label>
      <textarea
        id={id}
        className="textarea"
        placeholder={`Examples:
JSON:
[[1,2,3],[2],[3]]

Newlines (one set per line):
1,2,3
2
3`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />

      <div className="mt-3 flex items-center gap-2">
        <button className="btn btn-primary" onClick={onRun}>
          Reconstruct
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => onChange("")}
          type="button"
        >
          Clear
        </button>
      </div>

      <p className="mt-3 text-sm section-subtle">
        Input represents the family of subtrees S_i for each node i. Node
        indexing must be 1..n. Each set must include its node (self-inclusion).
      </p>
    </div>
  );
}
