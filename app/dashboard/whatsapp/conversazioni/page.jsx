'use client';

import { useState } from 'react';
import { useToast } from '../../context/useToast';

const MOCK_CONTACTS = [
  { id: 1, name: 'Marco Rossi', numero: '+39 328 123 4567', ultimoMsg: 'Perfetto, grazie!', ora: '11:42', nonLetti: 2, avatar: 'MR' },
  { id: 2, name: 'Giulia Bianchi', numero: '+39 333 456 7890', ultimoMsg: 'Quando siete aperti?', ora: '10:15', nonLetti: 1, avatar: 'GB' },
  { id: 3, name: 'Andrea Ferrari', numero: '+39 349 789 0123', ultimoMsg: 'Ok, a stasera', ora: '09:32', nonLetti: 0, avatar: 'AF' },
  { id: 4, name: 'Sara Verdi', numero: '+39 320 234 5678', ultimoMsg: 'Grazie mille!', ora: 'Ieri', nonLetti: 0, avatar: 'SV' },
];

const MOCK_MESSAGES = {
  1: [
    { id: 1, da: 'sistema', testo: 'Ciao Marco! 🍕 Il tuo cono gratis è pronto. Codice: CONO-XK9F', ora: '11:35', stato: 'letto' },
    { id: 2, da: 'cliente', testo: 'Ottimo! Vengo stasera', ora: '11:40', stato: 'letto' },
    { id: 3, da: 'sistema', testo: 'Ti aspettiamo! 😊', ora: '11:41', stato: 'letto' },
    { id: 4, da: 'cliente', testo: 'Perfetto, grazie!', ora: '11:42', stato: 'letto' },
  ],
  2: [
    { id: 1, da: 'cliente', testo: 'Quando siete aperti?', ora: '10:15', stato: 'letto' },
  ],
  3: [
    { id: 1, da: 'sistema', testo: 'Reminder: il tuo coupon scade domani! 🎉', ora: '09:30', stato: 'letto' },
    { id: 2, da: 'cliente', testo: 'Ok, a stasera', ora: '09:32', stato: 'letto' },
  ],
  4: [
    { id: 1, da: 'sistema', testo: 'Buon compleanno Sara! 🎂 Oggi il cono è offerto da noi!', ora: 'Ieri', stato: 'letto' },
    { id: 2, da: 'cliente', testo: 'Grazie mille!', ora: 'Ieri', stato: 'letto' },
  ],
};

export default function ConversazioniPage() {
  const { addToast } = useToast();
  const [selectedId, setSelectedId] = useState(1);
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSendReply = () => {
    if (!reply.trim()) return;

    setMessages(prev => ({
      ...prev,
      [selectedId]: [
        ...prev[selectedId],
        { id: prev[selectedId].length + 1, da: 'sistema', testo: reply, ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), stato: 'inviato' },
      ],
    }));

    addToast({ type: 'success', message: 'Risposta inviata ✓' });
    setReply('');
  };

  const selectedContact = MOCK_CONTACTS.find(c => c.id === selectedId);
  const chatMessages = messages[selectedId] || [];

  return (
    <div className="dash-fade" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0, height: 'calc(100vh - 148px)' }}>
      {/* Contact list */}
      <div style={{
        background: '#fff', borderRight: '1px solid #E5E7EB', overflowY: 'auto',
      }}>
        {MOCK_CONTACTS.map(contact => (
          <button
            key={contact.id}
            onClick={() => setSelectedId(contact.id)}
            style={{
              width: '100%', padding: '12px 16px', background: selectedId === contact.id ? '#F0FDF4' : '#fff',
              border: 'none', borderBottom: '1px solid #F3F4F6', cursor: 'pointer',
              display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => {
              if (selectedId !== contact.id) e.currentTarget.style.background = '#F8F8F8';
            }}
            onMouseLeave={e => {
              if (selectedId !== contact.id) e.currentTarget.style.background = '#fff';
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: '#E4D9FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12,
              color: '#5B21B6', flexShrink: 0,
            }}>
              {contact.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F0F0F', marginBottom: 2 }}>
                {contact.name}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 4 }}>
                {contact.ultimoMsg}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>
                {contact.ora}
              </div>
            </div>
            {contact.nonLetti > 0 && (
              <span style={{
                background: '#25D366', color: '#fff', fontSize: 10, fontFamily: 'Inter, sans-serif',
                fontWeight: 700, padding: '2px 6px', borderRadius: '50%', flexShrink: 0,
              }}>
                {contact.nonLetti}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#ECE5DD' }}>
        {/* Header */}
        {selectedContact && (
          <div style={{
            padding: '14px 20px', background: '#fff', borderBottom: '1px solid #E5E7EB',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: '#E4D9FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 11,
              color: '#5B21B6',
            }}>
              {selectedContact.avatar}
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, color: '#0F0F0F' }}>
                {selectedContact.name}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>
                {selectedContact.numero}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {chatMessages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex', justifyContent: msg.da === 'sistema' ? 'flex-start' : 'flex-end',
            }}>
              <div style={{
                maxWidth: '70%', padding: '10px 14px', borderRadius: msg.da === 'sistema' ? '12px 12px 12px 0' : '12px 12px 0 12px',
                background: msg.da === 'sistema' ? '#fff' : '#DCF8C6',
                fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.5, color: '#0F0F0F',
              }}>
                <div>{msg.testo}</div>
                <div style={{ fontSize: 11, marginTop: 4, color: msg.da === 'sistema' ? '#9CA3AF' : '#6B7280' }}>
                  {msg.ora}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        {selectedContact && (
          <div style={{
            padding: '12px 20px', background: '#fff', borderTop: '1px solid #E5E7EB',
            display: 'flex', gap: 10, alignItems: 'flex-end',
          }}>
            <input
              value={reply}
              onChange={e => setReply(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendReply();
                }
              }}
              placeholder="Scrivi un messaggio..."
              style={{
                flex: 1, padding: '10px 12px', border: '1px solid #E5E7EB',
                borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: '#0F0F0F', outline: 'none', resize: 'none', maxHeight: 100,
              }}
              onFocus={e => { e.target.style.borderColor = '#9CA3AF'; }}
              onBlur={e => { e.target.style.borderColor = '#E5E7EB'; }}
            />
            <button
              onClick={handleSendReply}
              disabled={!reply.trim()}
              style={{
                padding: '8px 16px', background: reply.trim() ? '#25D366' : '#D1D5DB',
                border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 600, color: '#fff', cursor: reply.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => {
                if (reply.trim()) e.currentTarget.style.background = '#1fa857';
              }}
              onMouseLeave={e => {
                if (reply.trim()) e.currentTarget.style.background = '#25D366';
              }}
            >
              Invia
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
