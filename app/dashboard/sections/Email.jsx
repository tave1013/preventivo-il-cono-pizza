'use client';

import { useState, useEffect } from 'react';
import { useToast } from '../context/useToast';
import { Modal } from '../components/Modal';

const CAMPAIGNS = [
  { id: 1, name: 'Benvenuto + Coupon Maggio', date: '01 Mag 2025', dest: 284, open: 191, openPct: 67.2, click: 84, clickPct: 29.6, unsub: 1, status: 'Inviata' },
  { id: 2, name: 'Promo Fine Settimana', date: '09 Mag 2025', dest: 264, open: 139, openPct: 52.7, click: 51, clickPct: 19.3, unsub: 2, status: 'Inviata' },
  { id: 3, name: 'Novità Menù Maggio', date: '16 Mag 2025', dest: 271, open: 127, openPct: 46.9, click: 43, clickPct: 15.9, unsub: 1, status: 'Inviata' },
];

const INITIAL_AUTOMAZIONI = [
  { id: 'benvenuto', name: 'Email di benvenuto', trigger: 'Nuova iscrizione', inviate: 47, openRate: 68, active: true, desc: 'Inviata subito dopo la registrazione con coupon di benvenuto.' },
  { id: 'winback', name: 'Win-back 30 giorni', trigger: 'Nessuna apertura da 30gg', inviate: 12, openRate: 31, active: true, desc: 'Riattiva i contatti che non interagiscono da un mese.' },
  { id: 'birthday', name: 'Email compleanno', trigger: 'Data di compleanno', inviate: 3, openRate: 84, active: false, desc: 'Invia un coupon regalo il giorno del compleanno del cliente.' },
];

const SEQUENZE = [
  { id: 1, name: 'Sequenza Benvenuto Nuovi Lead', emails: 5, attivi: 37, completamento: 74, tag: 'Evergreen' },
  { id: 2, name: 'Nurturing Clienti Plus', emails: 4, attivi: 14, completamento: 58, tag: 'VIP' },
  { id: 3, name: 'Recupero Carrello Abbandonato', emails: 3, attivi: 8, completamento: 41, tag: 'Promo' },
];

