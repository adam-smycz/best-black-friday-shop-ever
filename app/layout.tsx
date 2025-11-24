import type { Metadata } from "next";
import "./globals.css";
import FloatingCartButton from "@/components/FloatingCartButton";

export const metadata: Metadata = {
  title: "Best Black Friday Shop Ever",
  description: "The ultimate Black Friday shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <FloatingCartButton />
      </body>
    </html>
  );
}
