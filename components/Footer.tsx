import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bg-primary border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="block">
            <Image
              src="/logo.svg"
              alt="TMS Logo"
              width="40"
              height="40"
              className="h-8 w-auto"
            />
          </Link>
          <span>
            © {new Date().getFullYear()} Task Management System. All rights
            reserved.
          </span>
        </div>

        <div className="flex justify-between items-center gap-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/Aadityakashyap"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-85"
          >
            Developed by Aditya.
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
