import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tree Topology Reconstruction Tool",
  description:
    "Reconstruct a tree’s parent array from a laminar family of subtree sets. Client-only Next.js app with SVG visualization.",
  applicationName: "Tree Topology Reconstruction Tool",
  authors: [{ name: "Ocean Professional UI" }],
  keywords: [
    "tree",
    "topology",
    "reconstruction",
    "laminar family",
    "graph",
    "parent array",
    "nextjs",
    "svg",
  ],
  icons: [],
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
