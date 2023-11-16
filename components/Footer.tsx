import { menuItems } from "@/data/data";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          {menuItems.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link
                href={item.href}
                className="text-base text-gray-400 hover:text-gray-300"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 LeadOwn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
