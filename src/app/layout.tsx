/**
 * Root Layout Component
 *
 * This is the main layout wrapper for the entire application.
 * It provides the global structure, theme providers, and common UI elements.
 *
 * Features:
 * - Global theme provider setup
 * - Toast notifications
 * - Responsive design wrapper
 * - Glass morphism background
 */

import type { Metadata } from "next";
import GlassPane from "@/components/glass-pane";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/providers";

// Application metadata for SEO and browser
export const metadata: Metadata = {
  title: "Project Management App",
  description: "A modern project management application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <main className="p-2 sm:p-4 md:p-6 min-h-screen  theme-dark">
            <GlassPane className="w-full min-h-[80vh] px-3 py-3 sm:px-4 sm:py-4">
              <div className="flex min-h-[80vh] justify-center items-center">
                {children}
              </div>
              <Toaster />
            </GlassPane>
          </main>
        </Providers>
      </body>
    </html>
  );
}
