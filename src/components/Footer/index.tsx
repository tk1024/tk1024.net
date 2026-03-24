import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t border-cream-300 mt-16">
      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-8 flex items-center justify-between text-xs text-ink-faint">
        <span>&copy; {new Date().getFullYear()} tk1024.net</span>
        <a
          href="https://github.com/tk1024/tk1024.net"
          className="inline-flex items-center gap-1.5 hover:text-forest transition-colors duration-200"
        >
          <FaGithub />
          <span>Source</span>
        </a>
      </div>
    </footer>
  );
};