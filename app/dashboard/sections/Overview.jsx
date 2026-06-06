'use client';

import { useState, useEffect } from 'react';

/* ─── Mock data ──────────────────────────────────────────────────── */
const CHART_DATA = [
  { day: 'Lun', w: 1, v: 3 }, { day: 'Mar', w: 1, v: 5 }, { day: 'Mer', w: 1, v: 4 },
  { day: 'Gio', w: 1, v: 8 }, { day: 'Ven', w: 1, v: 6 }, { day: 'Sab', w: 1, v: 11 }, { day: 'Dom', w: 1, v: 9 },
  { day: 'Lun', w: 2, v: 5 }, { day: 'Mar', w: 2, v: 7 }, { day: 'Mer', w: 2, v: 3 },
  { day: 'Gio', w: 2, v: 9 }, { day: 'Ven', w: 2, v: 12 }, { day: 'Sab', w: 2, v: 14 }, { day: 'Dom', w: 2, v: 10 },
  { day: 'Lun', w: 3, v: 6 }, { day: 'Mar', w: 3, v: 8 }, { day: 'Mer', w: 3, v: 5 },
  { day: 'Gio', w: 3, v: 11 }, { day: 'Ven', w: 3, v: 9 }, { day: 'Sab', w: 3, v: 16 }, { day: 'Dom', w: 3, v: 13 },
  { day: 'Lun', w: 4, v: 7 }, { day: 'Mar', w: 4, v: 10 }, { day: 'Mer', w: 4, v: 8 },
  { day: 'Gio', w: 4, v: 13 }, { day: 'Ven', w: 4, v: 11 }, { day: 'Sab', w: 4, v: 18 }, { day: 'Dom', w: 4, v: 15 },
];
const MAX_V = Math.max(...CHART_DATA.map(d => d.v));

const RECENT_LEADS = [
  { id: 1, name: 'Marco Rossi',    email: 'm.ro***@gmail.com',   date: 'Oggi, 09:41',   status: 'Nuovo',       color: '#C7D9FF', textColor: '#1D4ED8' },
  { id: 2, name: 'Giulia Ferrara', email: 'g.fer***@libero.it',  date: 'Oggi, 08:17',   status: 'Contattato',  color: '#FFF0C2', textColor: '#92400E' },
  { id: 3, name: 'Luca Moretti',   email: 'l.mor***@yahoo.it',   date: 'Ieri, 19:53',   status: 'Convertito',  color: '#C3F0D5', textColor: '#15803D' },
  { id: 4, name: 'Sofia Conti',    email: 's.con***@hotmail.it', date: 'Ieri, 14:22',   status: 'Nuovo',       color: '#C7D9FF', textColor: '#1D4ED8' },
  { id: 5, name: 'Andrea Bruno',   email: 'a.bru***@gmail.com',  date: '26 Mag, 11:05', status: 'Dormiente',   color: '#FFD5D5', textColor: '#991B1B' },
];

const SPARKLINES = {
  leads:    [4, 7, 5, 9, 8, 11, 14, 16],
  email:    [210, 195, 230, 218, 240, 260, 255, 275],
  coupon:   [5, 8, 6, 10, 9, 12, 11, 14],
  clienti:  [170, 174, 176, 179, 181, 184, 186, 189],
};

/* ─── Sub-components ─────────────────────────────────────────────── */
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28, marginTop: 8 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 3,
          background: color,
          height: `${Math.max(4, (v / max) * 100)}%`,
          transition: 'height 0.3s',
        }} />
      ))}
    </div>
  );
}

function KpiCard({ badge, badgeColor, number, label, sub, subColor, extra, delay }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className={`dash-fade-${delay}`}
      style={{
        background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18,
        padding: isMobile ? '16px 14px 12px' : '20px 22px 18px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column', gap: 0,
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {label}
        </span>
        <span style={{
          fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600,
          background: badgeColor, color: badgeColor === '#C7D9FF' ? '#1D4ED8' : badgeColor === '#E4D9FF' ? '#5B21B6' : badgeColor === '#FFF0C2' ? '#92400E' : '#15803D',
          padding: '3px 8px', borderRadius: 20,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {badge}
        </span>
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: isMobile ? 24 : 34, color: '#0F0F0F', lineHeight: 1.1, marginTop: 8 }}>
        {number}
      </div>
      {sub && (
        <div style={{ fontSize: 12, fontFamily: 'Inter, sans-serif', color: subColor || '#6B7280', marginTop: 4 }}>
          {sub}
        </div>
      )}
      {extra}
    </div>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{ background: '#F3F4F6', borderRadius: 6, height: 7, marginTop: 10, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: color,
        borderRadius: 6, transition: 'width 0.8s ease',
      }} />
    </div>
  );
}

