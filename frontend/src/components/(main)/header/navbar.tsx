import { BrandLogo } from "@/components/ui/brand-logo";
import { Link } from "@/providers/i18n/routing";

const navItems = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "F.A.Q",
    link: "#faq",
  },
  {
    name: "Contact",
    link: "#contact",
  },
  {
    name: "Pricing",
    link: "#pricing",
  },
  {
    name: "Demos",
    link: "/arts-1",
  },
];

const Navbar: React.FC = () => {
  return (
    <nav className="">
      <ul className="flex items-center gap-8 text-sm tracking-wide">
        <BrandLogo />
        {navItems.map((item, index) => (
          <li
            key={item.name}
            className="hidden text-font-primary transition-all duration-300 hover:opacity-50 active:scale-95 sm:block"
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
