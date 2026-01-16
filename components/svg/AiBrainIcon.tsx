export default function AiBrainIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* AI Brain/Neural Network Icon */}
      <circle cx="60" cy="35" r="8" fill="url(#aiGradient)" />
      <circle cx="40" cy="60" r="8" fill="url(#aiGradient)" />
      <circle cx="80" cy="60" r="8" fill="url(#aiGradient)" />
      <circle cx="30" cy="85" r="8" fill="url(#aiGradient)" />
      <circle cx="60" cy="85" r="8" fill="url(#aiGradient)" />
      <circle cx="90" cy="85" r="8" fill="url(#aiGradient)" />
      
      {/* Connecting lines */}
      <line x1="60" y1="35" x2="40" y2="60" stroke="url(#aiGradient)" strokeWidth="2" />
      <line x1="60" y1="35" x2="80" y2="60" stroke="url(#aiGradient)" strokeWidth="2" />
      <line x1="40" y1="60" x2="30" y2="85" stroke="url(#aiGradient)" strokeWidth="2" />
      <line x1="40" y1="60" x2="60" y2="85" stroke="url(#aiGradient)" strokeWidth="2" />
      <line x1="80" y1="60" x2="60" y2="85" stroke="url(#aiGradient)" strokeWidth="2" />
      <line x1="80" y1="60" x2="90" y2="85" stroke="url(#aiGradient)" strokeWidth="2" />
      
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9414C" />
          <stop offset="100%" stopColor="#FF9634" />
        </linearGradient>
      </defs>
    </svg>
  );
}
