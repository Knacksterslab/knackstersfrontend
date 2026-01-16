/**
 * NewUserTip Component
 * Dismissible tooltip/card for onboarding new users
 */

'use client'

import React from 'react';
import { X, Info, Lightbulb } from 'lucide-react';
import { useNewUserTips } from '@/hooks/useNewUserTips';

interface NewUserTipProps {
  tipId: string;
  title: string;
  children: React.ReactNode;
  variant?: 'info' | 'tip' | 'success';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export default function NewUserTip({ 
  tipId, 
  title, 
  children, 
  variant = 'info',
  placement = 'bottom' 
}: NewUserTipProps) {
  const { shouldShowTip, dismissTip } = useNewUserTips();

  // Don't render if tip should not be shown
  if (!shouldShowTip(tipId)) {
    return null;
  }

  const handleDismiss = () => {
    dismissTip(tipId);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          iconBg: 'bg-green-100',
        };
      case 'tip':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'text-amber-600',
          iconBg: 'bg-amber-100',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          iconBg: 'bg-blue-100',
        };
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'tip':
        return <Lightbulb size={18} />;
      case 'success':
      case 'info':
      default:
        return <Info size={18} />;
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      className={`relative ${styles.bg} ${styles.border} border rounded-lg p-4 mb-4 animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center`}>
          <span className={styles.icon}>
            {getIcon()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
              aria-label="Dismiss tip"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for inline placement
export function NewUserTipCompact({ 
  tipId, 
  children,
  variant = 'info' 
}: Pick<NewUserTipProps, 'tipId' | 'children' | 'variant'>) {
  const { shouldShowTip, dismissTip } = useNewUserTips();

  if (!shouldShowTip(tipId)) {
    return null;
  }

  const handleDismiss = () => {
    dismissTip(tipId);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
        };
      case 'tip':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      className={`${styles.bg} ${styles.border} border rounded-lg p-3 flex items-center justify-between gap-3 text-sm ${styles.text} animate-in fade-in slide-in-from-top-1 duration-200`}
    >
      <span className="flex-1">{children}</span>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 p-0.5 hover:bg-white/50 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
