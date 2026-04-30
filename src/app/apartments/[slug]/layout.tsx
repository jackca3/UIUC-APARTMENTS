import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apartment Details | Apt.ly",
  description:
    "See real student reviews, rent reports, and apartment details before signing a lease at UIUC.",
};

export default function ApartmentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
