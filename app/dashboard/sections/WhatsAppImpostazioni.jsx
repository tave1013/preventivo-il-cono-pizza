'use client';

import { useState } from 'react';
import { useToast } from '../context/useToast';

export default function WhatsAppImpostazioni({ onDisconnect }) {
  const { addToast } = useToast();
  const [nome, setNome] = useState('Il Cono Pizza di Busto Arsizio');
  const [firma, setFirma] = useState('Il Cono Pizza\nVia Italia 12, Busto Arsizio');

  return (
    <div className="dash-fade" style={{ maxWidth: 760 }}>
      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Impostazioni WhatsApp</h2>
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontWeight: 600 }}>Numero connesso</div>
          <span style={{ background: '#C3F0D5', color: '#15803D', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>Connesso</span>
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: 12 }}>+39 XXX XXX XXXX</div>
        <button onClick={() => { onDisconnect?.(); addToast({ type: 'warning', message: 'WhatsApp disconnesso' }); }} style={{ border: '1px solid #EF4444', color: '#EF4444', background: 'transparent', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer' }}>Disconnetti</button>
      </div>
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 20 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 6, color: '#6B7280' }}>Nome display</label>
          <input value={nome} onChange={e => setNome(e.target.value)} style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 12px' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 6, color: '#6B7280' }}>Firma automatica</label>
          <textarea value={firma} onChange={e => setFirma(e.target.value)} style={{ width: '100%', minHeight: 100, border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 12px' }} />
        </div>
        <button onClick={() => addToast({ type: 'success', message: 'Impostazioni salvate ✓' })} style={{ background: '#0F0F0F', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 600 }}>Salva</button>
      </div>
    </div>
  );
}
