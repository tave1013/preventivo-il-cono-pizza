'use client';

import { useState, useEffect } from 'react';
import { useToast } from '../context/useToast';
import { Modal } from '../components/Modal';

const INITIAL_REVIEWS = [
  { id: 1, name: 'Marco Rossi', initials: 'MR', color: '#C7D9FF', tc: '#1D4ED8', stars: 5, date: '27 Mag 2025', status: 'Risposto', text: 'Il Cono Pizza di Busto Arsizio è semplicemente fantastico. Il cono è croccante, il topping abbondante e il personale sempre cortese. Tornerò sicuramente!', source: 'Google' },
  { id: 2, name: 'Giulia Ferrara', initials: 'GF', color: '#C3F0D5', tc: '#15803D', stars: 5, date: '24 Mag 2025', status: 'Risposto', text: 'Esperienza meravigliosa. Il cono vegano è una scoperta: ottimo anche senza latticini. Prezzi onestissimi e velocità di servizio impeccabile.', source: 'Google' },
  { id: 3, name: 'Luca Moretti', initials: 'LM', color: '#FFF0C2', tc: '#92400E', stars: 4, date: '21 Mag 2025', status: 'Da rispondere', text: 'Pizza buona, il cono è originale. Un punto in meno solo perché il locale era un po\' affollato e ho aspettato qualche minuto in più del solito.', source: 'Google' },
  { id: 4, name: 'Sofia Conti', initials: 'SC', color: '#E4D9FF', tc: '#5B21B6', stars: 5, date: '18 Mag 2025', status: 'Risposto', text: 'Finalmente una pizza in cono come si deve! Ho provato quello con salsiccia e friarielli: una bomba. Consiglio a tutti almeno una visita.', source: 'Google' },
  { id: 5, name: 'Andrea Bruno', initials: 'AB', color: '#FFD5D5', tc: '#991B1B', stars: 3, date: '15 Mag 2025', status: 'Da rispondere', text: 'Pizza discreta ma non eccezionale. Mi aspettavo qualcosa di più dato il buzz che ho sentito. Forse ho scelto il gusto sbagliato, ci riprovo.', source: 'Google' },
  { id: 6, name: 'Elena Vitale', initials: 'EV', color: '#C7D9FF', tc: '#1D4ED8', stars: 5, date: '12 Mag 2025', status: 'Risposto', text: 'Posto carino e originale. Il personale è gentilissimo e il cono pizza è un\'idea vincente. Perfetto per una pausa veloce a Busto Arsizio.', source: 'Google' },
];

const DIST = [
  { stars: 5, pct: 89, count: 110 },
  { stars: 4, pct: 8, count: 10 },
  { stars: 3, pct: 2, count: 2 },
  { stars: 2, pct: 1, count: 2 },
  { stars: 1, pct: 0, count: 0 },
];

