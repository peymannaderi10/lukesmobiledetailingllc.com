import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Luke's Mobile Detailing",
  description: "See what our customers have to say about our professional mobile detailing services.",
  // Disable unnecessary preloads
  other: {
    "next-unused-modules": "2ce52bb406ef558a.css",
  },
};

export default function ReviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 