interface ActionButtonSVGProps {
  text: string;
  width?: string | number;
  height?: string | number;
  wrapperClassName?: string;
  gradientId?: string;
  onClick?: () => void;
}

const ActionButtonSVG = ({ 
  text,
  width = "477", 
  height = "56", 
  wrapperClassName = "primary-button-wrapper",
  gradientId = "paint0_linear_action_button",
  onClick
}: ActionButtonSVGProps) => {
  return (
    <div 
      className={wrapperClassName}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <svg
        className="landing-button primary-button"
        width={width}
        height={height}
        viewBox={`0 0 ${width} 56`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="button-bg"
          fillRule="evenodd"
          clipRule="evenodd"
          d={`M${Number(width) - 25.189} 9.35655C${Number(width) - 24.111} 8.33258 ${Number(width) - 23.5} 6.91057 ${Number(width) - 23.5} 5.4233C${Number(width) - 23.5} 2.42809 ${Number(width) - 25.928} 0 ${Number(width) - 28.923} 0H12.5C5.87258 0 0.5 5.37258 0.5 12V44C0.5 50.6274 5.87257 56 12.5 56H${Number(width) - 77.789}C${Number(width) - 75.266} 56 ${Number(width) - 72.963} 54.7081 ${Number(width) - 71.133} 52.9708L${Number(width) - 25.189} 9.35655Z`}
          fill={`url(#${gradientId})`}
        ></path>
        <text
          x="50%"
          y="36"
          textAnchor="middle"
          fontWeight="600"
          fontSize="18"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="white"
        >
          {text}
        </text>
        <path
          className="button-arrow"
          fillRule="evenodd"
          clipRule="evenodd"
          d={`M${Number(width) - 57.811} 46.6435C${Number(width) - 58.889} 47.6675 ${Number(width) - 59.5} 49.0895 ${Number(width) - 59.5} 50.5767C${Number(width) - 59.5} 53.5719 ${Number(width) - 57.072} 56 ${Number(width) - 54.077} 56H${Number(width) - 12.5}C${Number(width) - 5.873} 56 ${Number(width) - 0.5} 50.6274 ${Number(width) - 0.5} 44V5.76378C${Number(width) - 0.5} 2.58053 ${Number(width) - 3.081} 0 ${Number(width) - 6.264} 0C${Number(width) - 7.626} 0 ${Number(width) - 8.836} 0.937614 ${Number(width) - 9.622} 2.28536C${Number(width) - 9.763} 2.53806 ${Number(width) - 9.911} 2.78611 ${Number(width) - 10.067} 3.0292L${Number(width) - 57.811} 46.6435Z`}
          fill="#FC8838"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={`M${Number(width) - 17.638} 30.638L${Number(width) - 27.5} 40.226L${Number(width) - 25.855} 42L${Number(width) - 15.994} 32.4119L${Number(width) - 16.182} 39.8409L${Number(width) - 13.794} 39.9044L${Number(width) - 13.5} 28.3011L${Number(width) - 24.831} 28L${Number(width) - 24.893} 30.4452L${Number(width) - 17.638} 30.638Z`}
          fill="white"
        ></path>
        <defs>
          <linearGradient
            id={gradientId}
            x1={Number(width) * 0.2}
            y1="56"
            x2={Number(width) * 0.6}
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
export default ActionButtonSVG;

