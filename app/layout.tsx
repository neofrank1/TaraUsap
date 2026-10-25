import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tara, Usap!",
  description: "Read the Gospel of the day, then talk about its key word with your household.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
