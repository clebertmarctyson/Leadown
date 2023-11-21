import NavLink from "./NavLink";
import { DefaultSession } from "next-auth";

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
    name: "Fields",
    href: "/fields",
  },
];

const MenuItems = ({ session }: { session: DefaultSession }) => {
  return (
    <ul className="flex items-center gap-4">
      {menuItems.map((item) => (
        <NavLink key={item.name} href={item.href} session={session}>
          {item.name}
        </NavLink>
      ))}
    </ul>
  );
};

export default MenuItems;
