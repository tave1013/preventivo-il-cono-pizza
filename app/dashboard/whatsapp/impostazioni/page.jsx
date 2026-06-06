'use client';

import { useState } from 'react';
import { useToast } from '../../context/useToast';

export default function ImpostazioniPage() {
  const { addToast } = useToast();
  const [numero, setNumero] = useState('+39 328 123 4567');
  const [nome, setNome] = useState('Il Cono Pizza di Busto Arsizio');
  const [orariNotturni, setOrariNotturni] = useState(false);
  const [firma, setFirma] = useState('Il Cono Pizza\nVia Italia 12, Busto Arsizio (VA)\nwww.ilconopizza.it');

  const handleSave = () => {
    addToast({ type: 'success', message: 'Impostazioni salvate ✓' });
  };

  const handleDisconnect = () => {
    addToast({ type: 'warning', message: 'WhatsApp disconnesso. Puoi riconnetterti quando vuoi.' });
    localStorage.setItem('wa_connected', 'false');
    window.location.href = '/dashboard';
  };

  return (
    <div className="dash-fade" style={{ maxWidth: 800 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F', marginBottom: 4 }}>
          Impostazioni WhatsApp
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
          Configura il numero, gli orari e la firma automatica
        </p>
      </div>

      {/* Numero connesso */}
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px', marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#0F0F0F', marginBottom: 6 }}>
              Numero connesso
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>
              Il numero WhatsApp Business collegato a questo account
            </p>
          </div>
          <span style={{
            background: '#C3F0D5', color: '#15803D', fontSize: 10, fontFamily: 'Inter, sans-serif',
            fontWeight: 700, padding: '6px 12px', borderRadius: 20,
          }}>
            ✓ Connesso
          </span>
        </div>

        <div style={{
          padding: '16px 14px', background: '#F8F8F8', border: '1px solid #E5E7EB',
          borderRadius: 10, fontFamily: 'Space Grotesk, sans-serif', fontSize: 16,
          fontWeight: 600, color: '#0F0F0F', marginBottom: 16, letterSpacing: '0.05em',
        }}>
          {numero}
        </div>

        <button
          onClick={handleDisconnect}
          style={{
            padding: '10px 20px', background: 'transparent', border: '1px solid #EF4444',
            borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
            color: '#EF4444', cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#FEF2F2';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Disconnetti
        </button>
      </div>

      {/* Nome display */}
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px', marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#0F0F0F', marginBottom: 12 }}>
          Nome display WhatsApp Business
        </h3>
        <input
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB',
            borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#0F0F0F', outline: 'none', marginBottom: 16,
            transition: 'border-color 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = '#9CA3AF'; }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; }}
        />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>
          Questo nome apparirà nei messaggi che invii ai clienti
        </p>
      </div>

      {/* Orari invio */}
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px', marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#0F0F0F', marginBottom: 12 }}>
          Orari di invio
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flex: 1 }}>
            <input
              type="checkbox"
              checked={orariNotturni}
              onChange={e => setOrariNotturni(e.target.checked)}
              style={{ cursor: 'pointer', width: 18, height: 18 }}
            />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#0F0F0F' }}>
              Consenti invii notturni (22:00 - 08:00)
            </span>
          </label>
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>
          Per impostazione predefinita, i messaggi automatici non vengono inviati durante la notte per evitare di disturbare i clienti
        </p>
      </div>

      {/* Firma automatica */}
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px', marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#0F0F0F', marginBottom: 12 }}>
          Firma automatica
        </h3>
        <textarea
          value={firma}
          onChange={e => setFirma(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB',
            borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#0F0F0F', outline: 'none', resize: 'vertical',
            minHeight: 100, marginBottom: 16, transition: 'border-color 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = '#9CA3AF'; }}
          onBlur={e => { e.target.style.borderColor = '#E5E7EB'; }}
        />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', marginBottom: 12 }}>
          Questa firma verrà aggiunta automaticamente al termine dei messaggi che invii manualmente
        </p>

        {/* Preview */}
        <div style={{
          background: '#ECE5DD', borderRadius: 12, padding: 12,
          fontFamily: 'Inter, sans-serif', fontSize: 12.5, whiteSpace: 'pre-wrap',
          lineHeight: 1.5, color: '#0F0F0F',
        }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: 10, marginBottom: 8 }}>
            Ciao! Qui la firma aggiunta automaticamente:
          </div>
          <div style={{ background: '#DCF8C6', borderRadius: 8, padding: 10, textAlign: 'right' }}>
            {firma}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '11px 28px', background: '#0F0F0F', border: 'none',
            borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13.5,
            fontWeight: 600, color: '#fff', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Salva impostazioni
        </button>
      </div>
    </div>
  );
}