function CampagneTab({ onDetailClick }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
          {CAMPAIGNS.length} campagne totali · open rate medio <strong style={{ color: '#0F0F0F' }}>52.4%</strong>
        </span>
        <button style={{ padding: '8px 18px', background: '#0F0F0F', border: 'none', borderRadius: 9, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#fff', transition: 'opacity 0.15s' }} onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }} onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>+ Nuova campagna</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CAMPAIGNS.map(c => (
          <div key={c.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: '#0F0F0F', marginBottom: 4 }}>{c.name}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#6B7280' }}>
                <span>Inviata: {c.date}</span>
                <span>Destinatari: {c.dest}</span>
                {c.openPct && <span>Open rate: <strong style={{ color: '#0F0F0F' }}>{c.openPct}%</strong></span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => onDetailClick(c)} style={{ padding: '6px 14px', background: '#F3F4F6', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, cursor: 'pointer', color: '#0F0F0F' }}>Dettagli →</button>
              <span style={{ fontSize: 11, fontWeight: 600, background: c.status === 'Inviata' ? '#C3F0D5' : '#FFF0C2', color: c.status === 'Inviata' ? '#15803D' : '#92400E', padding: '4px 10px', borderRadius: 16, whiteSpace: 'nowrap' }}>{c.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomazioniTab({ automazioni, onToggle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {automazioni.map(a => (
        <div key={a.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: '#0F0F0F', margin: 0, marginBottom: 2 }}>{a.name}</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', margin: 0 }}>Trigger: {a.trigger}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label className="toggle-switch" style={{ margin: 0 }}>
                <input type="checkbox" checked={a.active} onChange={() => onToggle(a.id)} />
                <span className="slider" />
              </label>
              <span style={{ fontSize: 11, fontWeight: 600, background: a.active ? '#C3F0D5' : '#F3F4F6', color: a.active ? '#15803D' : '#6B7280', padding: '4px 10px', borderRadius: 16, whiteSpace: 'nowrap' }}>{a.active ? 'Attiva' : 'In pausa'}</span>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#374151', lineHeight: 1.5, margin: 0, marginBottom: 10 }}>{a.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inviate</div>
              <div style={{ fontSize: 20, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#0F0F0F' }}>{a.inviate}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Open rate</div>
              <div style={{ fontSize: 20, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#0F0F0F' }}>{a.openRate}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SequenzeTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {SEQUENZE.map(s => (
        <div key={s.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: '#0F0F0F', margin: 0, marginBottom: 4 }}>{s.name}</h4>
              <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#6B7280' }}>
                <span>{s.emails} email</span>
                <span>{s.attivi} attivi</span>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, background: '#C7D9FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: 16 }}>{s.tag}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Completamento</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#0F0F0F' }}>{s.completamento}%</span>
              </div>
              <div style={{ background: '#F3F4F6', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                <div style={{ width: `${s.completamento}%`, height: '100%', background: '#22C55E', borderRadius: 4 }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Email() {
  const { addToast } = useToast();
  const [tab, setTab] = useState('campagne');
  const [automazioni, setAutomazioni] = useState(INITIAL_AUTOMAZIONI);
  const [detailModal, setDetailModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleToggleAutomazione = (id) => {
    const updated = automazioni.map(a => a.id === id ? { ...a, active: !a.active } : a);
    setAutomazioni(updated);
    const auto = updated.find(a => a.id === id);
    addToast({
      type: 'success',
      message: `${auto.name} ${auto.active ? 'attivata' : 'messa in pausa'} ✓`,
    });
  };

  return (
    <div className="dash-fade">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F', marginBottom: 4 }}>Email Marketing</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>Gestisci campagne, automazioni e sequenze</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid #E5E7EB', paddingBottom: 0, overflowX: isMobile ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch' }}>
        {[
          { id: 'campagne', label: 'Campagne inviate' },
          { id: 'automazioni', label: 'Automazioni' },
          { id: 'sequenze', label: 'Sequenze' },
        ].map(t => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 18px',
                background: 'transparent',
                border: 'none',
                borderBottom: active ? '2px solid #0F0F0F' : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5,
                fontWeight: active ? 600 : 400,
                color: active ? '#0F0F0F' : '#6B7280',
                marginBottom: -1,
                transition: 'color 0.15s',
                whiteSpace: 'nowrap', flexShrink: 0, minHeight: 44,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === 'campagne' && <CampagneTab onDetailClick={setDetailModal} />}
      {tab === 'automazioni' && <AutomazioniTab automazioni={automazioni} onToggle={handleToggleAutomazione} />}
      {tab === 'sequenze' && <SequenzeTab />}

      {/* Campaign Detail Modal */}
      <Modal open={!!detailModal} onClose={() => setDetailModal(null)} title="Dettagli Campagna" size="md">
        {detailModal && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18, color: '#0F0F0F', margin: 0, marginBottom: 2 }}>{detailModal.name}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', margin: 0 }}>Inviata il {detailModal.date}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Destinatari</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#0F0F0F' }}>{detailModal.dest}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>ROAS (mock)</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: '#0F0F0F' }}>2.3x</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Aperture</span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#22C55E' }}>{detailModal.openPct}%</span>
                </div>
                <div style={{ background: '#F3F4F6', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${detailModal.openPct}%`, height: '100%', background: '#22C55E', borderRadius: 6 }} />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Click</span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#3B82F6' }}>{detailModal.clickPct}%</span>
                </div>
                <div style={{ background: '#F3F4F6', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${detailModal.clickPct}%`, height: '100%', background: '#3B82F6', borderRadius: 6 }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Disiscrizioni</span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#F97316' }}>{detailModal.unsub}</span>
                </div>
                <div style={{ background: '#F3F4F6', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${(detailModal.unsub / detailModal.dest) * 100}%`, height: '100%', background: '#FED7AA', borderRadius: 6 }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, margin: 0 }}>Top 3 link più cliccati</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['https://ilconopizza.it/promo', 'https://ilconopizza.it/menu', 'https://ilconopizza.it/coupon'].map((link, i) => (
                  <div key={i} style={{ background: '#F8F8F8', padding: '10px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: '#0F0F0F', minWidth: 20 }}>{i + 1}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{link}</span>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#0F0F0F', fontSize: 13 }}>{[32, 28, 19][i]} click</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
              <button onClick={() => setDetailModal(null)} style={{ padding: '10px 22px', background: '#F3F4F6', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#0F0F0F' }}>Chiudi</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
