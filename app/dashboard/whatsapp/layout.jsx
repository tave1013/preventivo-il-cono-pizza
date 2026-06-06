'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastProvider } from '../context/ToastContext';
import { ToastContainer } from '../components/ToastContainer';

function Ico({ n, s = 18, c = 'currentColor' }) {
  const paths = {
    chevLeft: <><polyline points="15 18 9 12 15 6"/></>,
    radio: <><circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="8"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      {paths[n]}
    </svg>
  );
}

export default function WhatsAppLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [waConnected, setWaConnected] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wa_connected') === 'true';
    setWaConnected(stored);
  }, []);

  const navItems = waConnected ? [
    { id: 'broadcast', label: 'Broadcast', path: '/dashboard/whatsapp/broadcast' },
    { id: 'automazioni', label: 'Automazioni', path: '/dashboard/whatsapp/automazioni' },
    { id: 'conversazioni', label: 'Conversazioni', path: '/dashboard/whatsapp/conversazioni' },
    { id: 'impostazioni', label: 'Impostazioni', path: '/dashboard/whatsapp/impostazioni' },
  ] : [];

  const currentPath = pathname;
  const isActive = (path) => currentPath === path;

  return (
    <ToastProvider>
      <>
      {/* Breadcrumb / Back button */}
      <button
        onClick={() => router.back()}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none',
          border: 'none', cursor: 'pointer', color: '#6B7280',
          fontFamily: 'Inter, sans-serif', fontSize: 13, marginBottom: 16,
          transition: 'color 0.15s', padding: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#0F0F0F'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; }}
      >
        <Ico n="chevLeft" s={16} c="currentColor" />
        Torna alla dashboard
      </button>

      {/* Sub-nav for connected state */}
      {waConnected && (
        <div style={{
          display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #E5E7EB',
          paddingBottom: 0, marginLeft: -28, marginRight: -28, paddingLeft: 28, paddingRight: 28,
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              style={{
                padding: '10px 16px', background: 'transparent', border: 'none',
                borderBottom: isActive(item.path) ? '2px solid #0F0F0F' : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13.5,
                fontWeight: isActive(item.path) ? 600 : 400,
                color: isActive(item.path) ? '#0F0F0F' : '#6B7280',
                transition: 'color 0.15s', marginBottom: -1,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {children}
      <ToastContainer />
      </>
    </ToastProvider>
  );
}
