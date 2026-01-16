import { ArrowRight } from 'lucide-react';

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  width?: string;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
}

export default function ActionButton({ 
  text, 
  onClick, 
  type = 'button',
  width = 'w-full',
  disabled = false,
  variant = 'primary'
}: ActionButtonProps) {
  
  if (variant === 'outline') {
    // Outline button variant (for future use)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${width} relative overflow-hidden group cursor-pointer transition-all duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
        }`}
        style={{
          height: '56px',
          borderRadius: '12px',
        }}
      >
        <div 
          className="absolute inset-0 border-2 border-orange-500 rounded-xl"
        >
          <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-semibold text-lg">
            {text}
          </div>
        </div>
        
        <div 
          className="absolute top-0 bottom-0 z-10"
          style={{
            right: '119px',
            width: '3px',
            background: '#FF9634',
            transform: 'skewX(-15deg)',
          }}
        ></div>
        
        <div 
          className="absolute top-0 right-0 flex items-center justify-center"
          style={{
            width: '122px',
            height: '56px',
            background: 'linear-gradient(98.38deg, #FF9634 0%, #FFB366 100%)',
            clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px'
          }}
        >
          <ArrowRight 
            className="text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            style={{ 
              width: '14px', 
              height: '14px',
              strokeWidth: 2.5
            }}
          />
        </div>
      </button>
    );
  }

  // Primary button variant (default)
  return (
    <div 
      className={`${width} relative overflow-hidden group cursor-pointer`}
      onClick={disabled ? undefined : onClick}
      style={{
        height: '56px',
        borderRadius: '12px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {/* Left Rectangle - Main gradient section with text */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(98.38deg, #E9414C 36.58%, #FF9634 98.09%)',
          opacity: 1
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
          {text}
        </div>
      </div>
      
      {/* White diagonal separator line between the two parts */}
      <div 
        className="absolute top-0 bottom-0 z-10"
        style={{
          right: '119px',
          width: '3px',
          background: '#FFFFFF',
          transform: 'skewX(-15deg)',
          opacity: 1
        }}
      ></div>
      
      {/* Right Rectangle - Arrow section with diagonal left edge */}
      <div 
        className="absolute top-0 right-0 flex items-center justify-center"
        style={{
          width: '122px',
          height: '56px',
          background: 'linear-gradient(98.38deg, #FF9634 0%, #FFB366 100%)',
          clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px'
        }}
      >
        <ArrowRight 
          className="text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          style={{ 
            width: '14px', 
            height: '14px',
            strokeWidth: 2.5
          }}
        />
      </div>
    </div>
  );
}

