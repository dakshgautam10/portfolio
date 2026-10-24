import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daksh Gautam — Full-Stack Developer",
  description:
    "Portfolio of Daksh Gautam, a Computer Science student at JECRC University building full-stack MERN apps with AI integrations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500&family=Mrs+Saint+Delafield&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
