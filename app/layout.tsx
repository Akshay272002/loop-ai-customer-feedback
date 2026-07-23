import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "LOOP AI",
  description: "AI Customer Feedback Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}