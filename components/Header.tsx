import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const signIn = {
  user: {
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
};

const Header = () => {
  const { user } = signIn;

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">LeadOwn</Link>
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

        {user ? (
          <div className="flex flex-col items-center mt-4 sm:mt-0 sm:ml-auto">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name.at(0)}</AvatarFallback>
            </Avatar>
            <span className="ml-2">{user.name}</span>
          </div>
        ) : (
          <Button asChild className="mt-4 sm:mt-0">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}

        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
