'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LuUserRound } from "react-icons/lu";
import { FaRegChartBar } from "react-icons/fa";
import { IoFlashOutline } from "react-icons/io5";
import { TfiCup } from "react-icons/tfi";
import { TfiWorld } from "react-icons/tfi";
import { RiResetLeftLine } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";

// Extend Window interface for jQuery
declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Get Started with Knacksters',
    description: 'Sign up and meet your dedicated business manager, who will tailor our services to your goals.',
    icon: <LuUserRound />,
  },
  {
    number: '02',
    title: 'Let\'s Strategize Together',
    description: 'Collaborate with your business manager to share your goals and outline challenges. We\'ll connect you with the right talent for success—deployed in minutes.',
    icon: <FaRegChartBar />,
  },
  {
    number: '03',
    title: 'Delegate with Ease',
    description: 'Outline your requirements or leave it to your business manager to execute your vision efficiently. Spread hours across multiple experts or focus on a single priority.',
    icon: <RiResetLeftLine />,
  },
  {
    number: '04',
    title: 'Watch Your Plans in Action',
    description: 'Receive rapid drafts for review. Our experts ensure quick turnaround with top-notch quality.',
    icon: <IoFlashOutline />,
  },
  {
    number: '05',
    title: 'Celebrate Your Success',
    description: 'Enjoy completed tasks that meet your expectations and set the stage for future growth.',
    icon: <TfiCup />,
  },
  {
    number: '06',
    title: 'Access a World of Expertise',
    description: 'Tap into our global network of professionals to grow every aspect of your business.',
    icon: <TfiWorld />,
  },
  {
    number: '07',
    title: 'Found the Perfect Fit?',
    description: 'When a Knackster becomes invaluable to your team, convert them to a full-time role through our streamlined hiring pathway. You\'ve proven the fit—we make the transition seamless.',
    icon: <FaHandshake />,
  },
  {
    number: '08',
    title: 'Your Growth Never Stops',
    description: 'Partner with your business manager for long-term success. Together, we\'ll keep innovating and achieving.',
    icon: <RiResetLeftLine />,
  },
];

