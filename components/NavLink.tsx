"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link href={href} className={`${isActive ? "text-blue-500" : ""}`}>
      {children}
    </Link>
  );
};

export default NavLink;
