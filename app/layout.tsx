import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cartograph",
  description: "Explore the dependencies of a public GitHub repository.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Apply the saved choice before paint, including the hosted auth screens. */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('cartograph-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:'system'}catch{document.documentElement.dataset.theme='system'}` }} />
        <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up" signInForceRedirectUrl="/" signUpForceRedirectUrl="/" appearance={{ variables: {
          colorPrimary: "var(--accent)", colorBackground: "var(--surface)", colorForeground: "var(--foreground)", colorMutedForeground: "var(--muted)", colorInput: "var(--background)", colorInputForeground: "var(--foreground)", fontFamily: "var(--font-geist-sans)", fontSize: "13px", borderRadius: "4px",
        } }}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
