'use client';

import { useState } from 'react';
import { useToast } from '../context/useToast';

const INITIAL_AUTOMAZIONI = [
  { id: 1, nome: 'Benvenuto nuovo lead', trigger: 'Iscrizione form', inviati: 47, letti: 91, risposte: 12, attiva: true },
  { id: 2, nome: 'Reminder coupon -48h', trigger: '5 giorni dopo iscrizione', inviati: 31, letti: 87, risposte: 8, attiva: true },
  { id: 3, nome: 'Buon compleanno', trigger: 'Data di nascita', inviati: 8, letti: 100, risposte: 3, attiva: false },
  { id: 4, nome: 'Win-back 30 giorni', trigger: 'Nessuna visita da 30gg', inviati: 14, letti: 79, risposte: 2, attiva: true },
  { id: 5, nome: 'Richiesta recensione', trigger: '2 giorni dopo prima visita', inviati: 22, letti: 86, risposte: 4, attiva: true },
];

export default function WhatsAppAutomazioni() {
  const { addToast } = useToast();
  const [automazioni, setAutomazioni] = useState(INITIAL_AUTOMAZIONI);

  const handleToggle = (id) => {
    const auto = automazioni.find(a => a.id === id);
    setAutomazioni(prev => prev.map(a => a.id === id ? { ...a, attiva: !a.attiva } : a));
    addToast({ type: 'success', message: `${auto.nome} ${!auto.attiva ? 'attivata' : 'disattivata'} ✓` });
  };

  return (
    <div className="dash-fade">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F', marginBottom: 4 }}>Automazioni WhatsApp</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>Messaggi automatici su trigger</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {automazioni.map(auto => (
          <div key={auto.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15 }}>{auto.nome}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>Trigger: {auto.trigger}</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={auto.attiva} onChange={() => handleToggle(auto.id)} />
                <span className="slider" />
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: auto.attiva ? '#C3F0D5' : '#F3F4F6', color: auto.attiva ? '#15803D' : '#6B7280' }}>
                {auto.attiva ? 'ATTIVA' : 'IN PAUSA'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div><div style={{ fontSize: 11, color: '#6B7280' }}>Inviati</div><div style={{ fontWeight: 700 }}>{auto.inviati}</div></div>
              <div><div style={{ fontSize: 11, color: '#6B7280' }}>Letti</div><div style={{ fontWeight: 700 }}>{auto.letti}%</div></div>
              <div><div style={{ fontSize: 11, color: '#6B7280' }}>Risposte</div><div style={{ fontWeight: 700, color: '#25D366' }}>{auto.risposte}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