/* ─── Overview section ───────────────────────────────────────────── */
export default function Overview({ setActive }) {
  const [tooltip, setTooltip] = useState(null); // { index, x, y }
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div>
      {/* Greeting */}
      <div className="dash-fade" style={{ marginBottom: 26 }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: isMobile ? 22 : 26, color: '#0F0F0F', lineHeight: 1.2 }}>
          Ciao, Cono Pizza 👋
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', marginTop: 5 }}>
          Ecco cosa è successo oggi — Martedì 3 Giugno 2025
        </p>
      </div>

      {/* KPI Cards */}
      <div
        className="kpi-grid"
        style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 16, marginBottom: 22 }}
      >
        <KpiCard
          delay="1" label="Nuovi Lead questo mese" badge="📈 Lead" badgeColor="#C7D9FF"
          number="47"
          sub={<span style={{ color: '#15803D', fontWeight: 600 }}>+12% <span style={{ color: '#6B7280', fontWeight: 400 }}>vs mese scorso</span></span>}
          extra={<Sparkline data={SPARKLINES.leads} color="#C7D9FF" />}
        />
        <KpiCard
          delay="2" label="Email inviate" badge="✉️ Email" badgeColor="#E4D9FF"
          number="1.284"
          sub={<><span style={{ fontWeight: 600, color: '#0F0F0F' }}>Open rate 41.2% </span><span style={{ color: '#15803D', fontWeight: 600 }}>↑ 3.1%</span></>}
          extra={<Sparkline data={SPARKLINES.email} color="#E4D9FF" />}
        />
        <KpiCard
          delay="3" label="Coupon utilizzati" badge="🎁 Promo" badgeColor="#FFF0C2"
          number="23 / 50"
          sub={<span style={{ color: '#92400E', fontWeight: 600 }}>Promo 2×1 attiva</span>}
          extra={
            <>
              <ProgressBar pct={46} color="#FBBF24" />
              <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif', marginTop: 5 }}>46% del limite</div>
            </>
          }
        />
        <KpiCard
          delay="4" label="Clienti attivi" badge="⭐ VIP" badgeColor="#C3F0D5"
          number="189"
          sub={<><span style={{ color: '#15803D', fontWeight: 600 }}>+8 questo mese </span><span style={{ color: '#6B7280', fontWeight: 400 }}>· 12 VIP</span></>}
          extra={<Sparkline data={SPARKLINES.clienti} color="#C3F0D5" />}
        />
      </div>

      {/* Chart + Recent leads */}
      <div
        className="chart-leads-row"
        style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '60% 40%', gap: 16, marginBottom: 22 }}
      >
        {/* Bar chart */}
        <div
          className="dash-fade-1"
          style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18,
            padding: '22px 24px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Nuovi lead
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, color: '#0F0F0F', marginTop: 2 }}>
                Ultimi 28 giorni
              </div>
            </div>
            <div style={{
              fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600,
              background: '#C3F0D5', color: '#15803D', padding: '4px 12px', borderRadius: 20,
            }}>
              Totale: 47
            </div>
          </div>

          {/* Chart bars */}
          <div style={{ position: 'relative' }}>
            {/* Y-axis labels */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[20, 15, 10, 5, 0].map(v => (
                <span key={v} style={{ fontSize: 10, color: '#D1D5DB', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>{v}</span>
              ))}
            </div>

            <div style={{ marginLeft: 24, display: 'flex', alignItems: 'flex-end', height: 140, gap: 4, position: 'relative' }}>
              {CHART_DATA.map((d, i) => {
                const barH = Math.max(4, (d.v / MAX_V) * 126);
                const isHovered = tooltip?.index === i;
                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', position: 'relative', cursor: 'pointer' }}
                    onMouseEnter={() => setTooltip({ index: i, v: d.v, day: d.day, w: d.w })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div style={{
                        position: 'absolute', bottom: barH + 8, left: '50%', transform: 'translateX(-50%)',
                        background: '#0F0F0F', color: '#fff', fontSize: 11, fontFamily: 'Inter, sans-serif',
                        fontWeight: 600, padding: '4px 9px', borderRadius: 7, whiteSpace: 'nowrap',
                        zIndex: 10, pointerEvents: 'none',
                      }}>
                        {d.v} lead
                      </div>
                    )}
                    <div
                      className="bar-animated"
                      style={{
                        width: '100%', height: barH,
                        background: isHovered ? '#E4D9FF' : '#C7D9FF',
                        borderRadius: '4px 4px 2px 2px',
                        transition: 'background 0.15s',
                        '--bar-h': `${barH}px`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-axis week labels */}
            <div style={{ marginLeft: 24, display: 'flex', marginTop: 6 }}>
              {['Sett. 1', 'Sett. 2', 'Sett. 3', 'Sett. 4'].map((w, i) => (
                <div key={w} style={{ flex: 7, textAlign: 'center', fontSize: 10, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent leads */}
        <div
          className="dash-fade-2"
          style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18,
            padding: '22px 22px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#0F0F0F', marginBottom: 16 }}>
            Ultimi lead ricevuti
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {RECENT_LEADS.map((lead, i) => (
              <div key={lead.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                borderBottom: i < RECENT_LEADS.length - 1 ? '1px solid #F3F4F6' : 'none',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: lead.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
                  color: lead.textColor, flexShrink: 0,
                }}>
                  {lead.name.split(' ').map(p => p[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#0F0F0F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lead.name}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#9CA3AF', marginTop: 1 }}>
                    {lead.email}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    background: lead.color, color: lead.textColor,
                    padding: '2px 8px', borderRadius: 20,
                  }}>
                    {lead.status}
                  </span>
                  <div style={{ fontSize: 10.5, color: '#9CA3AF', fontFamily: 'Inter, sans-serif', marginTop: 3 }}>
                    {lead.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActive?.('leads')}
            style={{
              marginTop: 12, background: 'none', border: 'none',
              color: '#6B7280', fontFamily: 'Inter, sans-serif',
              fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
              padding: 0, textAlign: 'left', transition: 'color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0F0F0F'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; }}
          >
            Vedi tutti →
          </button>
        </div>
      </div>

      {/* Info cards row */}
      <div
        className="info-cards-row"
        style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}
      >
        {/* Newsletter card */}
        <div
          className="dash-fade-1"
          style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18,
            padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Prossima email
            </span>
            <span style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, background: '#FFF0C2', color: '#92400E', padding: '3px 10px', borderRadius: 20 }}>
              📅 Programmata
            </span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#0F0F0F', marginBottom: 6 }}>
            Newsletter Giugno
          </div>
          <div style={{ fontSize: 12.5, color: '#6B7280', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
            <div>📆 Mer 4 Giugno · ore 10:00</div>
            <div>👥 284 destinatari</div>
          </div>
          <button style={{
            marginTop: 14, padding: '8px 16px', background: '#0F0F0F',
            border: 'none', borderRadius: 8, color: '#fff',
            fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 500,
            cursor: 'pointer', transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Modifica
          </button>
        </div>

        {/* Ads campaign card */}
        <div
          className="dash-fade-2"
          style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18,
            padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Campagna Ads
            </span>
            <span style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, background: '#C3F0D5', color: '#15803D', padding: '3px 10px', borderRadius: 20 }}>
              🟢 Attiva
            </span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#0F0F0F', marginBottom: 10 }}>
            Promo Cono Gratis
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: 'Inter, sans-serif', color: '#6B7280', marginBottom: 6 }}>
            <span>Budget speso</span>
            <span style={{ fontWeight: 600, color: '#0F0F0F' }}>€47 / €150</span>
          </div>
          <ProgressBar pct={31} color="#C3F0D5" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12.5, fontFamily: 'Inter, sans-serif', color: '#6B7280' }}>
            <span>Lead generati: <strong style={{ color: '#0F0F0F' }}>23</strong></span>
            <span>CPC medio: <strong style={{ color: '#0F0F0F' }}>€2,04</strong></span>
          </div>
        </div>

        {/* Google My Business card */}
        <div
          className="dash-fade-3"
          style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18,
            padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Scheda attività
            </span>
            <span style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, background: '#C7D9FF', color: '#1D4ED8', padding: '3px 10px', borderRadius: 20 }}>
              ✓ Aggiornato
            </span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#0F0F0F', marginBottom: 12 }}>
            Presenza Locale
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              ['👁️ Visualizzazioni', '1.240'],
              ['📍 Click direzioni', '87'],
              ['📞 Chiamate', '23'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontFamily: 'Inter, sans-serif' }}>
                <span style={{ color: '#6B7280' }}>{label}</span>
                <span style={{ fontWeight: 600, color: '#0F0F0F' }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>
            Ultimo aggiornamento: 2 giorni fa
          </div>
        </div>
      </div>
    </div>
  );
}
