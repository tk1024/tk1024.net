import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-6 px-4 text-center text-xs text-gray-400">
      <div className="flex items-center justify-center gap-4">
        <span>&copy; {new Date().getFullYear()} tk1024.net</span>
        <a
          href="https://github.com/tk1024/tk1024.net"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
        >
          <FaGithub />
          <span>Source</span>
        </a>
      </div>
    </footer>
  );
};