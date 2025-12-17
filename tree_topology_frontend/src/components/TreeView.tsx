"use client";

import { computeTreeLevels, layoutByDepth } from "@/lib/utils/treeLayout";

type Props = {
  parents: number[]; // 1-indexed nodes, parents[i-1] is parent of i; root has -1
};

/**
 * PUBLIC_INTERFACE
 * TreeView renders an SVG of the reconstructed tree. Root highlighted.
 */
export default function TreeView({ parents }: Props) {
  if (!parents?.length) return null;

  const { levels, root } = computeTreeLevels(parents);
  const layout = layoutByDepth(levels, 720, 400, 80, 20);

  const edges: Array<{ from: number; to: { x: number; y: number }[]; toNode: number }> = [];
  parents.forEach((p, idx) => {
    const child = idx + 1;
    if (p === -1) return;
    const to = layout.positions[child];
    edges.push({ from: p, to: [to], toNode: child });
  });

  const vb = `0 0 ${layout.width} ${layout.height}`;

  return (
    <svg viewBox={vb} className="w-full h-[420px]" role="img" aria-label="Tree visualization">
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(2,6,23,0.25)" />
        </filter>
      </defs>

      {/* Background gradient stripe */}
      <rect x="0" y="0" width={layout.width} height={layout.height} fill="url(#bgGrad)" rx="12" />
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(37,99,235,0.08)" />
          <stop offset="1" stopColor="rgba(243,244,246,0.7)" />
        </linearGradient>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => {
        const pFrom = layout.positions[e.from];
        const pTo = e.to[0];
        return (
          <line
            key={`edge-${i}`}
            x1={pFrom.x}
            y1={pFrom.y}
            x2={pTo.x}
            y2={pTo.y}
            stroke="#94a3b8"
            strokeWidth={2}
          />
        );
      })}

      {/* Nodes */}
      {Object.entries(layout.positions).map(([nodeStr, pos]) => {
        const node = Number(nodeStr);
        const isRoot = node === root;
        return (
          <g key={`node-${node}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <circle
              r={16}
              fill={isRoot ? "var(--primary)" : "white"}
              stroke={isRoot ? "rgba(37,99,235,1)" : "rgba(2,6,23,0.25)"}
              strokeWidth={isRoot ? 2.5 : 1.25}
              filter="url(#soft)"
            />
            <text
              x={0}
              y={4}
              textAnchor="middle"
              fontSize="12"
              fill={isRoot ? "white" : "var(--text)"}
              fontWeight={600}
            >
              {node}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
