import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/about/AIOH.png";
import arrowIcon from "../../assets/img/logo/arrowright.svg";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/Aboutus" },
  {
    label: "Marketing",
    to: "/Marketing",
    submenu: [
      {
        label: "SEO",
        to: "/marketing/seo",
        description: "Improve your search engine ranking and visibility.",
      },
      {
        label: "Content",
        to: "/marketing/content",
        description: "Create engaging content to attract and retain customers.",
      },
    ],
  },
  {
    label: "Technology",
    to: "/Technology",
    submenu: [
      {
        label: "Web Development",
        to: "/technology/WebService",
        description: "Build responsive and robust websites and apps.",
      },
      {
        label: "Blockchain",
        to: "/technology/blockchain",
        description: "Integrate blockchain solutions for secure transactions.",
      },
    ],
  },
  {
    label: "Design",
    to: "/Design",
    submenu: [
      {
        label: "UX",
        to: "/design/ux",
        description: "Enhance user satisfaction through intuitive design.",
      },
      {
        label: "UI",
        to: "/design/ui",
        description: "Create visually appealing and user-friendly interfaces.",
      },
    ],
  },
  { label: "Contact", to: "/contact" },
];

const Header = ({ currentPath }: { currentPath: string }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const gradient = "linear-gradient(90deg, #0B385A, #02EC97, #05BBB7)";

  const toggleDropdown = (label: string) => {
    setDropdownOpen(dropdownOpen === label ? null : label);
  };

  // Handle hover with delay to prevent flickering
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!dropdownRef.current?.matches(":hover")) {
        setDropdownOpen(null);
      }
    }, 200); // 200ms delay
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-[#01213A] rounded-[20px] font-['Roboto'] text-white select-none relative z-[9999]">
      <div className="w-11/12 mx-auto flex items-center justify-between h-16 relative">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 w-auto" draggable={false} />

        {/* Desktop Nav */}
        <nav className="hidden lg:block text-[18px] font-light w-full">
          <ul ref={navRef} className="flex justify-center space-x-8">
            {navItems.map(({ label, to, submenu }) => {
              const active =
                currentPath === to ||
                submenu?.some((s) => currentPath.startsWith(s.to));
              return (
                <li
                  key={label}
                  className="relative group"
                  onMouseEnter={() => submenu && handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={to}
                    className={`flex items-center hover:text-[#02EC97] transition ${
                      active ? "text-[#02EC97]" : "text-white/80"
                    }`}
                  >
                    {label}
                    {submenu && (
                      <img
                        src={arrowIcon}
                        alt="Arrow"
                        className={`ml-1 w-2 transition-transform ${
                          dropdownOpen === label ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </NavLink>
                  <span
                    className={`absolute bottom-[-6px] left-1/2 h-[2px] bg-[#02EC97] transition-all transform -translate-x-1/2 ${
                      active ? "w-4" : "w-0"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <NavLink
          to="/contact"
          className="hidden lg:inline-block px-5 py-1.5 rounded-[30px] text-white whitespace-nowrap"
          style={{ background: gradient }}
        >
          Connect with us
        </NavLink>

        {/* Hamburger Button */}
        <button
          className="lg:hidden z-[999] w-8 h-8"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <span className="text-white text-[36px] font-light">×</span>
          ) : (
            <div className="space-y-1">
              <div className="h-0.5 w-6 bg-white rounded-sm" />
              <div className="h-0.5 w-6 bg-white rounded-sm" />
              <div className="h-0.5 w-6 bg-white rounded-sm" />
            </div>
          )}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-[#01213A] text-[18px] z-[900] pt-20 px-6">
            <ul className="flex flex-col space-y-6 items-center">
              {navItems.map(({ label, to, submenu }) => (
                <li key={label} className="w-full flex flex-col items-center">
                  <div className="w-full flex justify-center py-2">
                    {submenu ? (
                      <div className="flex items-center gap-2 text-white">
                        <span
                          onClick={() => toggleDropdown(label)}
                          className="cursor-pointer flex items-center"
                        >
                          {label}
                          <img
                            src={arrowIcon}
                            alt="Arrow"
                            className={`w-4 h-4 transition-transform ${
                              dropdownOpen === label ? "rotate-90" : ""
                            } ml-1`}
                          />
                        </span>
                      </div>
                    ) : (
                      <NavLink
                        to={to}
                        onClick={() => setMobileOpen(false)}
                        className={`${
                          currentPath === to ? "text-[#02EC97]" : "text-white"
                        }`}
                      >
                        {label}
                      </NavLink>
                    )}
                  </div>

                  {submenu && dropdownOpen === label && (
                    <ul className="mt-2 space-y-2 w-full flex flex-col items-center">
                      {submenu.map((item) => (
                        <li key={item.to} className="w-full text-center">
                          <NavLink
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-white hover:text-[#02EC97]"
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              <li className="w-full flex justify-center">
                <NavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-8 px-6 py-3 rounded-[30px] text-white text-center"
                  style={{ background: gradient }}
                >
                  Connect with us
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Dropdown */}
        {dropdownOpen &&
          navItems.find((item) => item.label === dropdownOpen)?.submenu && (
            <div
              ref={dropdownRef}
              className="hidden lg:grid absolute top-full left-0 w-full min-h-[200px] bg-[#01213A]/80 backdrop-blur-md px-20 py-12 grid-cols-3 gap-10 shadow-2xl z-[999] transition-opacity duration-200 rounded-[20px] mt-2"
              onMouseEnter={() => handleMouseEnter(dropdownOpen)}
              onMouseLeave={handleMouseLeave}
            >
              {navItems
                .find((item) => item.label === dropdownOpen)
                ?.submenu?.map((item) => (
                  <div key={item.to}>
                    <NavLink
                      to={item.to}
                      className="block text-white font-semibold text-xl hover:text-[#02EC97] mb-2"
                    >
                      {item.label}
                    </NavLink>
                    <p className="text-white/70 text-sm leading-relaxed max-w-[90%]">
                      {item.description}
                    </p>
                  </div>
                ))}
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;
