'use client'

import Link from "next/link";
import Logo from "../ui/logo";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { FaInstagram, FaYoutube, FaDiscord, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export default function Footer() {
  // Function to open Tawk.to chat widget
  const openTawkChat = () => {
    if (typeof window !== 'undefined' && (window as any).Tawk_API) {
      (window as any).Tawk_API.maximize()
    }
  }

  // Data for link sections using mapping
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        // { label: "Tasks / Projects", href: "#" },
        // { label: "Minutes Utilisation", href: "#" },
        // { label: "Billing & Subscription", href: "#" },
        { label: "User Dashboard", href: "/client-dashboard" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Support Chat", href: "#", onClick: openTawkChat },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaXTwitter className="h-4 w-4" />,
      label: "X (Twitter)",
      href: "https://twitter.com/knackstersco",
    },
    {
      icon: <FaYoutube className="h-4 w-4" />,
      label: "YouTube",
      href: "https://www.youtube.com/@KnackstersLab",
    },
    {
      icon: <FaInstagram className="h-4 w-4" />,
      label: "Instagram",
      href: "#", // TODO: Add your Instagram URL
    },
    {
      icon: <FaDiscord className="h-4 w-4" />,
      label: "Discord",
      href: "#", // TODO: Add your Discord URL
    },
    {
      icon: <FaLinkedin className="h-4 w-4" />,
      label: "LinkedIn",
      href: "#", // TODO: Add your LinkedIn URL
    },
  ];
  

  return (
    <footer className="bg-[#1f1f1f] text-zinc-100 border-t border-zinc-800 mt-0">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main content section */}
        <div className="flex flex-col gap-10 py-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-md space-y-4">
            {/* Added mb-20 here as requested */}
            <div className="mb-15">
              <Logo/>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 font-lato">
              Empowering your business with expert talent and AI-powered tools for unmatched results.
            </p>
          </div>

          {/* Link columns - using mapping */}
          <div className="flex flex-1 flex-wrap gap-10 text-sm md:justify-between pl-10">
            {linkSections.map((section, index) => (
              <div key={index} className="space-y-3 min-w-[120px]">
                <h4 className="font-semibold mb-8 font-lato">{section.title}</h4>
                <ul className="space-y-2 text-zinc-400 flex flex-col gap-5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="transition-colors hover:text-[#fc882f] font-lato text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-[#fc882f] font-lato"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section - copyright and social media */}
        <div>
          <div className="flex flex-col items-center justify-between gap-4 py-4 text-xs text-zinc-500 md:flex-row">
            <p className="font-lato">© 2026 Knacksters. All rights reserved.</p>

            <div className="flex items-center gap-4 text-zinc-400">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="transition-colors hover:text-[#fc882f]"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}