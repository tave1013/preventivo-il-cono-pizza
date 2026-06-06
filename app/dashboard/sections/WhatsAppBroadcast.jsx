'use client';

import { useState } from 'react';
import { useToast } from '../context/useToast';
import { Modal } from '../components/Modal';

const MOCK_BROADCASTS = [
  { id: 1, name: 'Promo weekend -30%', date: '28 Maggio 2026', destinatari: 847, consegnati: 789, letti: 678, risposte: 124, stato: 'Inviato' },
  { id: 2, name: 'Coupon compleanno', date: '25 Maggio 2026', destinatari: 521, consegnati: 501, letti: 412, risposte: 67, stato: 'Inviato' },
  { id: 3, name: 'Reminder chiusura', date: '22 Maggio 2026', destinatari: 412, consegnati: 398, letti: 321, risposte: 43, stato: 'Inviato' },
];

export default function WhatsAppBroadcast() {
  const { addToast } = useToast();
  const [broadcasts, setBroadcasts] = useState(MOCK_BROADCASTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ destinatari: 'tutti', messaggio: '', template: 'custom', schedule: false });
  const [charCount, setCharCount] = useState(0);

  const handleMessageChange = (e) => {
    const text = e.target.value;
    setFormData(p => ({ ...p, messaggio: text }));
    setCharCount(text.length);
  };

  const handleSendBroadcast = () => {
    if (!formData.messaggio.trim()) {
      addToast({ type: 'warning', message: 'Scrivi un messaggio prima di inviare' });
      return;
    }

    const newBroadcast = {
      id: broadcasts.length + 1,
      name: `Broadcast ${new Date().toLocaleDateString('it-IT')}`,
      date: new Date().toLocaleDateString('it-IT'),
      destinatari: formData.destinatari === 'tutti' ? 847 : Math.floor(Math.random() * 300) + 100,
      consegnati: 0,
      letti: 0,
      risposte: 0,
      stato: formData.schedule ? 'Programmato' : 'Inviato',
    };

    setBroadcasts(p => [newBroadcast, ...p]);
    addToast({ type: 'success', message: formData.schedule ? 'Broadcast programmato ✓' : 'Broadcast inviato ✓' });
    setModalOpen(false);
    setFormData({ destinatari: 'tutti', messaggio: '', template: 'custom', schedule: false });
    setCharCount(0);
  };

  return (
    <div className="dash-fade">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F', marginBottom: 4 }}>
            Broadcast WhatsApp
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
            Invia messaggi a tutta la tua lista di contatti
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: '10px 22px', background: '#25D366', border: 'none',
            borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13.5,
            fontWeight: 600, color: '#fff', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1fa857'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; }}
        >
          + Nuovo broadcast
        </button>
      </div>

      {/* Broadcasts Table */}
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16,
        overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6', background: '#F8F8F8' }}>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Nome campagna
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Data invio
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Destinatari
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Consegnati
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Letti
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Risposte
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Stato
              </th>
            </tr>
          </thead>
          <tbody>
            {broadcasts.map((bc, i) => (
              <tr key={bc.id} style={{ borderBottom: i < broadcasts.length - 1 ? '1px solid #F3F4F6' : 'none', background: i % 2 === 0 ? '#fff' : '#F8F8F8' }}>
                <td style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 500, color: '#0F0F0F' }}>
                  {bc.name}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
                  {bc.date}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>
                  {bc.destinatari}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
                  {bc.consegnati} ({Math.round((bc.consegnati / bc.destinatari) * 100)}%)
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
                  {bc.letti} ({Math.round((bc.letti / bc.destinatari) * 100)}%)
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#25D366' }}>
                  {bc.risposte}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    padding: '4px 10px', borderRadius: 20,
                    background: bc.stato === 'Inviato' ? '#C3F0D5' : '#FEF3C7',
                    color: bc.stato === 'Inviato' ? '#15803D' : '#92400E',
                  }}>
                    {bc.stato}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Broadcast Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuovo Broadcast WhatsApp" size="lg">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Left */}
          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Destinatari
            </label>
            <select
              value={formData.destinatari}
              onChange={e => setFormData(p => ({ ...p, destinatari: e.target.value }))}
              style={{
                width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB',
                borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: '#0F0F0F', outline: 'none', cursor: 'pointer',
              }}
            >
              <option value="tutti">Tutti i contatti (847)</option>
              <option value="nuovi">Solo nuovi (234)</option>
              <option value="convertiti">Solo convertiti (412)</option>
              <option value="custom">Personalizzato</option>
            </select>

            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Template
              </label>
              <select
                value={formData.template}
                onChange={e => setFormData(p => ({ ...p, template: e.target.value }))}
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB',
                  borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13,
                  color: '#0F0F0F', outline: 'none', cursor: 'pointer',
                }}
              >
                <option value="custom">Messaggio personalizzato</option>
                <option value="promo">Promo</option>
                <option value="reminder">Reminder</option>
                <option value="info">Info</option>
              </select>
            </div>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={formData.schedule}
                onChange={e => setFormData(p => ({ ...p, schedule: e.target.checked }))}
                style={{ cursor: 'pointer' }}
              />
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#0F0F0F', cursor: 'pointer' }}>
                Programma invio
              </label>
            </div>
          </div>

          {/* Right - Preview */}
          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Preview
            </label>
            <div style={{
              background: '#ECE5DD', borderRadius: 12, padding: 16, minHeight: 140,
              border: '1px solid #D3D3D3',
            }}>
              {formData.messaggio ? (
                <div style={{
                  background: '#fff', borderRadius: 8, padding: 12,
                  fontFamily: 'Inter, sans-serif', fontSize: 13.5, whiteSpace: 'pre-wrap',
                  lineHeight: 1.5, color: '#0F0F0F', maxHeight: 120, overflowY: 'auto',
                }}>
                  {formData.messaggio}
                </div>
              ) : (
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>
                  Il tuo messaggio apparirà qui...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message textarea */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Messaggio
            </label>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, color: charCount > 1000 ? '#EF4444' : '#9CA3AF',
            }}>
              {charCount} / 1024
            </span>
          </div>
          <textarea
            value={formData.messaggio}
            onChange={handleMessageChange}
            placeholder="Scrivi il tuo messaggio WhatsApp..."
            maxLength={1024}
            style={{
              width: '100%', padding: '12px 14px', border: '1px solid #E5E7EB',
              borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: '#0F0F0F', outline: 'none', resize: 'vertical',
              minHeight: 100, transition: 'border-color 0.15s',
            }}
            onFocus={e => { e.target.style.borderColor = '#9CA3AF'; }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
          <button
            onClick={() => setModalOpen(false)}
            style={{
              padding: '10px 20px', background: '#F3F4F6', border: 'none',
              borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
              fontWeight: 500, color: '#0F0F0F', cursor: 'pointer',
            }}
          >
            Annulla
          </button>
          <button
            onClick={handleSendBroadcast}
            style={{
              padding: '10px 20px', background: '#25D366', border: 'none',
              borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
              fontWeight: 600, color: '#fff', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1fa857'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; }}
          >
            {formData.schedule ? 'Programma invio' : 'Invia ora'} →
          </button>
        </div>
      </Modal>
    </div>
  );
}
