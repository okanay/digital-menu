import { ImageTW } from "@/components/ui/image-tw";
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
    link: "/demos",
  },
];

const Navbar: React.FC = () => {
  return (
    <nav className="">
      <ul className="flex items-center gap-8 text-sm tracking-wide">
        <Link href="/">
          <ImageTW
            className="w-40 dark:invert"
            src="/logo.png"
            alt="Menu Arts Logo"
          />
        </Link>
        {navItems.map((item, index) => (
          <li
            key={item.name}
            className="hidden transition-all duration-300 hover:opacity-50 active:scale-95 lg:block"
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