export default function ProcessFlowComponent() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const equalizeHeightsRef = useRef<(() => void) | null>(null);
  const [isSliderReady, setIsSliderReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check if scripts are already loaded
    const initializeSlider = () => {
      if (!isMounted || !sliderRef.current || !window.jQuery || !window.jQuery.fn.slick) {
        return;
      }

      // Check if the slider has children before initializing
      const children = sliderRef.current.children;
      if (!children || children.length === 0) {
        console.warn('Slider has no children, skipping initialization');
        return;
      }

      // Check if any child has content
      const hasContent = Array.from(children).some(child =>
        child.children.length > 0 && child.textContent?.trim()
      );
      if (!hasContent) {
        console.warn('Slider children have no content, skipping initialization');
        return;
      }

      // Double-check the element still exists and has children
      if (!sliderRef.current || sliderRef.current.children.length === 0) {
        return;
      }

      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        if (!isMounted || !sliderRef.current) return;

        try {
          // Final check before initializing
          if (!sliderRef.current.children || sliderRef.current.children.length === 0) {
            console.warn('Slider lost children before initialization');
            return;
          }

          window.jQuery(sliderRef.current).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            arrows: false,
            dots: false,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }
            ]
          });

          // Mark slider as ready
          setIsSliderReady(true);

          // Equalize card heights after initialization
          const equalizeHeights = () => {
            if (!isMounted || !sliderRef.current) return;

            const slides = sliderRef.current.querySelectorAll('.slick-slide');
            let maxHeight = 0;

            // Reset heights to auto to get natural height
            slides.forEach((slide: any) => {
              const card = slide.querySelector('div > div');
              if (card) {
                (card as HTMLElement).style.height = 'auto';
              }
            });

            // Find max height
            slides.forEach((slide: any) => {
              const card = slide.querySelector('div > div');
              if (card) {
                const height = (card as HTMLElement).offsetHeight;
                if (height > maxHeight) {
                  maxHeight = height;
                }
              }
            });

            // Set all cards to max height
            slides.forEach((slide: any) => {
              const card = slide.querySelector('div > div');
              if (card) {
                (card as HTMLElement).style.height = `${maxHeight}px`;
              }
            });
          };

          // Store function reference for cleanup
          equalizeHeightsRef.current = equalizeHeights;

          // Equalize heights on init and resize
          setTimeout(equalizeHeights, 200);
          window.addEventListener('resize', equalizeHeights);

          // Equalize on slide change
          if (sliderRef.current && window.jQuery) {
            window.jQuery(sliderRef.current).on('setPosition', equalizeHeights);
          }
        } catch (error) {
          console.error('Error initializing slick slider:', error);
        }
      }, 100);
    };

    // Check if already loaded
    if (window.jQuery && window.jQuery.fn.slick) {
      initializeSlider();
      return;
    }

    // Dynamically load Slick CSS
    const slickCSS = document.createElement('link');
    slickCSS.rel = 'stylesheet';
    slickCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css';
    document.head.appendChild(slickCSS);

    const slickThemeCSS = document.createElement('link');
    slickThemeCSS.rel = 'stylesheet';
    slickThemeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css';
    document.head.appendChild(slickThemeCSS);

    // Dynamically load jQuery and Slick JS
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    jqueryScript.onload = () => {
      const slickScript = document.createElement('script');
      slickScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
      slickScript.onload = initializeSlider;
      document.body.appendChild(slickScript);
    };
    document.body.appendChild(jqueryScript);

    return () => {
      isMounted = false;
      // Cleanup
      if (equalizeHeightsRef.current) {
        window.removeEventListener('resize', equalizeHeightsRef.current);
      }
      if (sliderRef.current && window.jQuery && window.jQuery.fn.slick) {
        try {
          if (equalizeHeightsRef.current) {
            window.jQuery(sliderRef.current).off('setPosition', equalizeHeightsRef.current);
          }
          // Check if slick was initialized before trying to destroy it
          if (window.jQuery(sliderRef.current).hasClass('slick-initialized')) {
            window.jQuery(sliderRef.current).slick('unslick');
          }
        } catch (error) {
          console.error('Error cleaning up slick slider:', error);
        }
      }
    };
  }, []);

  return (
    <section id="how-it-works" className="w-full py-12 px-4 sm:py-16 md:py-20 lg:py-24 pt-0 sm:pt-0 md:pt-0 lg:pt-0 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-normal text-gray-900 mb-3 sm:mb-3 font-mono">
            Seamless, Simple, and Efficient - Here's How:
          </h2>
          <p className="text-base sm:text-lg md:text-md text-gray-600 max-w-3xl font-lato text-center mx-auto">
            Your Success is Our Journey - Here's How We Collaborate.
          </p>
        </div>

        {/* Process Steps Slider - Combined */}
        <div className="mb-10 sm:mb-12 md:mb-10">
          <div 
            ref={sliderRef} 
            className={`process-steps-slider ${!isSliderReady ? 'slick-not-initialized' : 'slick-initialized'}`}
          >
            {processSteps.map((step, index) => {
              // Cards at index 1, 3, 5, 7 (which are card numbers 2, 4, 6, 8) get the orange gradient
              const isOrangeGradient = index === 1 || index === 3 || index === 5 || index === 7;

              return (
                <div key={index} className="px-2 h-full">
                  <div style={{ borderRadius: '20px' }}
                    className={`${isOrangeGradient
                        ? 'bg-[linear-gradient(62deg,_rgb(252,136,56)_0.53%,_rgb(222,39,171)_100%)] border-white'
                        : 'bg-[linear-gradient(62deg,_rgb(233,65,76)_0.53%,_rgb(222,39,171)_100%)]'
                      } border p-5 sm:p-6 md:p-7 hover:border-gray-400 transition-all duration-300 h-full flex flex-col`}
                  >
                    {/* Numbered Indicator */}
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="w-12 h-12 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center"
                      >
                        <span
                          className="text-white text-sm sm:text-lg font-medium font-mono"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {step.number}
                        </span>
                      </div>
                      <span className="text-white text-sm sm:text-3xl font-medium">
                        {step.icon}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg sm:text-xl md:text-xl font-normal text-white mb-3 sm:mb-4 font-sans" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-sm text-slate-200 leading-relaxed font-sans flex-grow" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-10 sm:mb-10 md:mb-5 text-center" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>
          <span className="text-gray-600 text-sm sm:text-lg font-medium">
            Empowered by AI and top talent to deliver exceptional results, every step of the way.
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/signup"
            className="inline-block primary-button-wrapper"
          >
            <svg
              className="landing-button primary-button"
              width="364"
              height="56"
              viewBox="0 0 364 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="button-bg"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M339.311 9.35626C340.389 8.33232 341 6.91036 341 5.42313C341 2.42802 338.572 0 335.577 0H12C5.37258 0 0 5.37258 0 12V44C0 50.6274 5.37259 56 12 56H286.71C289.234 56 291.537 54.708 293.367 52.9706L339.311 9.35626Z"
                fill="url(#paint0_linear_process_cta)"
              ></path>
              <text
                x="16"
                y="36"
                textAnchor="start"
                fontWeight="bold"
                fontSize="22"
                fontFamily="Lato, sans-serif"
                fill="white"
              >
                Start Your Journey Today
              </text>
              <path
                className="button-arrow"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M306.689 46.6435C305.611 47.6675 305 49.0895 305 50.5767C305 53.5719 307.428 56 310.423 56H352C358.627 56 364 50.6274 364 44V5.76378C364 2.58053 361.419 0 358.236 0C356.374 0 354.664 0.937614 353.378 2.28536C353.137 2.53806 352.889 2.78611 352.633 3.0292L306.689 46.6435Z"
                fill="#FF9634"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M346.862 30.638L337 40.226L338.645 42L348.506 32.4119L348.318 39.8409L350.706 39.9044L351 28.3011L339.669 28L339.607 30.4452L346.862 30.638Z"
                fill="white"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_process_cta"
                  x1="92.8767"
                  y1="56"
                  x2="227.578"
                  y2="176.822"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E9414C"></stop>
                  <stop offset="0.99" stopColor="#FF9634"></stop>
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <Link 
            href="/how-it-works" 
            className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}
          >
            Learn How It Works in Detail
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .process-steps-slider.slick-not-initialized {
          visibility: hidden;
          opacity: 0;
        }
        .process-steps-slider.slick-initialized {
          visibility: visible;
          opacity: 1;
          transition: opacity 0.3s ease-in;
        }
        .process-steps-slider .slick-list {
          margin: 0 -8px;
        }
        .process-steps-slider .slick-slide {
          height: auto;
          padding: 0px;
          padding-right:20px;
        }
        .process-steps-slider .slick-slide > div {
          height: 100%;
          display: flex;
        }
        .process-steps-slider .slick-track {
          display: flex !important;
          align-items: stretch;
        }
        .process-steps-slider .slick-track .slick-slide {
          display: flex !important;
          height: auto;
        }
        .process-steps-slider .slick-track .slick-slide > div {
          width: 100%;
          display: flex;
        }
      `}</style>
    </section>
  );
}