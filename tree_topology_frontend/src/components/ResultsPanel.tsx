"use client";

type Props = {
  parents: number[];
  order: number[];
};

/**
 * PUBLIC_INTERFACE
 * ResultsPanel shows the parent array and the processing order information.
 */
export default function ResultsPanel({ parents, order }: Props) {
  return (
    <div>
      <h2 className="section-title text-lg mb-3">Results</h2>
      <div className="grid gap-3">
        <div>
          <div className="text-sm font-semibold mb-1">Parent array</div>
          <div className="font-mono text-sm bg-[var(--bg)] border border-gray-200 rounded-md p-2">
            [{parents.join(", ")}]
          </div>
          <p className="text-xs section-subtle mt-1">
            Parent of node i is parents[i-1]; root has -1.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-1">Processing order</div>
          <div className="font-mono text-xs bg-[var(--bg)] border border-gray-200 rounded-md p-2">
            [{order.join(", ")}]
          </div>
        </div>
      </div>
    </div>
  );
}
