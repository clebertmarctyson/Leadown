import { Session } from "@prisma/client";
import NavLink from "./NavLink";

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

const MenuItems = () => {
  return (
    <ul className="flex items-center gap-4">
      {menuItems.map((item) => (
        <NavLink key={item.name} href={item.href}>
          {item.name}
        </NavLink>
      ))}
    </ul>
  );
};

export default MenuItems;
