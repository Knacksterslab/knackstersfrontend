export default function ShieldIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield Icon */}
      <path
        d="M60 20L30 35V60C30 75 40 87 60 95C80 87 90 75 90 60V35L60 20Z"
        fill="url(#shieldGradient)"
      />
      <path
        d="M60 30L40 40V60C40 70 47 80 60 85C73 80 80 70 80 60V40L60 30Z"
        fill="white"
        fillOpacity="0.3"
      />
      {/* Checkmark */}
      <path
        d="M52 60L57 65L70 52"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9414C" />
          <stop offset="100%" stopColor="#FF9634" />
        </linearGradient>
      </defs>
    </svg>
  );
}
