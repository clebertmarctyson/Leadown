import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  applicationName: "Leadown",
  title: "Leadown - Forge Your Path, Own Your Knowledge.",
  description:
    "Where learning becomes an enriching journey. Our dynamic platform empowers you to shape a unique educational path, unlocking knowledge, personal growth, and success. Join Leadown and explore the limitless possibilities of learning tailored just for you.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          (roboto.className, "bg-background text-foreground px-4 md:px-24")
        }
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
