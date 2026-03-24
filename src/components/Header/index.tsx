import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter, FaTumblr } from "react-icons/fa";
import { SiQiita } from "react-icons/si";

const socials = [
  {
    name: "Twitter",
    link: "https://twitter.com/intent/user?user_id=177458221",
    icon: FaTwitter,
  },
  {
    name: "Tumblr",
    link: "https://tk1024.tumblr.com",
    icon: FaTumblr,
  },
  {
    name: "Qiita",
    link: "https://qiita.com/tk1024",
    icon: SiQiita,
  },
  {
    name: "Github",
    link: "https://github.com/tk1024",
    icon: FaGithub,
  },
];

export const Header = () => {
  return (
    <header className="border-b border-cream-300">
      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="rounded-full overflow-hidden w-9 h-9 flex-shrink-0 ring-2 ring-cream-300 group-hover:ring-forest/30 transition-all duration-300">
            <Image alt="" width={248} height={248} src={"/icon.jpg"} />
          </div>
          <div>
            <span className="font-serif text-xl text-ink tracking-tight group-hover:text-forest transition-colors duration-200">
              tk1024.net
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.link}
              title={s.name}
              className="w-8 h-8 rounded-full flex justify-center items-center text-ink-faint hover:text-forest hover:bg-forest-pale transition-all duration-200"
            >
              <s.icon size={"0.95rem"} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};