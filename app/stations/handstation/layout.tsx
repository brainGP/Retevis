import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
};

export default function HandstationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}