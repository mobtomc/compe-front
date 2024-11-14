// Navbar.jsx
//bg-indigo-600
const Navbar = () => {
  return (
    <nav className="w-full flex justify-center items-center">
      <div className="z-10 bg-slate-800 mt-6 w-[90%] rounded-2xl items-center justify-between flex px-8 py-4">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-400 animate-pulse text-4xl font-extrabold">Site Scribe</h1>
        <div className="space-x-4">
          <a href="#home" className="text-white text-xl font-semibold">
            Home
          </a>
          <a href="#scraper" className="text-white text-xl font-semibold">
            Scraper
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
