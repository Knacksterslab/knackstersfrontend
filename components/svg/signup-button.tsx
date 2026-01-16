interface SignUpButtonProps {
  width?: string | number;
  height?: string | number;
  wrapperClassName?: string;
  gradientId?: string;
}

const SignUpButton = ({ 
  width = "477", 
  height = "56", 
  wrapperClassName = "primary-button-wrapper",
  gradientId = "paint0_linear_signup_button"
}: SignUpButtonProps = {}) => {
  return (
    <div className={wrapperClassName}>
      <svg
        className="landing-button primary-button"
        width={width}
        height={height}
        viewBox="0 0 477 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="button-bg"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M451.811 9.35655C452.889 8.33258 453.5 6.91057 453.5 5.4233C453.5 2.42809 451.072 0 448.077 0H12.5C5.87258 0 0.5 5.37258 0.5 12V44C0.5 50.6274 5.87257 56 12.5 56H399.211C401.734 56 404.037 54.7081 405.867 52.9708L451.811 9.35655Z"
          fill={`url(#${gradientId})`}
        ></path>
        <text
          x="185"
          y="36"
          textAnchor="middle"
          fontWeight="600"
          fontSize="18"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="white"
        >
          Sign up
        </text>
        <path
          className="button-arrow"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M419.189 46.6435C418.111 47.6675 417.5 49.0895 417.5 50.5767C417.5 53.5719 419.928 56 422.923 56H464.5C471.127 56 476.5 50.6274 476.5 44V5.76378C476.5 2.58053 473.919 0 470.736 0C469.374 0 468.164 0.937614 467.378 2.28536C467.237 2.53806 467.089 2.78611 466.933 3.0292L419.189 46.6435Z"
          fill="#FC8838"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M459.362 30.638L449.5 40.226L451.145 42L461.006 32.4119L460.818 39.8409L463.206 39.9044L463.5 28.3011L452.169 28L452.107 30.4452L459.362 30.638Z"
          fill="white"
        ></path>
        <defs>
          <linearGradient
            id={gradientId}
            x1="100"
            y1="56"
            x2="300"
            y2="176.822"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9414C"></stop>
            <stop
              className="button-gradient-color-2"
              offset="0.99"
              stopColor="#FF9634"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
export default SignUpButton;

