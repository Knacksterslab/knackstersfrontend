"use client";

import Link from "next/link";
import CalendarIcon from "../svg/CalendarIcon";
import CustomerServiceIcon from "../svg/CustomerServiceIcon";
import DevelopmentIcon from "../svg/DevelopmentIcon";
import DesignIcon from "../svg/DesignIcon";
import MarketingIcon from "../svg/MarketingIcon";
import AiBrainIcon from "../svg/AiBrainIcon";
import ShieldIcon from "../svg/ShieldIcon";
import HealthcareIcon from "../svg/HealthcareIcon";
import { defaultLandingContent, LandingContent } from "../landing/landing-content";

const iconMap = {
  calendar: CalendarIcon,
  'customer-service': CustomerServiceIcon,
  development: DevelopmentIcon,
  design: DesignIcon,
  marketing: MarketingIcon,
  'ai-brain': AiBrainIcon,
  shield: ShieldIcon,
  healthcare: HealthcareIcon,
};

export default function SolutionsComponent() {
  const content = defaultLandingContent;

  const { title, subtitle, items, ctaCard } = content.solutions;

  return (
    <section id="services" className="w-full py-8 px-4 sm:py-12 md:py-16 lg:py-20 bg-[#262626]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] font-normal text-white mb-3 sm:mb-4">
            {title}
          </h2>
          <p
            className="max-w-3xl"
            style={{
              margin: "16px 0px 0px",
              lineHeight: "1.57",
              fontWeight: 400,
              fontFamily: "Lato, sans-serif",
              fontSize: "1rem",
              color: "rgb(140, 140, 140)",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Services Grid - 3 rows x 2 columns */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            {items.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const isFirstColumn = index % 2 === 0;
              const isLastRow = index >= items.length - 2;
              
              // Determine padding and border classes based on position
              let cardClasses = "p-5 sm:p-6 md:p-7";
              if (index === 0) {
                cardClasses += " pt-0 pl-0 md:pt-0 md:pl-0 lg:border-r lg:border-b border-gray-600";
              } else if (index === 1) {
                cardClasses += " pt-5 pl-0 lg:pt-0 md:pl-0 lg:pl-4 lg:border-b border-gray-600";
              } else if (isFirstColumn) {
                cardClasses += " pl-0 md:pl-0" + (isLastRow ? " lg:border-r border-gray-600" : " lg:border-r lg:border-b border-gray-600");
              } else {
                cardClasses += " pl-0 md:pl-0 lg:pl-4" + (isLastRow ? "" : " lg:border-b border-gray-600");
              }

              return (
                <div key={service.id} className={cardClasses}>
              <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 md:gap-5">
                {/* Icon Container */}
                <div className="flex justify-center sm:block shrink-0 self-stretch">
                  <div
                    className="rounded-xl flex items-center justify-center p-3 sm:p-4 h-full w-full sm:w-[160px] md:w-[190px]"
                    style={{
                      maxWidth: "190px",
                      minHeight: "140px",
                      height: "auto",
                      backgroundImage:
                        "linear-gradient(100deg, rgba(233, 65, 76, 0.1) 45%, rgba(255, 150, 52, 0.1) 100%)",
                    }}
                  >
                    <div className="w-full h-full">
                          <IconComponent />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center sm:items-start flex-1 min-w-0 mt-2 sm:mt-0">
                  <h3
                    className="text-lg sm:text-xl md:text-xl font-semibold text-white mb-2 sm:mb-3 font-sans text-center sm:text-left"
                    style={{
                      fontFamily: "var(--font-sans), Lato, sans-serif",
                    }}
                  >
                        {service.title}
                  </h3>
                  <p
                    className="text-center sm:text-left text-sm sm:text-[14px] text-[#BFBFBF] font-sans leading-relaxed mb-4"
                    style={{
                      fontFamily: "var(--font-sans), Lato, sans-serif",
                    }}
                  >
                        {service.description}
                  </p>
                  <div className="mt-4 sm:mt-15 flex justify-center sm:justify-start">
                    <Link
                          href={service.buttonLink}
                      className="inline-block outline-button-wrapper"
                    >
                      <svg
                        className="landing-button outline-button w-full max-w-[229px]"
                        width="229"
                        height="40"
                        viewBox="0 0 229 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                            <mask id={`path-1-inside-1_${index}`} fill="white">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M209.528 8.14963C210.468 7.25775 211 6.01916 211 4.72373C211 2.11489 208.885 0 206.276 0H8C3.58172 0 0 3.58172 0 8V32C0 36.4183 3.58173 40 8.00001 40H172.785C174.834 40 176.806 39.2132 178.293 37.802L209.528 8.14963Z"
                          ></path>
                        </mask>
                        <path
                          className="outline-button-bg button-bg"
                          d="M178.293 37.802L179.67 39.2525L178.293 37.802ZM209.528 8.14963L210.905 9.60013L209.528 8.14963ZM8 2H206.276V-2H8V2ZM2 32V8H-2V32H2ZM172.785 38H8.00001V42H172.785V38ZM179.67 39.2525L210.905 9.60013L208.152 6.69913L176.916 36.3515L179.67 39.2525ZM172.785 42C175.347 42 177.811 41.0165 179.67 39.2525L176.916 36.3515C175.801 37.4099 174.322 38 172.785 38V42ZM-2 32C-2 37.5229 2.47716 42 8.00001 42V38C4.6863 38 2 35.3137 2 32H-2ZM8 -2C2.47715 -2 -2 2.47715 -2 8H2C2 4.68629 4.68629 2 8 2V-2ZM209 4.72373C209 5.47069 208.693 6.18486 208.152 6.69913L210.905 9.60013C212.243 8.33063 213 6.56764 213 4.72373H209ZM213 4.72373C213 1.01031 209.99 -2 206.276 -2V2C207.781 2 209 3.21946 209 4.72373H213Z"
                              fill={`url(#paint0_linear_${index})`}
                              mask={`url(#path-1-inside-1_${index})`}
                        ></path>
                        <text
                          x="12"
                          y="25"
                          textAnchor="start"
                          fontWeight="bold"
                          fontSize="16"
                          fontFamily="Lato, sans-serif"
                          fill="white"
                        >
                              {service.buttonText}
                        </text>
                            <mask id={`path-4-inside-2_${index}`} fill="white">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M188.294 32.8356C187.468 33.6197 187 34.7085 187 35.8473C187 38.1408 188.859 40 191.153 40H217C223.627 40 229 34.6274 229 28V4.2999C229 1.92513 227.075 0 224.7 0C223.311 0 222.036 0.700912 221.071 1.70034C220.919 1.85738 220.763 2.01186 220.604 2.16363L188.294 32.8356Z"
                          ></path>
                        </mask>
                        <path
                          className="button-arrow"
                          d="M220.604 2.16363L219.227 0.713127L219.227 0.713131L220.604 2.16363ZM188.294 32.8356L189.671 34.2861L188.294 32.8356ZM217 38H191.153V42H217V38ZM227 4.2999V28H231V4.2999H227ZM219.632 0.31097C219.501 0.447197 219.365 0.581291 219.227 0.713127L221.981 3.61414C222.161 3.44242 222.338 3.26756 222.51 3.08971L219.632 0.31097ZM219.227 0.713131L186.917 31.3851L189.671 34.2861L221.981 3.61413L219.227 0.713131ZM224.7 -2C222.622 -2 220.859 -0.959209 219.632 0.31097L222.51 3.08971C223.213 2.36103 223.999 2 224.7 2V-2ZM231 4.2999C231 0.82056 228.179 -2 224.7 -2V2C225.97 2 227 3.0297 227 4.2999H231ZM217 42C224.732 42 231 35.732 231 28H227C227 33.5228 222.523 38 217 38V42ZM189 35.8473C189 35.257 189.242 34.6926 189.671 34.2861L186.917 31.3851C185.693 32.5468 185 34.1601 185 35.8473H189ZM185 35.8473C185 39.2454 187.755 42 191.153 42V38C189.964 38 189 37.0362 189 35.8473H185Z"
                          fill="#FFFFFF"
                              mask={`url(#path-4-inside-2_${index})`}
                        ></path>
                        <path
                          className="button-arrow"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M217.044 20.8843L210 27.7328L211.175 29L218.219 22.1513L218.084 27.4578L219.79 27.5031L220 19.2151L211.907 19L211.862 20.7466L217.044 20.8843Z"
                          fill="#FFFFFF"
                        ></path>
                        <defs>
                          <linearGradient
                                id={`paint0_linear_${index}`}
                            x1="57.5"
                            y1="40"
                            x2="151.279"
                            y2="112.853"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FFFFFF"></stop>
                            <stop offset="0.99" stopColor="#FFFFFF"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
              );
            })}

            {/* CTA Card */}
            <div className="lg:p-4 lg:pr-0 lg:pb-0 lg:pt-6 mt-6 lg:mt-0">
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl h-full min-h-[200px]" style={{
                background:
                  "linear-gradient(135deg, rgba(63, 44, 44, 0.8) 0%, rgba(79, 44, 44, 0.9) 100%)",
              }}>
                <Link
                  href={ctaCard.buttonLink}
                  className="primary-button-wrapper flex flex-col items-center justify-center"
                >
                  <span className="text-white text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6 text-center" style={{ fontFamily: 'var(--font-sans), Lato, sans-serif' }}>{ctaCard.title}</span>
                  <svg
                    className="landing-button primary-button w-full max-w-[300px]"
                    width="300"
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
                      fill="url(#paint0_linear_524_15458)"
                    ></path>
                    <text
                      x="16"
                      y="36"
                      textAnchor="start"
                      fontWeight="bold"
                      fontSize="24"
                      fontFamily="Lato, sans-serif"
                      fill="white"
                    >
                      {ctaCard.buttonText}
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
                        id="paint0_linear_524_15458"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
