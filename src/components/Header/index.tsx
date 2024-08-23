import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTumblr } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { TiHome } from "react-icons/ti";

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
    <header className="text-white my-7">
      <Link href="/">
        <h1 className="text-2xl text-center font-bold">tk1024.net</h1>
      </Link>
      <div className="w-full flex items-center justify-center mt-7 mb-5">
        <div className="rounded-full overflow-hidden lg:w-36 w-24">
          <Image alt="" width={248} height={248} src={"/icon.jpg"} />
        </div>
      </div>
      <ul className="grid grid-cols-4 mx-12">
        {socials.map((s) => (
          <li key={s.name} className="flex justify-center">
            <a
              href={s.link}
              title={s.name}
              className="w-8 h-8 bg-white rounded-full flex justify-center items-center"
            >
              <s.icon
                size={"1.2rem"}
                color="rgb(67 56 202 / var(--tw-bg-opacity))"
              />
            </a>
          </li>
        ))}
      </ul>
      <div className="text-sm my-7 text-center">
        <p>メモとリンク</p>
      </div>
      <div className="my-8 px-4">
        <hr className="border-indigo-500" />
      </div>
      <div>
        <Link href="/" className="flex justify-center items-center">
          <TiHome className="mr-2" /> Home
        </Link>
      </div>
    </header>
  );
};
