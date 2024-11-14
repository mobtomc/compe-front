// Footer.jsx
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        {/* Left Side: Logo and Description */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-400">
            Site Scribe
          </h3>
          <p className="text-gray-400 mt-2">
            Your go-to tool for content analysis and improvement with AI-powered
            insights.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex space-x-8 text-gray-400 text-sm mt-4 md:mt-0">
          <a
            href="#about"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#features"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Site Scribe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
