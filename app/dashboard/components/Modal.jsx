'use client';

import { useEffect, useRef } from 'react';

export function Modal({ open, onClose, title, subtitle, children, size = 'md' }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const sizeMap = {
    sm: 400,
    md: 560,
    lg: 720,
    xl: 900,
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 200,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 201,
          padding: 16,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            maxWidth: sizeMap[size],
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            pointerEvents: 'auto',
            animation: 'fadeSlideIn 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: 32,
            paddingBottom: subtitle ? 20 : 32,
            borderBottom: '1px solid #F3F4F6',
            flexShrink: 0,
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 22,
                color: '#0F0F0F',
                margin: 0,
                marginBottom: subtitle ? 4 : 0,
              }}>
                {title}
              </h2>
              {subtitle && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  color: '#6B7280',
                  margin: 0,
                }}>
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                color: '#9CA3AF',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 16,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
