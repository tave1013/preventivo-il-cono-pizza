'use client';

import { useState } from 'react';
import { useToast } from '../context/useToast';

const CONTACTS = [
  { id: 1, name: 'Marco Rossi', ora: '11:42', last: 'Perfetto grazie!', unread: 2, avatar: 'MR' },
  { id: 2, name: 'Giulia Bianchi', ora: '10:15', last: 'Quando siete aperti?', unread: 1, avatar: 'GB' },
  { id: 3, name: 'Andrea Ferrari', ora: '09:32', last: 'Ok, a stasera', unread: 0, avatar: 'AF' },
];

const CHATS = {
  1: [
    { id: 1, from: 'system', text: 'Ciao Marco! Il tuo cono è pronto 🍕', time: '11:35' },
    { id: 2, from: 'client', text: 'Perfetto grazie!', time: '11:42' },
  ],
  2: [{ id: 1, from: 'client', text: 'Quando siete aperti?', time: '10:15' }],
  3: [{ id: 1, from: 'client', text: 'Ok, a stasera', time: '09:32' }],
};

export default function WhatsAppConversazioni() {
  const { addToast } = useToast();
  const [selected, setSelected] = useState(1);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(CHATS);

  const send = () => {
    if (!text.trim()) return;
    setMessages(prev => ({
      ...prev,
      [selected]: [...(prev[selected] || []), { id: Date.now(), from: 'system', text, time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) }],
    }));
    addToast({ type: 'success', message: 'Messaggio inviato ✓' });
    setText('');
  };

  return (
    <div className="dash-fade" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: 'calc(100vh - 170px)', border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ background: '#fff', borderRight: '1px solid #E5E7EB' }}>
        {CONTACTS.map(c => (
          <button key={c.id} onClick={() => setSelected(c.id)} style={{ width: '100%', background: selected === c.id ? '#F0FDF4' : '#fff', border: 'none', borderBottom: '1px solid #F3F4F6', padding: 12, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>{c.last}</div>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', background: '#ECE5DD' }}>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          {(messages[selected] || []).map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'system' ? 'flex-start' : 'flex-end', marginBottom: 8 }}>
              <div style={{ maxWidth: '70%', background: m.from === 'system' ? '#fff' : '#DCF8C6', borderRadius: m.from === 'system' ? '12px 12px 12px 0' : '12px 12px 0 12px', padding: '10px 12px' }}>
                <div style={{ fontSize: 13 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: 12, background: '#fff', borderTop: '1px solid #E5E7EB' }}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Scrivi un messaggio..." style={{ flex: 1, border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 12px' }} />
          <button onClick={send} style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', fontWeight: 600 }}>Invia</button>
        </div>
      </div>
    </div>
  );
}
