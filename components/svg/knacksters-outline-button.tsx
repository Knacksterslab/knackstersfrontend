interface KnackstersOutlineButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

const KnackstersOutlineButton = ({ 
  text,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false
}: KnackstersOutlineButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden group ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      style={{ 
        height: '56px',
        borderRadius: '12px',
        maxWidth: fullWidth ? '100%' : '256px'
      }}
    >
      {/* Border and hover effect */}
      <div className="absolute inset-0 border-2 border-orange-500 rounded-xl hover:bg-orange-50 transition-all"></div>
      
      {/* Left section with arrow */}
      <div 
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{
          left: '0',
          width: '122px',
          background: 'transparent'
        }}
      >
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 14 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-orange-500 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform"
        >
          <path 
            d="M13 7H1M1 7L7 1M1 7L7 13" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Diagonal separator */}
      <div 
        className="absolute top-0 bottom-0 z-10"
        style={{
          left: '119px',
          width: '3px',
          background: '#FF9634',
          transform: 'skewX(15deg)',
          opacity: 1
        }}
      ></div>
      
      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-semibold text-lg">
        {text}
      </div>
    </button>
  );
};

export default KnackstersOutlineButton;
