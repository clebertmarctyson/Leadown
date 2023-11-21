"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { DefaultSession } from "next-auth";

const NavLink = ({
  href,
  children,
  session,
}: {
  href: string;
  children: React.ReactNode;
  session: DefaultSession;
}) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  if (!session?.user && href === "/fields") {
    return null;
  }

  return (
    <Link href={href} className={`${isActive ? "text-blue-500" : ""}`}>
      {children}
    </Link>
  );
};

export default NavLink;
