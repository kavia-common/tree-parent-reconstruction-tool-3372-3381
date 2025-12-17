"use client";

import { useMemo, useState } from "react";
import InputForm from "@/components/InputForm";
import ResultsPanel from "@/components/ResultsPanel";
import ErrorAlert from "@/components/ErrorAlert";
import TreeView from "@/components/TreeView";
import { parseInput } from "@/lib/validation/parseInput";
import { validateSubtrees } from "@/lib/validation/validateSubtrees";
import { reconstructParents } from "@/lib/algorithm/reconstructParents";
import type { ReconstructionResult } from "@/lib/algorithm/types";

/**
 * Tree Topology Reconstruction Tool - client-only single-screen app.
 * Users input subtree sets, validate, reconstruct, and visualize as an SVG tree.
 */
export default function Home() {
  const [rawInput, setRawInput] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ReconstructionResult | null>(null);

  const onRun = () => {
    setErrors([]);
    setResult(null);

    try {
      const subtrees = parseInput(rawInput);
      const validation = validateSubtrees(subtrees);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }
      const reconstruction = reconstructParents(subtrees);
      if (!reconstruction.valid) {
        setErrors(reconstruction.errors ?? ["Unknown reconstruction error"]);
        return;
      }
      setResult(reconstruction);
    } catch (e) {
      const err = e as Error;
      setErrors([err?.message ?? "Unexpected error while parsing input"]);
    }
  };

  const hasResult = useMemo(() => !!result && result.valid && result.parents.length > 0, [result]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text)]">
            Tree Topology Reconstruction Tool
          </h1>
          <p className="mt-2 text-[color:var(--text-muted)]">
            Reconstruct a tree’s parent array from a laminar family of subtree sets. Client-only. No data leaves your browser.
          </p>
        </header>

        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          aria-label="Reconstruction interface"
        >
          <div className="space-y-4">
            <div className="card-surface">
              <InputForm value={rawInput} onChange={setRawInput} onRun={onRun} />
            </div>

            {errors.length > 0 && (
              <div className="card-surface">
                <ErrorAlert errors={errors} onClear={() => setErrors([])} />
              </div>
            )}

            {hasResult && result && result.valid && (
              <div className="card-surface">
                <ResultsPanel parents={result.parents} order={result.order} />
              </div>
            )}
          </div>

          <div className="card-surface min-h-[360px] flex items-center justify-center">
            {hasResult && result && result.valid ? (
              <TreeView parents={result.parents} />
            ) : (
              <div className="text-center text-[color:var(--text-muted)]">
                <p className="mb-2 font-medium">SVG Tree Preview</p>
                <p className="text-sm">
                  Enter subtree sets and click “Reconstruct” to see the tree layout here.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 text-xs text-[color:var(--text-muted)]">
          Theme: Ocean Professional · Primary #2563EB · Accent #F59E0B
        </footer>
      </div>
    </main>
  );
}
