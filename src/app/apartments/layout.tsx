import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apartments | Apt.ly",
  description:
    "Browse UIUC apartments with verified student reviews, favorites, and building details on Apt.ly.",
};

export default function ApartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
