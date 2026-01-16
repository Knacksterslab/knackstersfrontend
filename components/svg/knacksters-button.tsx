interface KnackstersButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

const KnackstersButton = ({ 
  text,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false
}: KnackstersButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`primary-button-wrapper ${fullWidth ? 'w-full' : ''}`}
      style={{ maxWidth: fullWidth ? '100%' : '256px', minHeight: '56px' }}
    >
      <svg
        className="landing-button primary-button w-full"
        height="56"
        viewBox="0 0 260 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="button-bg"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M234.811 9.35655C235.889 8.33258 236.5 6.91057 236.5 5.4233C236.5 2.42809 234.072 0 231.077 0H12.5C5.87258 0 0.5 5.37258 0.5 12V44C0.5 50.6274 5.87257 56 12.5 56H182.211C184.734 56 187.037 54.7081 188.867 52.9708L234.811 9.35655Z"
          fill="url(#paint0_linear_knacksters_button)"
        />
        <text
          x="100"
          y="35"
          fill="white"
          fontSize="18"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {text}
        </text>
        <path
          className="button-arrow"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202.189 46.6435C201.111 47.6675 200.5 49.0895 200.5 50.5767C200.5 53.5719 202.928 56 205.923 56H247.5C254.127 56 259.5 50.6274 259.5 44V5.76378C259.5 2.58053 256.919 0 253.736 0C251.874 0 250.164 0.937614 248.878 2.28536C248.637 2.53806 248.389 2.78611 248.133 3.0292L202.189 46.6435Z"
          fill="#FC8838"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M242.362 30.638L232.5 40.226L234.145 42L244.006 32.4119L243.818 39.8409L246.206 39.9044L246.5 28.3011L235.169 28L235.107 30.4452L242.362 30.638Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_knacksters_button"
            x1="-11.6233"
            y1="56"
            x2="123.078"
            y2="176.822"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9414C" />
            <stop
              className="button-gradient-color-2"
              offset="0.99"
              stopColor="#FF9634"
            />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
};

export default KnackstersButton;