function StarRow({ n, filled }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: n, color: i <= filled ? '#FBBF24' : '#E5E7EB', lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

export default function Recensioni() {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('Tutte');
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r => r.id === replyingId ? { ...r, status: 'Risposto' } : r));
    addToast({ type: 'success', message: 'Risposta pubblicata ✓' });
    setReplyingId(null);
    setReplyText('');
  };

  const filtered = reviews.filter(r => {
    if (filter === 'Da rispondere') return r.status === 'Da rispondere';
    if (filter === 'Risposto') return r.status === 'Risposto';
    return true;
  });

  return (
    <div className="dash-fade">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F' }}>
          Recensioni
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', marginTop: 4 }}>
          Monitora e rispondi alle recensioni dei clienti
        </p>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: 18, marginBottom: 24 }}>
        {/* Score */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 18, padding: '28px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 64, color: '#0F0F0F', lineHeight: 1 }}>
            4.9
          </div>
          <StarRow n={26} filled={5} />
          <div style={{ fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#6B7280', marginTop: 4 }}>
            su <strong style={{ color: '#0F0F0F' }}>124</strong> recensioni
          </div>
          <div style={{ marginTop: 10, padding: '6px 16px', background: '#C3F0D5', borderRadius: 20, fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#15803D' }}>
            🏆 Top 5% del settore
          </div>
        </div>

        {/* Distribution */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 18, padding: '22px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
            Distribuzione stelle
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DIST.map(d => (
              <div key={d.stars} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, width: 50 }}>
                  <span style={{ fontSize: 13, color: '#FBBF24' }}>★</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>{d.stars}</span>
                </div>
                <div style={{ flex: 1, background: '#F3F4F6', borderRadius: 6, height: 10, overflow: 'hidden' }}>
                  <div style={{
                    width: `${d.pct}%`, height: '100%',
                    background: d.pct >= 50 ? '#FBBF24' : d.pct >= 10 ? '#FCD34D' : '#FDE68A',
                    borderRadius: 6, transition: 'width 0.8s ease',
                  }} />
                </div>
                <div style={{ flexShrink: 0, width: 66, textAlign: 'right', fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#6B7280' }}>
                  <span style={{ fontWeight: 600, color: '#0F0F0F' }}>{d.pct}%</span>
                  <span style={{ marginLeft: 4, color: '#9CA3AF' }}>({d.count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['Tutte', 'Da rispondere', 'Risposto'].map(f => {
          const active = filter === f;
          const count = f === 'Tutte' ? reviews.length : reviews.filter(r => r.status === f).length;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 16px', borderRadius: 8, border: '1px solid #E5E7EB',
              background: active ? '#0F0F0F' : '#fff',
              color: active ? '#fff' : '#6B7280',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: active ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {f} <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700, background: active ? 'rgba(255,255,255,0.2)' : '#F3F4F6', padding: '0 5px', borderRadius: 10, color: active ? '#fff' : '#6B7280' }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Review cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(review => (
          <div key={review.id} style={{
            background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '20px 22px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%', background: review.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14,
                color: review.tc, flexShrink: 0,
              }}>{review.initials}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: '#0F0F0F' }}>{review.name}</span>
                  <StarRow n={14} filled={review.stars} />
                  <span style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>{review.date}</span>
                  <span style={{
                    fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, padding: '2px 9px', borderRadius: 20,
                    background: review.status === 'Risposto' ? '#C3F0D5' : '#FFF0C2',
                    color: review.status === 'Risposto' ? '#15803D' : '#92400E',
                  }}>{review.status}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>via {review.source}</span>
                </div>

                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                  "{review.text}"
                </p>

                <button
                  onClick={() => setReplyingId(review.id)}
                  style={{
                    padding: '7px 16px', background: 'transparent',
                    border: '1px solid #E5E7EB', borderRadius: 8,
                    fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 500,
                    color: '#0F0F0F', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F8F8F8'; e.currentTarget.style.borderColor = '#9CA3AF'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                >
                  {review.status === 'Risposto' ? '✏️ Modifica risposta' : '💬 Rispondi'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      <Modal open={!!replyingId} onClose={() => { setReplyingId(null); setReplyText(''); }} title="Rispondi alla recensione" size="md">
        {replyingId && (() => {
          const review = reviews.find(r => r.id === replyingId);
          return (
            <div>
              <div style={{ background: '#F8F8F8', padding: '14px', borderRadius: 10, marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <StarRow n={14} filled={review.stars} />
                  <span style={{ fontSize: 12, color: '#6B7280' }}>di {review.name}</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0 }}>"{review.text}"</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 8 }}>La tua risposta *</label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value.slice(0, 500))}
                    placeholder="Grazie per la tua recensione! Siamo felici che ti sia piaciuto..."
                    style={{
                      width: '100%',
                      minHeight: 100,
                      padding: '10px 12px',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13,
                      color: '#0F0F0F',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#9CA3AF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; }}
                  />
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, textAlign: 'right' }}>{replyText.length}/500</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
                <button
                  onClick={() => { setReplyingId(null); setReplyText(''); }}
                  style={{ padding: '10px 22px', background: '#F3F4F6', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#0F0F0F' }}
                >
                  Annulla
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                  style={{
                    padding: '10px 22px',
                    background: replyText.trim() ? '#0F0F0F' : '#D1D5DB',
                    border: 'none',
                    borderRadius: 8,
                    cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  Pubblica risposta
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
