'use client';

import { useState, useEffect } from 'react';
import WhatsAppBroadcast from './sections/WhatsAppBroadcast';
import WhatsAppAutomazioni from './sections/WhatsAppAutomazioni';
import WhatsAppConversazioni from './sections/WhatsAppConversazioni';
import WhatsAppImpostazioni from './sections/WhatsAppImpostazioni';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ToastContainer';
import Overview from './sections/Overview';
import Leads from './sections/Leads';
import Email from './sections/Email';
import Recensioni from './sections/Recensioni';
import Impostazioni from './sections/Impostazioni';

/* ─── SVG Icon helper ─────────────────────────────────────────────── */
function Ico({ n, s = 18, c = 'currentColor' }) {
  const paths = {
    grid:       <><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></>,
    users:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    mail:       <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></>,
    star:       <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    settings:   <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    user:       <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    logout:     <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    menu:       <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x:          <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    search:     <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    chevDown:   <><polyline points="6 9 12 15 18 9"/></>,
    chevRight:  <><polyline points="9 18 15 12 9 6"/></>,
    whatsapp:   <><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.15-.197.297-.759.967-.929 1.165-.168.198-.337.223-.634.025-.297-.198-1.254-.463-2.39-1.475-.883-.788-1.48-1.761-1.648-2.059-.168-.297-.03-.458.126-.606.129-.129.297-.334.446-.501.149-.167.198-.279.297-.465.099-.187.05-.349-.025-.489-.075-.137-.669-1.614-.918-2.213-.242-.579-.487-.501-.67-.51-.172-.009-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.228 1.36.196 1.871.119.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.957 6.963c0 1.527.37 3.021 1.073 4.348L2.49 21.039l4.545-1.192c1.293.704 2.757 1.076 4.248 1.076h.004a6.97 6.97 0 006.964-6.97c0-1.862-.724-3.61-2.04-4.926a6.954 6.954 0 00-4.924-2.037M23.5 12a11.5 11.5 0 11-23 0 11.5 11.5 0 0123 0Z"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      {paths[n]}
    </svg>
  );
}

/* ─── Nav structure ──────────────────────────────────────────────── */
const NAV = [
  { group: 'PRINCIPALE', items: [
    { id: 'panoramica', label: 'Panoramica',      icon: 'grid' },
    { id: 'leads',      label: 'Lead & Contatti', icon: 'users' },
    { id: 'email',      label: 'Email Marketing', icon: 'mail',
      sub: ['Campagne inviate', 'Automazioni', 'Sequenze'] },
    { id: 'recensioni', label: 'Recensioni',      icon: 'star' },
    { id: 'whatsapp',   label: 'WhatsApp',        icon: 'whatsapp', badge: true,
      sub: ['Broadcast', 'Automazioni', 'Conversazioni', 'Impostazioni'] },
  ]},
  { group: 'ACCOUNT', items: [
    { id: 'profilo',    label: 'Il mio profilo',  icon: 'user' },
    { id: 'impostazioni', label: 'Impostazioni',  icon: 'settings' },
    { id: 'esci',       label: 'Esci',            icon: 'logout' },
  ]},
];

const SECTION_LABEL = {
  panoramica: 'Panoramica', leads: 'Lead & Contatti', email: 'Email Marketing',
  recensioni: 'Recensioni', impostazioni: 'Impostazioni', profilo: 'Il mio profilo',
  whatsapp: 'WhatsApp',
};

