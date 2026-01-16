"use client";

import Image from "next/image";
import { defaultLandingContent } from "@/components/landing/landing-content";

interface UseCase {
  image: string;
  title: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    image: "/images/calendar.svg",
    title: "Startup Scaling",
    description:
      "Scale your operations seamlessly with access to top-tier talent tailored to your needs.",
  },
  {
    image: "/images/rating.svg",
    title: "Project Overload",
    description:
      "Expand your workforce flexibly to handle high-demand projects with ease.",
  },
  {
    image: "/images/puzzle.svg",
    title: "Skill Gap Bridging",
    description:
      "Fill expertise gaps instantly with access to our vast network of specialists.",
  },
  {
    image: "/images/rocket.svg",
    title: "Launch with Confidence",
    description:
      "Our team ensures every step of your product launch is handled expertly, from planning to execution.",
  },
  {
    image: "/images/region.svg",
    title: "Expand Globally with Strategic Insights",
    description:
      "Access local market expertise and customized strategies to scale your business internationally.",
  },
  {
    image: "/images/train.svg",
    title: "Boost Efficiency Without the Hassle",
    description:
      "Let us handle the essentials so you can focus on what truly matters—growing your business.",
  },
  {
    image: "/images/ship.svg",
    title: "Navigate Challenges with Confidence",
    description:
      "Our experts provide tailored support to keep your business resilient in times of uncertainty.",
  },
  {
    image: "/images/seasons.svg",
    title: "Adapt Quickly to Market Demands",
    description:
      "Scale your team and resources effortlessly during peak seasons or unpredictable times.",
  },
  {
    image: "/images/remote-work.svg",
    title: "Remote Teams, Streamlined",
    description:
      "Ensure smooth collaboration and consistent quality with our expert-managed remote solutions.",
  },
  {
    image: "/images/expansion.svg",
    title: "Extend Your Reach Without Limits",
    description:
      "Our skilled professionals become your extended team, empowering you to achieve more.",
  },
];

export default function UseCases() {
  const { title, subtitle } = defaultLandingContent.useCases;

  return (
    <section id="use-cases" className="w-full py-12 px-4 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] font-normal text-gray-800 mb-3 sm:mb-4 font-mono">
          {title}
          </h2>
          <p
            className="max-w-3xl text-sm sm:text-base"
            style={{
              lineHeight: "1.57",
              fontWeight: 400,
              fontFamily: "Lato, sans-serif",
              color: "rgb(89, 89, 89)",
              margin: "0px",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-8 flex-1">
                {/* Image */}
                <div className="shrink-0 mt-1">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    width={112}
                    height={112}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 object-none"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3
                    className="text-lg sm:text-xl md:text-md lg:text-md font-normal text-gray-800 mb-2 sm:mb-1 font-sans"
                    style={{ fontFamily: "var(--font-sans), Lato, sans-serif" }}
                  >
                    {useCase.title}
                  </h3>
                  <p
                    className="text-sm sm:text-sm text-gray-500 leading-relaxed font-sans flex-1"
                    style={{ fontFamily: "var(--font-sans), Lato, sans-serif" }}
                  >
                    {useCase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
