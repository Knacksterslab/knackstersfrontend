import React from 'react';

const GREY_COLOR = '#6B7280';

export const SystemeLogo = () => (
    <svg viewBox="0 0 180 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '120px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="400" className="transition-colors duration-300">
            systeme
        </text>
    </svg>
);

export const MaxoneLogo = () => (
    <svg viewBox="0 0 180 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '120px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="600" className="transition-colors duration-300">
            MAXONE
        </text>
    </svg>
);

export const TeemycoLogo = () => (
    <svg viewBox="0 0 180 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '120px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="700" className="transition-colors duration-300">
            TEEMYCO
        </text>
    </svg>
);

export const LyfefuelLogo = () => (
    <svg viewBox="0 0 180 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '120px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontStyle="italic" fontWeight="400" className="transition-colors duration-300">
            <tspan fontWeight="600">LYFE</tspan>
            <tspan fontWeight="400">fuel</tspan>
        </text>
    </svg>
);

export const StaffgeekLogo = () => (
    <svg viewBox="0 0 180 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '120px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="700" className="transition-colors duration-300">
            staffgeek
        </text>
    </svg>
);

export const SendcloudLogo = () => (
    <svg viewBox="0 0 210 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '140px', minHeight: '40px' }}>
        {/* Cloud icon */}
        <path
            d="M12 27c0-2.49 2.01-4.5 4.5-4.5 0.83 0 1.58 0.23 2.25 0.6C19.1 19.8 20.1 18.75 21.25 18.75c2.49 0 4.5 2.01 4.5 4.5 0 0.33-0.03 0.66-0.09 0.98C26.33 24.75 27.68 25.5 29.25 25.5c2.49 0 4.5-2.01 4.5-4.5s-2.01-4.5-4.5-4.5c-0.83 0-1.58 0.23-2.25 0.6C28.65 15.3 27.65 14.25 26.5 14.25c-2.49 0-4.5 2.01-4.5 4.5 0 0.33 0.03 0.66 0.09 0.98C20.18 18.75 18.83 18 17.25 18c-3.32 0-6 2.68-6 6s2.68 6 6 6c0.83 0 1.58-0.23 2.25-0.6z"
            fill={GREY_COLOR}
            className="transition-colors duration-300"
        />
        <text x="42" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="400" className="transition-colors duration-300">
            sendcloud
        </text>
    </svg>
);

export const AssimaLogo = () => (
    <svg viewBox="0 0 210 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '140px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="400" className="transition-colors duration-300">
            assima
        </text>
        {/* Pill/capsule icon - diagonal split */}
        <path
            d="M135 21c0-2.49 2.01-4.5 4.5-4.5h21c2.49 0 4.5 2.01 4.5 4.5v18c0 2.49-2.01 4.5-4.5 4.5h-21c-2.49 0-4.5-2.01-4.5-4.5V21z"
            fill={GREY_COLOR}
            opacity="0.6"
            className="transition-colors duration-300"
        />
        <path
            d="M135 21l21 18M156 21l-21 18"
            stroke={GREY_COLOR}
            strokeWidth="2.25"
            opacity="0.4"
            className="transition-colors duration-300"
        />
    </svg>
);

export const PodigyLogo = () => (
    <svg viewBox="0 0 180 60" className="w-full h-auto transition-colors duration-300" style={{ minWidth: '120px', minHeight: '40px' }}>
        <text x="0" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="400" className="transition-colors duration-300">
            p
        </text>
        {/* Circle with concentric circle for 'o' */}
        <circle cx="27" cy="21" r="10.5" fill="none" stroke={GREY_COLOR} strokeWidth="2.25" className="transition-colors duration-300" />
        <circle cx="27" cy="21" r="6" fill={GREY_COLOR} className="transition-colors duration-300" />
        <text x="42" y="42" fontSize="32" fill={GREY_COLOR} fontFamily="sans-serif" fontWeight="400" className="transition-colors duration-300">
            )digy
        </text>
    </svg>
);

