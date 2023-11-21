"use client";

import MenuItems from "./MenuItems";

import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          <MenuItems session={session!} />
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 LeadOwn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
