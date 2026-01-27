'use client';



import Link from "next/link";

import { useState, useRef, useEffect } from "react";

import { Menu, X, ChevronDown } from "lucide-react";

import Logo from "../ui/logo";

import ThemeButton from "../ui/theme-button";



export default function Header() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const solutions = [
    { label: "AI Solutions", href: "/solutions/ai-solutions", icon: "🤖" },
    { label: "Cybersecurity", href: "/solutions/cybersecurity", icon: "🛡️" },
    { label: "Development & DevOps", href: "/solutions/development-devops", icon: "💻" },
    { label: "Design & Creative", href: "/solutions/design-creative", icon: "🎨" },
    { label: "Marketing", href: "/solutions/marketing", icon: "📈" },
    { label: "Healthcare & Life Sciences", href: "/solutions/healthcare-life-sciences", icon: "🏥" },
  ];

  const navLinks = [

    { label: "Solutions", href: "/#services", hasDropdown: true },

    { label: "How it works", href: "/how-it-works" },

    { label: "Benefits", href: "/#benefits" },

    { label: "Use Cases", href: "/#use-cases" },

  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsDropdownOpen(false);
      }
    }

    if (isSolutionsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSolutionsDropdownOpen]);



  const toggleMobileMenu = () => {

    setIsMobileMenuOpen(!isMobileMenuOpen);

  };



  const closeMobileMenu = () => {

    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);

  };



  return (

    <header className="w-full bg-white font-sans sticky top-0 z-[1100] flex-shrink-0 shadow-none py-3 sm:py-4 md:py-3  border-b border-[rgb(245,245,245)] text-[rgb(38,38,38)] transition-[box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          {/* Logo Section */}

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

            <Logo />

          </div>



          {/* Desktop Navigation Links */}

          <nav className="hidden min-[1073px]:flex items-center gap-6 lg:gap-8 flex-1 justify-center">

            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsSolutionsDropdownOpen(!isSolutionsDropdownOpen)}
                    className="text-sm lg:text-base font-semibold leading-[18px] tracking-normal transition-colors text-gray-text hover:text-orange flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isSolutionsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.href}
                          href={solution.href}
                          onClick={() => setIsSolutionsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange transition-colors"
                        >
                          <span className="text-xl">{solution.icon}</span>
                          <span className="font-medium font-mono">{solution.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link

                  key={link.href}

                  href={link.href}

                  className="text-sm lg:text-base font-semibold leading-[18px] tracking-normal transition-colors text-gray-text hover:text-orange"

                >

                  {link.label}

                </Link>
              )

            ))}

          </nav>



          {/* Desktop Action Buttons */}

          <div className="hidden min-[1073px]:flex items-center gap-3 md:gap-4 flex-shrink-0">

            <ThemeButton

              variant="outline"

              href="/talent-network"

              link={true}

            />

            <ThemeButton

              variant="default"

              href="/signup"

              link={true}

            />

            <Link
              href="/login"
              className="text-sm lg:text-base font-semibold leading-[18px] tracking-normal transition-colors text-gray-text hover:text-orange"
            >
              Log In
            </Link>

          </div>



          {/* Mobile Menu Button */}

          <button

            onClick={toggleMobileMenu}

            className="min-[1073px]:hidden p-2 text-gray-800 hover:text-orange transition-colors"

            aria-label="Toggle menu"

          >

            {isMobileMenuOpen ? (

              <X className="w-6 h-6" />

            ) : (

              <Menu className="w-6 h-6" />

            )}

          </button>

        </div>



        {/* Mobile Menu */}

        {isMobileMenuOpen && (

          <div className="min-[1073px]:hidden mt-4 pb-4 border-t border-[rgb(245,245,245)]">

            <nav className="flex flex-col gap-4 pt-4">

              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                      className="text-base font-semibold leading-[18px] tracking-normal transition-colors py-2 text-gray-text hover:text-orange flex items-center gap-1 w-full"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileSolutionsOpen && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {solutions.map((solution) => (
                          <Link
                            key={solution.href}
                            href={solution.href}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-orange transition-colors"
                          >
                            <span>{solution.icon}</span>
                            <span className="font-mono">{solution.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link

                    key={link.href}

                    href={link.href}

                    onClick={closeMobileMenu}

                    className="text-base font-semibold leading-[18px] tracking-normal transition-colors py-2 text-gray-text hover:text-orange"

                  >

                    {link.label}

                  </Link>
                )

              ))}

              <div className="flex flex-col gap-3 pt-2">

                <Link

                  href="/talent-network"

                  onClick={closeMobileMenu}

                  className="w-full px-4 py-2.5 text-center border-2 border-[#FF9634] text-[#FF9634] rounded-md font-medium hover:bg-orange-50 transition-colors"

                >

                  Apply as a Talent

                </Link>

                <Link

                  href="/signup"

                  onClick={closeMobileMenu}

                  className="w-full px-4 py-2.5 text-center bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-md font-medium hover:opacity-90 transition-opacity"

                >

                  Get Started

                </Link>

                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="text-base font-semibold leading-[18px] tracking-normal transition-colors py-2 text-gray-text hover:text-orange text-center"
                >
                  Login
                </Link>

              </div>

            </nav>

          </div>

        )}

      </div>

    </header>

  );

}