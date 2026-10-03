import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpsFlow - Dispatch & Field Operations Portal",
  description:
    "Tailored internal dashboard for field logistics, equipment rental, and trade services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
