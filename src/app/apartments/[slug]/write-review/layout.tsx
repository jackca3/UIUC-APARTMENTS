import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write a Review | Apt.ly",
  description:
    "Share a verified UIUC apartment review on Apt.ly to help other students make better housing decisions.",
};

export default function WriteReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
