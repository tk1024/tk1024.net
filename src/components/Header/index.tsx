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
    <header className="bg-indigo-700 text-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden w-10 h-10 flex-shrink-0">
            <Image alt="" width={248} height={248} src={"/icon.jpg"} />
          </div>
          <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
            tk1024.net
          </Link>
        </div>
        <nav className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.link}
              title={s.name}
              className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:opacity-80 transition-opacity"
            >
              <s.icon size={"1rem"} color="rgb(67 56 202)" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};