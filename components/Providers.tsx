"use client";

import ThemeProvider from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";
import ClientProvider from "@/components/ClientProvider";

import { Toaster } from "@/components/ui/toaster";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </ClientProvider>
    </SessionProvider>
  );
};

export default Providers;
