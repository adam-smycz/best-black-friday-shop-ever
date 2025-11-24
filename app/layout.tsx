import type { Metadata } from "next";
import "./globals.css";
import FloatingCartButton from "@/components/FloatingCartButton";
import { Toaster } from "sonner";

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
        <Toaster
          position="top-center"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgb(17 24 39)',
              border: '1px solid rgb(55 65 81)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}
