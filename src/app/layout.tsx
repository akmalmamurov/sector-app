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
import CartSync from "@/components/store-sync/CartSync";
import { LoadingProvider } from "@/context/LoadingContext";

export const metadata: Metadata = {
  title: "Sector Technology",
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
        <link rel="icon" type="image/png" href="/sector.png" />
        <meta name="google-site-verification" content="cFIUZDc9u_J2IHNxtKQH7MywR2wb73by2EUA5huh7S4" />
      </head>
      <body>
        <RootProviders>
          <ScrollTop />
          <Providers>
            <Header />
            <CartSync />
            <LoadingProvider>
              <div className="min-h-[80vh]">
              {children}
              </div>
          </LoadingProvider>
            <div className="lg:hidden flex">
              <BottomNavbar />
            </div>
            <div className="lg:block hidden">
              <Sidebar />
            </div>
          </Providers>

          <Toaster
            position="top-right"
            containerStyle={{
              right: "50px",
              top: "20px",
            }}
            />
          <Footer />
        </RootProviders>
        <script className="mb-16 mr-16" src="//code.jivosite.com/widget/UP0xqFFMzr" async></script>
      </body>
    </html>
  );
}
