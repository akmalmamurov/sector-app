import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Sector App",
  description: "Sector technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body>
        <Header />
        {children}
        <Sidebar />
        <Footer />
      </body>
    </html>
  );
}
