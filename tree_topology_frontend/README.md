# Tree Topology Reconstruction Tool (Client-only)

A single-screen Next.js (App Router) app that reconstructs a tree’s parent array from a laminar family of subtree sets and visualizes it as an SVG. All logic runs in the browser—no backend.

## Run locally

- Install deps: `npm install`
- Dev server: `npm run dev`
- Open http://localhost:3000

## Input formats

You can paste the subtree sets in either format:

1) JSON array of arrays:
```
[[1,2,3],[2],[3]]
```

2) Newline-separated sets (commas or spaces):
```
1,2,3
2
3
```

Assumptions:
- Nodes are labeled `1..n` contiguously.
- There are exactly `n` sets (one per node).
- Each set `S_i` includes `i` (self-inclusion).
- The family is laminar (any two sets are nested or disjoint).
- Exactly one set equals the universe of nodes (the root’s subtree).

## Output

- Parent array: `parents[i-1]` is the parent of node `i`; the root has `-1`.
- SVG visualization: layered layout by depth, root highlighted.

## Theme

Ocean Professional:
- Primary `#2563EB`
- Accent `#F59E0B`
- Error `#EF4444`
- Background `#f9fafb`
- Surface `#ffffff`
- Text `#111827`

Styling uses Tailwind CSS utility classes and small component classes defined in `globals.css`.
