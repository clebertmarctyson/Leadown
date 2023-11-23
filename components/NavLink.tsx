"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
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
