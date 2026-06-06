'use client';

import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

function ToastIcon({ type }) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  const colors = {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  };
  return (
    <span style={{ fontSize: 18, color: colors[type], lineHeight: 1, marginRight: 12, fontWeight: 700 }}>
      {icons[type]}
    </span>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: 12,
      pointerEvents: 'none',
    }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          style={{
            background: '#fff',
            borderRadius: 10,
            padding: '14px 16px',
            paddingLeft: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            maxWidth: 320,
            animation: 'fadeSlideIn 0.2s ease',
            pointerEvents: 'auto',
            cursor: 'pointer',
            borderLeft: `3px solid ${
              toast.type === 'success' ? '#22C55E' :
              toast.type === 'error' ? '#EF4444' :
              toast.type === 'warning' ? '#F59E0B' : '#3B82F6'
            }`,
          }}
        >
          <ToastIcon type={toast.type} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13.5,
              fontWeight: 600,
              color: '#0F0F0F',
              lineHeight: 1.4,
            }}>
              {toast.message}
            </div>
            {toast.submessage && (
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#6B7280',
                marginTop: 2,
                lineHeight: 1.3,
              }}>
                {toast.submessage}
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: 0,
              marginLeft: 8,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
