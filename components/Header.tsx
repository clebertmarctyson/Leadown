"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { signIn, signOut, useSession } from "next-auth/react";
import { menuItems } from "@/data/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <Image
              objectFit="contain"
              src="/leadown-logo.png"
              alt="LeadOwn Logo"
              width={150}
              height={150}
            />
          </Link>
        </h1>
      </div>

      <nav className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0 md:gap-12">
        <ul className="flex items-center gap-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {sessionData?.user ? (
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={sessionData.user.image || ""} />
                  <AvatarFallback>
                    {sessionData.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuSubTrigger>
                  </DropdownMenuSub>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
