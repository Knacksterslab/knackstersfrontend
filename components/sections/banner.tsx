"use client";

import { useState, useEffect } from "react";
import TalentCard from "./TalentCard";
import PrimaryButton from "../svg/primary-button";
import Link from "next/link";
import { defaultLandingContent } from "@/components/landing/landing-content";

// Feature list items with icons and descriptions
const features = [
  {
    title: "Deploy in Minutes",
    description: "Expert talent matched and ready to start—not weeks, minutes.",
    icon: "star",
  },
  {
    title: "Transparent Pricing",
    description: "From $12,500/mo for 200 hours. Scale as you grow.",
    icon: "dollar",
  },
  {
    title: "Flexible Allocation",
    description: "Spread hours across experts or focus on one priority.",
    icon: "calendar",
  },
  {
    title: "Managed for You",
    description: "Dedicated Business Manager handles everything.",
    icon: "grid",
  },
];

// Icon components
const FeatureIcon = ({ type }: { type: string }) => {
  const iconSize = 20;
  const iconColor = "#E9414C";

  switch (type) {
    case "dollar":
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <circle cx="10" cy="10" r="9" fill={iconColor} />
          <path
            d="M10 5.5V14.5M8.5 7.5H11.5C12.0523 7.5 12.5 7.94772 12.5 8.5C12.5 9.05228 12.0523 9.5 11.5 9.5H8.5M8.5 10.5H11.5C12.0523 10.5 12.5 10.9477 12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5H8.5"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <rect
            x="3"
            y="4"
            width="14"
            height="13"
            rx="2"
            stroke={iconColor}
            strokeWidth="2"
          />
          <path d="M3 8H17" stroke={iconColor} strokeWidth="2" />
          <path
            d="M7 2V6"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13 2V6"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "star":
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "grid":
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <rect
            x="2"
            y="2"
            width="7"
            height="7"
            rx="1"
            stroke={iconColor}
            strokeWidth="2"
          />
          <rect
            x="11"
            y="2"
            width="7"
            height="7"
            rx="1"
            stroke={iconColor}
            strokeWidth="2"
          />
          <rect
            x="2"
            y="11"
            width="7"
            height="7"
            rx="1"
            stroke={iconColor}
            strokeWidth="2"
          />
          <rect
            x="11"
            y="11"
            width="7"
            height="7"
            rx="1"
            stroke={iconColor}
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function Banner() {
  const { headline, subheadline, ctaButtonText } = defaultLandingContent.hero;
  const [talentCards, setTalentCards] = useState(defaultLandingContent.hero.talentCards);
  
  // Fetch talent cards from API
  useEffect(() => {
    const fetchTalentCards = async () => {
      try {
        // Determine API URL with smart fallbacks
        let apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        // If env var not set, use production URL if on production domain
        if (!apiUrl) {
          if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname === 'knacksters.co' || hostname === 'www.knacksters.co') {
              apiUrl = 'https://knackstersbackend-production.up.railway.app';
            } else {
              apiUrl = 'http://localhost:5000';
            }
          } else {
            apiUrl = 'http://localhost:5000';
          }
        }
        
        const fetchUrl = `${apiUrl}/api/public/content/landing-hero`;
        
        console.log('🔍 Fetching talent cards from:', fetchUrl);
        console.log('🔍 NEXT_PUBLIC_API_URL env var:', process.env.NEXT_PUBLIC_API_URL);
        
        const response = await fetch(fetchUrl, {
          cache: 'no-store', // Disable caching
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        console.log('📡 Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('📦 Response data:', data);
          
          if (data.success && data.data?.content?.talentCards) {
            console.log('✅ Setting talent cards:', data.data.content.talentCards.length, 'cards');
            setTalentCards(data.data.content.talentCards);
          } else {
            console.log('⚠️ No talent cards in response, using defaults');
          }
        } else {
          console.error('❌ Response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('❌ Failed to fetch talent cards:', error);
      }
    };
    
    fetchTalentCards();
  }, []);
  
  // Split talent cards - first 3 for left carousel, last 3 for right carousel
  const leftCarouselCards = talentCards.slice(0, 3);
  const rightCarouselCards = talentCards.slice(3, 6);
  
  // Create 2 sets for smooth scrolling animation (duplicate for infinite scroll)
  const firstSet = [...leftCarouselCards];
  const secondSet = [...leftCarouselCards];
  const thirdSet = [...rightCarouselCards];
  const fourthSet = [...rightCarouselCards];

  return (
    <section
      className="relative bg-[rgb(250,250,250)] bg-cover bg-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 min-h-[600px] sm:min-h-[650px] md:min-h-[700px]"
      style={{
        backgroundImage: "url(/hero-bg.png)",
        backgroundPosition: "center bottom",
      }}
    >
      {/* Left Upper Slider - scrolls vertically from bottom to top */}
      <div className="left-upper-slider hidden lg:flex gap-6 absolute top-0 left-[24px] h-full overflow-hidden pointer-events-none">
        <div className="flex flex-col animate-scroll-up animated-row-1">
          {/* First div with 3 images */}
          <div className="flex flex-col gap-4">
            {firstSet.map((talent, index) => (
              <TalentCard key={`left-1-${index}`} {...talent} />
            ))}
          </div>
          {/* Gap between divs */}
          <div className="h-10"></div>
          {/* Second div with 3 images */}
          <div className="flex flex-col gap-4">
            {secondSet.map((talent, index) => (
              <TalentCard key={`left-2-${index}`} {...talent} />
            ))}
          </div>
        </div>
        <div className="flex flex-col animate-scroll-up animated-row-2">
          {/* Second div with 3 images */}
          <div className="flex flex-col gap-4">
            {firstSet.map((talent, index) => (
              <TalentCard key={`left-1-${index}`} {...talent} />
            ))}
          </div>
          {/* Gap between divs */}
          <div className="h-10"></div>
          {/* Second div with 3 images */}
          <div className="flex flex-col gap-4 animated-row-2">
            {secondSet.map((talent, index) => (
              <TalentCard key={`left-2-${index}`} {...talent} />
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section - Content area */}
      <div className="middle-section flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="m-0 leading-[1.15] sm:leading-[1.21] font-mono font-normal text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] text-center text-[rgb(38,38,38)] mb-2">
            {headline}
          </h1>

          {/* Sub-Headline */}
          <p className="mt-4 sm:mt-6 mb-0 leading-[1.57] font-normal font-sans text-[rgb(89,89,89)] text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            {subheadline}
          </p>

          {/* Get Started Button */}
          <div className="mb-8 sm:mb-10 md:mb-12 flex justify-center">
            <Link href="/signup" className="inline-block">
              <PrimaryButton
                width="256"
                height="56"
                wrapperClassName="hero-primary-button-wrapper"
                gradientId="paint0_linear_hero_button"
              />
            </Link>
          </div>

          {/* Feature List - 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-[35px]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="flex-shrink-0 mt-1">
                  <FeatureIcon type={feature.icon} />
                </div>
                <p className="m-0 text-sm sm:text-base leading-[1.57] font-normal text-left font-sans text-[rgb(38,38,38)] flex-1">
                  <span className="font-semibold">{feature.title}:</span> {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Upper Slider - scrolls vertically from top to bottom */}
      <div className="right-upper-slider hidden lg:flex gap-6 absolute top-0 right-[24px] h-full overflow-hidden pointer-events-none">
        <div className="flex flex-col animate-scroll-down animated-row-1">
          {/* First div with 3 images */}
          <div className="flex flex-col gap-4">
            {thirdSet.map((talent, index) => (
              <TalentCard key={`right-1-${index}`} {...talent} />
            ))}
          </div>
          {/* Gap between divs */}
          <div className="h-4"></div>
          {/* Second div with 3 images (for continuous scroll) */}
          <div className="flex flex-col gap-4">
            {thirdSet.map((talent, index) => (
              <TalentCard key={`right-2-${index}`} {...talent} />
            ))}
          </div>
        </div>
        <div className="flex flex-col animate-scroll-down animated-row-2">
          {/* First div with 3 images */}
          <div className="flex flex-col gap-4">
            {fourthSet.map((talent, index) => (
              <TalentCard key={`right-3-${index}`} {...talent} />
            ))}
          </div>
          {/* Gap between divs */}
          <div className="h-4"></div>
          {/* Second div with 3 images (for continuous scroll) */}
          <div className="flex flex-col gap-4">
            {fourthSet.map((talent, index) => (
              <TalentCard key={`right-4-${index}`} {...talent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
