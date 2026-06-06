'use client';

import { useState } from 'react';
import { useToast } from '../../context/useToast';
import { Modal } from '../../components/Modal';

const INITIAL_AUTOMAZIONI = [
  { id: 1, nome: 'Benvenuto nuovo lead', trigger: 'Iscrizione form', inviati: 47, letti: 91, risposte: 12, attiva: true },
  { id: 2, nome: 'Reminder coupon -48h', trigger: '5 giorni dopo iscrizione', inviati: 31, letti: 87, risposte: 8, attiva: true },
  { id: 3, nome: 'Buon compleanno', trigger: 'Data di nascita', inviati: 8, letti: 100, risposte: 3, attiva: false },
  { id: 4, nome: 'Win-back 30 giorni', trigger: 'Nessuna visita da 30gg', inviati: 14, letti: 79, risposte: 2, attiva: true },
  { id: 5, nome: 'Richiesta recensione', trigger: '2 giorni dopo prima visita', inviati: 22, letti: 86, risposte: 4, attiva: true },
];

export default function AutomazioniPage() {
  const { addToast } = useToast();
  const [automazioni, setAutomazioni] = useState(INITIAL_AUTOMAZIONI);
  const [editingId, setEditingId] = useState(null);

  const handleToggle = (id) => {
    const auto = automazioni.find(a => a.id === id);
    setAutomazioni(prev => prev.map(a => a.id === id ? { ...a, attiva: !a.attiva } : a));
    addToast({ type: 'success', message: `${auto.nome} ${!auto.attiva ? 'attivata' : 'disattivata'} ✓` });
  };

  return (
    <div className="dash-fade">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F', marginBottom: 4 }}>
          Automazioni WhatsApp
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
          Messaggi che si inviano automaticamente al verificarsi di specifici eventi
        </p>
      </div>

      {/* Automazioni Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {automazioni.map(auto => (
          <div
            key={auto.id}
            style={{
              background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14,
              padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14.5, color: '#0F0F0F', marginBottom: 4 }}>
                  {auto.nome}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>
                  Trigger: {auto.trigger}
                </p>
              </div>

              {/* Toggle */}
              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, marginLeft: 12 }}>
                <input
                  type="checkbox"
                  checked={auto.attiva}
                  onChange={() => handleToggle(auto.id)}
                  style={{ display: 'none' }}
                />
                <div
                  onClick={() => handleToggle(auto.id)}
                  style={{
                    position: 'absolute', inset: 0, background: auto.attiva ? '#25D366' : '#D1D5DB',
                    borderRadius: '20px', cursor: 'pointer', transition: 'background 0.3s',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: 20, height: 20, background: '#fff', borderRadius: '50%',
                      left: auto.attiva ? 22 : 2, transition: 'left 0.3s',
                    }}
                  />
                </div>
              </label>
            </div>

            {/* Badge */}
            <div style={{ marginBottom: 16 }}>
              <span style={{
                fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 700,
                padding: '3px 10px', borderRadius: 20,
                background: auto.attiva ? '#C3F0D5' : '#F3F4F6',
                color: auto.attiva ? '#15803D' : '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {auto.attiva ? '● Attiva' : '● In pausa'}
              </span>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6B7280', marginBottom: 3 }}>
                  Inviati
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: '#0F0F0F' }}>
                  {auto.inviati}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6B7280', marginBottom: 3 }}>
                  Letti
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: '#0F0F0F' }}>
                  {auto.letti}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6B7280', marginBottom: 3 }}>
                  Risposte
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: '#25D366' }}>
                  {auto.risposte}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setEditingId(auto.id)}
              style={{
                width: '100%', padding: '9px 16px', background: '#F8F8F8',
                border: '1px solid #E5E7EB', borderRadius: 8,
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                color: '#0F0F0F', cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#F3F4F6';
                e.currentTarget.style.borderColor = '#D1D5DB';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F8F8F8';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              Modifica →
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        open={!!editingId}
        onClose={() => setEditingId(null)}
        title={automazioni.find(a => a.id === editingId)?.nome}
        size="md"
      >
        {editingId && (
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#374151', lineHeight: 1.6, marginBottom: 20 }}>
              Modifica il messaggio e le impostazioni di questa automazione.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                Messaggio
              </label>
              <textarea
                placeholder="Contenuto del messaggio"
                defaultValue="Ciao! Grazie per la tua iscrizione. Scopri le nostre promozioni esclusive!"
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB',
                  borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
                  color: '#0F0F0F', outline: 'none', minHeight: 100, resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                  Ora invio
                </label>
                <input
                  type="time"
                  defaultValue="09:00"
                  style={{
                    width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB',
                    borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
                    cursor: 'pointer', outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                  Fuso orario
                </label>
                <select
                  defaultValue="CET"
                  style={{
                    width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB',
                    borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
                    cursor: 'pointer', outline: 'none',
                  }}
                >
                  <option>CET (UTC+1)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
              <button
                onClick={() => setEditingId(null)}
                style={{
                  padding: '9px 20px', background: '#F3F4F6', border: 'none',
                  borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: 500, color: '#0F0F0F', cursor: 'pointer',
                }}
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  addToast({ type: 'success', message: 'Automazione aggiornata ✓' });
                  setEditingId(null);
                }}
                style={{
                  padding: '9px 20px', background: '#0F0F0F', border: 'none',
                  borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: 600, color: '#fff', cursor: 'pointer',
                }}
              >
                Salva modifiche
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
