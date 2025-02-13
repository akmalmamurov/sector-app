import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";

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
    <html lang="ru">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body>
        <Header />
        {children}
        <Sidebar />
        <Toaster
          position="top-right"
          containerStyle={{
            right: "50px",
            top: "20px",
          }}
          toastOptions={{
            style: {
              padding: "8px 12px",
              borderRadius: "2px",
              fontSize: "14px",
              maxWidth: "500px",
            },
            success: {
              icon: false,
            },
          }}
        />

        <Footer />
      </body>
    </html>
  );
}
