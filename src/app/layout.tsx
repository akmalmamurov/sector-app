import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import BottomNavbar from "@/components/bottom-navbar/BottomNavbar";
import { Providers } from "@/components/providers";
import { ScrollTop } from "@/components/scroll-top";
import { RootProviders } from "./RootProviders";

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
        <RootProviders>
          <ScrollTop />
          <Providers>
            <Header />
            {children}
          </Providers>
          <div className="lg:block hidden">
            <Sidebar />
          </div>
          <div className="lg:hidden flex">
            <BottomNavbar />
          </div>
          <Toaster
            position="top-right"
            containerStyle={{
              right: "50px",
              top: "20px",
            }}
          />

          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