/* ─── Sidebar ────────────────────────────────────────────────────── */
function Sidebar({ active, setActive, open, setOpen, emailOpen, setEmailOpen, waConnected, waOpen, setWaOpen, setWaPage, isMobile }) {
  const navBtnStyle = (isActive) => ({
    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
    padding: isMobile ? '14px 20px' : '9px 20px',
    background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
    border: 'none',
    borderLeft: isActive ? '3px solid #FFFFFF' : '3px solid transparent',
    cursor: 'pointer',
    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.52)',
    fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: isMobile ? 14 : 13.5,
    textAlign: 'left', transition: 'all 0.15s', letterSpacing: '-0.01em',
    minHeight: 44,
  });

  return (
    <aside
      className={`dash-sidebar dash-scroll${open ? ' is-open' : ''}`}
      style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: isMobile ? '100%' : 240,
        background: '#0F0F0F', display: 'flex', flexDirection: 'column',
        zIndex: 100, transition: 'transform 0.3s ease', willChange: 'transform',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '22px 20px 14px', borderBottom: '1px solid #1C1C1C', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#EF4444', flexShrink: 0,
            animation: 'pulse-dot 1.6s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 13.5,
            color: '#FFFFFF', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Il Cono Pizza
          </span>
        </div>
        <span style={{
          display: 'inline-block', fontSize: 10,
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          color: 'rgba(255,255,255,0.28)', background: '#1A1A1A',
          padding: '3px 9px', borderRadius: 20,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Dashboard v1.0
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {NAV.map(({ group, items }) => (
          <div key={group} style={{ marginBottom: 2 }}>
            <div style={{
              padding: '12px 20px 5px', fontSize: 9.5,
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {group}
            </div>
            {items.map(item => {
              const isActive = active === item.id || (item.id === 'email' && active === 'email') || (item.id === 'whatsapp' && active === 'whatsapp');
              const showBadge = item.badge && !waConnected;
              return (
                <div key={item.id}>
                  <button
                    style={navBtnStyle(isActive)}
                    onClick={() => {
                      if (item.id === 'email') {
                        setEmailOpen(p => !p);
                        setActive('email');
                      } else if (item.id === 'whatsapp') {
                        if (waConnected) {
                          setWaOpen(p => !p);
                          setWaPage('broadcast');
                        }
                        setActive('whatsapp');
                      } else {
                        setActive(item.id);
                        setOpen(false);
                      }
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ opacity: isActive ? 1 : 0.65 }}>
                      <Ico n={item.icon} s={16} />
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {showBadge && (
                      <span style={{
                        fontSize: 9.5,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        color: '#052E16',
                        background: '#25D366',
                        borderRadius: 999,
                        padding: '2px 6px',
                        animation: 'pulse-dot 2s ease-in-out infinite',
                        flexShrink: 0,
                      }}>
                        Nuovo
                      </span>
                    )}
                    {(item.id === 'email' || (item.id === 'whatsapp' && waConnected)) && (
                      <span style={{
                        opacity: 0.45,
                        transform: item.id === 'email'
                          ? (emailOpen ? 'rotate(180deg)' : 'rotate(0deg)')
                          : (waOpen ? 'rotate(180deg)' : 'rotate(0deg)'),
                        transition: 'transform 0.2s',
                        display: 'flex',
                        flexShrink: 0,
                      }}>
                        <Ico n="chevDown" s={12} />
                      </span>
                    )}
                  </button>

                  {item.id === 'email' && item.sub && emailOpen && (
                    <div>
                      {item.sub.map(child => (
                        <button
                          key={child}
                          onClick={() => { setActive('email'); setOpen(false); }}
                          style={{
                            width: '100%', padding: isMobile ? '10px 20px 10px 46px' : '7px 20px 7px 46px',
                            background: 'transparent', border: 'none',
                            cursor: 'pointer', color: 'rgba(255,255,255,0.38)',
                            fontFamily: 'Inter, sans-serif', fontWeight: 400,
                            fontSize: 12.5, textAlign: 'left',
                            transition: 'color 0.15s', minHeight: 44,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
                        >
                          {child}
                        </button>
                      ))}
                    </div>
                  )}

                  {item.id === 'whatsapp' && item.sub && waConnected && waOpen && (
                    <div>
                      {item.sub.map(child => {
                        const map = {
                          Broadcast: 'broadcast',
                          Automazioni: 'automazioni',
                          Conversazioni: 'conversazioni',
                          Impostazioni: 'impostazioni',
                        };
                        return (
                          <button
                            key={child}
                            onClick={() => {
                              setActive('whatsapp');
                              setWaPage(map[child]);
                              setOpen(false);
                            }}
                            style={{
                              width: '100%', padding: isMobile ? '10px 20px 10px 46px' : '7px 20px 7px 46px',
                              background: 'transparent', border: 'none',
                              cursor: 'pointer', color: 'rgba(255,255,255,0.38)',
                              fontFamily: 'Inter, sans-serif', fontWeight: 400,
                              fontSize: 12.5, textAlign: 'left',
                              transition: 'color 0.15s', minHeight: 44,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
                          >
                            {child}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Plan card */}
      <div style={{
        margin: '0 12px 14px', padding: '14px 16px',
        background: '#181818', border: '1px solid #262626', borderRadius: 12,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.38)' }}>
            Piano attivo
          </span>
          <span style={{
            fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600,
            background: '#C3F0D5', color: '#15803D', padding: '2px 8px', borderRadius: 20,
          }}>
            Attivo
          </span>
        </div>
        <div style={{
          fontSize: 14, fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600, color: '#FFFFFF', marginBottom: 11,
        }}>
          Piano Plus
        </div>
        <button
          onClick={() => { setActive('impostazioni'); setOpen(false); }}
          style={{
            width: '100%', padding: '7px 12px', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8,
            color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif',
            fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
            minHeight: 44,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
        >
          Upgrade →
        </button>
      </div>
    </aside>
  );
}

/* ─── Topbar ─────────────────────────────────────────────────────── */
function Topbar({ active, sidebarOpen, setSidebarOpen, isMobile }) {
  const [userMenu, setUserMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <header
      className="dash-topbar"
      style={{
        position: 'fixed', top: 0, left: isMobile ? 0 : 240, right: 0, height: isMobile ? 56 : 60,
        background: '#FFFFFF', borderBottom: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', padding: isMobile ? '0 12px' : '0 22px', gap: 14, zIndex: 90,
        width: isMobile ? '100%' : 'auto',
      }}
    >
      {/* Hamburger (mobile) */}
      <button
        className="dash-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: isMobile ? 'flex' : 'none', background: 'none', border: 'none',
          cursor: 'pointer', color: '#0F0F0F', padding: 8, borderRadius: 6,
          alignItems: 'center', justifyContent: 'center', minWidth: 44, minHeight: 44,
        }}
      >
        <Ico n={sidebarOpen ? 'x' : 'menu'} s={22} />
      </button>

      {/* Logo mobile */}
      {isMobile && (
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12.5,
          color: '#0F0F0F', letterSpacing: '0.08em', textTransform: 'uppercase',
          flex: 1, textAlign: 'center',
        }}>
          IL CONO PIZZA
        </span>
      )}

      {/* Breadcrumb (desktop only) */}
      {!isMobile && (
        <div
          className="dash-breadcrumb"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <span style={{ color: '#9CA3AF' }}>Dashboard</span>
          <span style={{ margin: '0 6px', color: '#D1D5DB' }}>/</span>
          <span style={{ color: '#0F0F0F', fontWeight: 600 }}>{SECTION_LABEL[active] || 'Panoramica'}</span>
        </div>
      )}

      {/* Search desktop */}
      {!isMobile && (
        <div className="dash-search" style={{ flex: 1, maxWidth: 380, margin: '0 auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
            <Ico n="search" s={14} />
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cerca lead, campagne..."
            style={{
              width: '100%', padding: '8px 16px 8px 36px',
              background: '#F8F8F8', border: '1px solid #E5E7EB',
              borderRadius: 24, fontFamily: 'Inter, sans-serif',
              fontSize: 13, color: '#0F0F0F', outline: 'none', transition: 'all 0.15s',
            }}
            onFocus={e => { e.target.style.borderColor = '#9CA3AF'; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F8F8F8'; }}
          />
        </div>
      )}

      {/* Search mobile button */}
      {isMobile && !searchExpanded && (
        <button
          onClick={() => setSearchExpanded(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#0F0F0F',
            padding: 8, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 44, minHeight: 44, marginLeft: 'auto',
          }}
        >
          <Ico n="search" s={18} />
        </button>
      )}

      {/* Search mobile expanded */}
      {isMobile && searchExpanded && (
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
            <Ico n="search" s={14} />
          </span>
          <input
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cerca..."
            style={{
              flex: 1, padding: '8px 16px 8px 36px',
              background: '#F8F8F8', border: '1px solid #E5E7EB',
              borderRadius: 20, fontFamily: 'Inter, sans-serif',
              fontSize: 13, color: '#0F0F0F', outline: 'none', transition: 'all 0.15s',
            }}
            onBlur={() => { setSearchExpanded(false); setSearch(''); }}
          />
        </div>
      )}

      <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto', flexShrink: 0 }}>
        {/* Avatar / user menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setUserMenu(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '5px 10px', borderRadius: 8, transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #C7D9FF, #E4D9FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: 12, color: '#2A4E8C',
            }}>CP</div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#0F0F0F', fontWeight: 500 }}>Cono Pizza</span>
            <Ico n="chevDown" s={13} c="#9CA3AF" />
          </button>

          {userMenu && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: '#FFFFFF', border: '1px solid #E5E7EB',
              borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              minWidth: 170, overflow: 'hidden',
              animation: 'fadeSlideIn 0.15s ease both', zIndex: 200,
            }}>
              {[['Il profilo', false], ['Impostazioni', false], ['Esci', true]].map(([label, danger]) => (
                <button
                  key={label}
                  onClick={() => setUserMenu(false)}
                  style={{
                    width: '100%', padding: '10px 16px', background: 'none',
                    border: 'none', borderTop: danger ? '1px solid #F3F4F6' : 'none',
                    textAlign: 'left', fontFamily: 'Inter, sans-serif',
                    fontSize: 13, color: danger ? '#EF4444' : '#0F0F0F',
                    cursor: 'pointer', transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F8F8F8'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Avatar mobile */}
      {isMobile && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #C7D9FF, #E4D9FF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: 11, color: '#2A4E8C', flexShrink: 0,
        }}>CP</div>
      )}
    </header>
  );
}

/* ─── Placeholder sections ───────────────────────────────────────── */
function Placeholder({ label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '52vh', gap: 12, color: '#9CA3AF',
    }}>
      <div style={{ fontSize: 42 }}>🚧</div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500 }}>
        {label} — in costruzione
      </div>
    </div>
  );
}

/* ─── WhatsApp Upgrade Page ──────────────────────────────────────── */
function WhatsAppUpgrade({ onActivate }) {
  const [bubbleIdx, setBubbleIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleIdx(i => (i + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginBottom: 28 }}>
      {/* HERO SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)',
        borderRadius: 20, padding: '48px', marginBottom: 32, display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <span style={{
            display: 'inline-block', fontSize: 12, fontFamily: 'Inter, sans-serif',
            fontWeight: 600, background: 'rgba(255,255,255,0.15)', color: '#fff',
            padding: '6px 16px', borderRadius: 30, marginBottom: 20,
          }}>
            🟢 Disponibile ora · da €15/mese
          </span>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 42,
            color: '#fff', lineHeight: 1.1, marginBottom: 16,
          }}>
            Raggiungi i tuoi clienti dove sono già.
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.6, marginBottom: 32,
          }}>
            Messaggi automatici, promozioni e fidelizzazione direttamente su WhatsApp — il canale con il 98% di tasso di apertura.
          </p>
          <button
            onClick={onActivate}
            style={{
              padding: '16px 32px', background: '#fff', border: 'none',
              borderRadius: 12, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: 16, color: '#075E54', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
          >
            Attiva WhatsApp ora →
          </button>
        </div>

        {/* Right - Chat mockup */}
        <div style={{
          background: '#ECE5DD', borderRadius: 16, padding: 20, boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          maxHeight: 400, overflowY: 'auto',
        }}>
          {[
            { text: '🍕 Ciao Marco! Il tuo cono gratis è pronto.\nCodice: CONO-XK9F\nValido fino a domenica!\n📍 Via Isonzo 22, Busto Arsizio', side: 'left', delay: 0.3 },
            { text: 'Perfetto grazie! Vengo stasera 😊', side: 'right', delay: 0.8 },
            { text: '🎂 Buon compleanno Marco!\nOggi il cono è offerto da noi.\nVieni a festeggiare con noi!', side: 'left', delay: 1.4 },
          ].map((bubble, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: bubble.side === 'left' ? 'flex-start' : 'flex-end',
              marginBottom: 12, opacity: bubbleIdx >= i ? 1 : 0.4, transition: 'opacity 0.5s',
            }}>
              <div style={{
                maxWidth: '70%', padding: '10px 14px', borderRadius: bubble.side === 'left' ? '12px 12px 12px 0' : '12px 12px 0 12px',
                background: bubble.side === 'left' ? '#fff' : '#DCF8C6', fontSize: 12.5, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap', lineHeight: 1.5,
              }}>
                {bubble.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { num: '98%', label: 'Tasso di apertura', sub: 'vs 22% delle email', icon: '📬' },
          { num: '3x', label: 'Più conversioni', sub: 'rispetto agli SMS', icon: '📈' },
          { num: '< 3min', label: 'Tempo di lettura', sub: 'dal momento dell\'invio', icon: '⚡' },
          { num: '2 mld+', label: 'Utenti attivi', sub: 'nel mondo ogni giorno', icon: '🌍' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff', border: '1px solid #BBF7D0', borderRadius: 16, padding: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 28, color: '#25D366', marginBottom: 4 }}>
              {stat.num}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#0F0F0F', marginBottom: 3 }}>
              {stat.label}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* FEATURES SECTION */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 26, color: '#0F0F0F', marginBottom: 6 }}>
          Tutto quello che puoi fare
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B7280', marginBottom: 28 }}>
          Una sola integrazione. Infinite possibilità.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { title: 'Automazioni intelligenti', desc: 'Benvenuto, reminder coupon, compleanno, win-back. Si attivano da soli — tu non fai nulla.', icon: '🤖' },
            { title: 'Promo a tutta la lista', desc: 'Scrivi una volta, manda a centinaia di clienti in un click. Promozioni, chiusure, novità.', icon: '📢' },
            { title: 'Inbox unificata', desc: 'Tutte le risposte dei clienti in un unico posto. Niente app, niente telefono in mano.', icon: '💬' },
            { title: 'Template pronti', desc: 'Messaggi pre-approvati da Meta già scritti per te. Attivi in 24 ore.', icon: '📄' },
            { title: 'Statistiche reali', desc: 'Quanti hanno aperto, cliccato, risposto. Ogni messaggio tracciato.', icon: '📊' },
            { title: 'Manda al cliente giusto', desc: 'Filtra per piano, stato, ultima visita. Raggiungi solo chi vuoi raggiungere.', icon: '🎯' },
          ].map((feat, i) => (
            <div key={i} style={{
              background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: 24,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{feat.icon}</div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#0F0F0F', marginBottom: 8 }}>
                {feat.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 26, color: '#0F0F0F', marginBottom: 28, textAlign: 'center' }}>
          Attivo in 3 passi
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center' }}>
          {[
            { num: '1', title: 'Attivi la funzionalità', desc: 'Clicchi il pulsante qui sotto e inserisci il numero WhatsApp Business del locale.' },
            { num: '2', title: 'Colleghi il numero', desc: 'Scansioni un QR code con WhatsApp Business sul telefono. Fatto — connessione attiva.' },
            { num: '3', title: 'Inizia a inviare', desc: 'I messaggi automatici partono da soli. Le promo le mandi quando vuoi.' },
          ].map((step, i) => (
            <div key={i} style={{ flex: '0 0 calc(33.333% - 14px)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: '#25D366', color: '#fff',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {step.num}
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: '#0F0F0F', marginBottom: 4 }}>
                  {step.title}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#6B7280', lineHeight: 1.5 }}>
                  {step.desc}
                </div>
              </div>
              {i < 2 && <div style={{ fontSize: 20, color: '#9CA3AF', margin: '0 8px' }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div style={{
        background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)',
        borderRadius: 20, padding: 40, marginBottom: 32, textAlign: 'center', color: '#fff',
      }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 32, marginBottom: 8 }}>
          Un prezzo onesto.
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, marginBottom: 32, opacity: 0.9 }}>
          Niente sorprese.
        </p>

        <div style={{
          background: '#fff', borderRadius: 16, padding: 32, maxWidth: 400, margin: '0 auto',
          color: '#0F0F0F',
        }}>
          <div style={{ background: '#25D366', color: '#fff', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 700, padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 16 }}>
            Più popolare
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 24, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>da</span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 64, color: '#075E54' }}>€15</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6B7280' }}>/mese</span>
          </div>

          <div style={{ textAlign: 'left', marginBottom: 24, borderBottom: '1px solid #F3F4F6', paddingBottom: 24 }}>
            {[
              'Messaggi automatici illimitati',
              'Broadcast fino a 500 contatti',
              'Template pre-approvati inclusi',
              'Inbox conversazioni',
              'Analytics e statistiche',
              'Supporto configurazione incluso',
            ].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#0F0F0F', marginBottom: 10 }}>
                <span style={{ color: '#25D366', fontWeight: 700 }}>✓</span>
                {feat}
              </div>
            ))}
          </div>

          <button
            onClick={onActivate}
            style={{
              width: '100%', padding: 18, background: '#25D366', border: 'none',
              borderRadius: 12, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: 14, color: '#fff', cursor: 'pointer', marginBottom: 16,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1fa857'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; }}
          >
            Attiva ora per €15/mese →
          </button>

          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>
            🔒 Disdici quando vuoi · Niente contratti
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>
            * Costo conversazioni Meta separato e variabile — in media €0,05 a conversazione
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: 20, border: '1px solid #E5E7EB' }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>💬</div>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 28, color: '#0F0F0F', marginBottom: 8 }}>
          I tuoi clienti sono già su WhatsApp.
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6B7280', marginBottom: 28 }}>
          Raggiungili dove controllano lo schermo 30 volte al giorno.
        </p>
        <button
          onClick={onActivate}
          style={{
            padding: '14px 40px', background: '#25D366', border: 'none',
            borderRadius: 12, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
            fontSize: 15, color: '#fff', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1fa857'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Attiva WhatsApp →
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [active, setActive] = useState('panoramica');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [waConnected, setWaConnected] = useState(false);
  const [waPage, setWaPage] = useState('broadcast');
  const [waOpen, setWaOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wa_connected') === 'true';
    setWaConnected(stored);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Chiudi sidebar al cambio pagina su mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [active, isMobile]);

  const renderSection = () => {
    switch (active) {
      case 'panoramica':   return <Overview setActive={setActive} />;
      case 'leads':        return <Leads />;
      case 'email':        return <Email />;
      case 'recensioni':   return <Recensioni />;
      case 'impostazioni': return <Impostazioni />;
      case 'whatsapp': {
        if (!waConnected) {
          return <WhatsAppUpgrade onActivate={() => { setWaConnected(true); localStorage.setItem('wa_connected', 'true'); setWaPage('broadcast'); }} />;
        }
        switch (waPage) {
          case 'broadcast': return <WhatsAppBroadcast />;
          case 'automazioni': return <WhatsAppAutomazioni />;
          case 'conversazioni': return <WhatsAppConversazioni />;
          case 'impostazioni': return <WhatsAppImpostazioni onDisconnect={() => { setWaConnected(false); localStorage.setItem('wa_connected', 'false'); setWaPage('broadcast'); }} />;
          default: return <WhatsAppBroadcast />;
        }
      }
      default:             return <Placeholder label={SECTION_LABEL[active] || active} />;
    }
  };

  const navItems = [
    { id: 'panoramica', icon: 'grid', label: 'Home' },
    { id: 'leads', icon: 'users', label: 'Lead' },
    { id: 'email', icon: 'mail', label: 'Email' },
    { id: 'recensioni', icon: 'star', label: 'Recen.' },
    { id: 'menu', icon: 'menu', label: 'Menu' },
  ];

  return (
    <ToastProvider>
      <div style={{ minHeight: '100vh', background: '#F8F8F8', fontFamily: 'Inter, sans-serif' }}>
        {/* Mobile overlay */}
        {sidebarOpen && isMobile && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
              zIndex: 99, animation: 'fadeIn 0.2s ease',
            }}
          />
        )}

        <Sidebar
          active={active} setActive={setActive}
          open={sidebarOpen} setOpen={setSidebarOpen}
          emailOpen={emailOpen} setEmailOpen={setEmailOpen}
          waConnected={waConnected}
          waOpen={waOpen} setWaOpen={setWaOpen}
          setWaPage={setWaPage}
          isMobile={isMobile}
        />

        <Topbar
          active={active}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
        />

        <main
          className="dash-main"
          style={{
            marginLeft: isMobile ? 0 : 240,
            paddingTop: isMobile ? 56 : 60,
            minHeight: '100vh',
            paddingBottom: isMobile ? 80 : 0,
          }}
        >
          <div style={{ padding: `var(--content-p) var(--content-p) ${isMobile ? 48 : 48}px`, maxWidth: 1360 }}>
            {active === 'whatsapp' && waConnected && (
              <div style={{
                display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #E5E7EB',
                paddingBottom: 0, marginLeft: isMobile ? -16 : -28, marginRight: isMobile ? -16 : -28,
                paddingLeft: isMobile ? 16 : 28, paddingRight: isMobile ? 16 : 28,
                overflowX: isMobile ? 'auto' : 'visible',
                WebkitOverflowScrolling: 'touch',
              }}>
                {['broadcast', 'automazioni', 'conversazioni', 'impostazioni'].map(page => {
                  const labels = { broadcast: 'Broadcast', automazioni: 'Automazioni', conversazioni: 'Conversazioni', impostazioni: 'Impostazioni' };
                  return (
                    <button
                      key={page}
                      onClick={() => setWaPage(page)}
                      style={{
                        padding: '10px 16px', background: 'transparent', border: 'none',
                        borderBottom: waPage === page ? '2px solid #0F0F0F' : '2px solid transparent',
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13.5,
                        fontWeight: waPage === page ? 600 : 400,
                        color: waPage === page ? '#0F0F0F' : '#6B7280',
                        transition: 'color 0.15s', marginBottom: -1,
                        whiteSpace: 'nowrap', flexShrink: 0,
                        minHeight: 44,
                      }}
                    >
                      {labels[page]}
                    </button>
                  );
                })}
              </div>
            )}
            {renderSection()}
          </div>
        </main>

        {/* Bottom Navigation Mobile */}
        {isMobile && (
          <nav className="dash-bottom-nav" style={{ display: 'flex' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                className={active === item.id ? 'active' : ''}
                onClick={() => {
                  if (item.id === 'menu') {
                    setSidebarOpen(true);
                  } else {
                    setActive(item.id);
                  }
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  color: active === item.id ? '#0F0F0F' : '#9CA3AF',
                  transition: 'color 0.2s',
                  position: 'relative',
                  minHeight: 64,
                }}
              >
                <Ico n={item.icon} s={20} />
                <span>{item.label}</span>
                {active === item.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: '#0F0F0F',
                  }} />
                )}
              </button>
            ))}
          </nav>
        )}

        <ToastContainer />
      </div>
    </ToastProvider>
  );
}
