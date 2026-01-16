export default function HealthcareIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stethoscope Icon */}
      {/* Earpieces */}
      <path
        d="M30 25C30 20 35 20 35 25V40"
        stroke="url(#healthcareGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M90 25C90 20 85 20 85 25V40"
        stroke="url(#healthcareGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Tubes */}
      <path
        d="M35 40Q35 65 60 75"
        stroke="url(#healthcareGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M85 40Q85 65 60 75"
        stroke="url(#healthcareGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Chest piece */}
      <circle
        cx="60"
        cy="85"
        r="15"
        fill="url(#healthcareGradient)"
      />
      <circle
        cx="60"
        cy="85"
        r="10"
        fill="white"
        fillOpacity="0.3"
      />
      
      {/* Medical cross overlay on chest piece */}
      <path
        d="M60 80V90M55 85H65"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      <defs>
        <linearGradient id="healthcareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
