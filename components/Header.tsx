"use client";

import Link from "next/link";

import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import MenuItems from "./MenuItems";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <Image
              src="/leadown-logo.png"
              alt="LeadOwn Logo"
              width={150}
              height={150}
              className="w-full h-full"
              priority={true}
            />
          </Link>
        </h1>
      </div>

      <nav className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0 md:gap-12">
        <MenuItems />

        {session?.user ? (
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <Avatar>
              <AvatarImage src={session?.user.image!} />
              <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <Button
              variant={"destructive"}
              onClick={() => void signOut()}
              size={"sm"}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button size={"sm"} variant={"default"} onClick={() => void signIn()}>
            Sign In
          </Button>
        )}

        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
