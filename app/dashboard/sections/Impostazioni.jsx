'use client';

import { useState } from 'react';
import { useToast } from '../context/useToast';
import { Modal } from '../components/Modal';

const PROFILE_INITIAL = { name: 'Il Cono Pizza di Busto Arsizio', address: 'Via Italia 12, 21052 Busto Arsizio (VA)', phone: '+39 039 123456', email: 'info@ilconopizza.it' };

const INTEGRATIONS = [
  { id: 'email', label: 'Email Marketing', desc: 'Piattaforma newsletter connessa', icon: '✉️', status: 'Connesso', statusColor: '#C3F0D5', statusText: '#15803D', actionLabel: 'Configura', actionStyle: 'outline' },
  { id: 'whatsapp', label: 'WhatsApp Business', desc: 'Automazioni via WhatsApp', icon: '💬', status: 'Non connesso', statusColor: '#F3F4F6', statusText: '#6B7280', actionLabel: 'Connetti', actionStyle: 'fill' },
  { id: 'gmb', label: 'Google Business', desc: 'Scheda attività sincronizzata', icon: '📍', status: 'Connesso', statusColor: '#C3F0D5', statusText: '#15803D', actionLabel: 'Gestisci', actionStyle: 'outline' },
  { id: 'meta', label: 'Meta Ads', desc: 'Campagne Facebook e Instagram', icon: '📣', status: 'Non connesso', statusColor: '#F3F4F6', statusText: '#6B7280', actionLabel: 'Connetti', actionStyle: 'fill' },
];

const NOTIFS_DEFAULT = {
  lead: true,
  coupon: true,
  recensione: true,
  report: false,
};

const NOTIF_LABELS = [
  { id: 'lead', label: 'Nuovo lead acquisito', desc: 'Ricevi una notifica quando un nuovo contatto entra nel tuo CRM' },
  { id: 'coupon', label: 'Coupon utilizzato', desc: 'Avviso ogni volta che un cliente riscatta un coupon' },
  { id: 'recensione', label: 'Nuova recensione', desc: 'Notifica immediata per ogni nuova recensione Google' },
  { id: 'report', label: 'Report settimanale', desc: 'Riepilogo delle performance ogni lunedì mattina via email' },
];

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider" />
    </label>
  );
}

export default function Impostazioni() {
  const { addToast } = useToast();
  const [profile, setProfile] = useState(PROFILE_INITIAL);
  const [profileSaved, setProfileSaved] = useState(true);
  const [notifs, setNotifs] = useState(NOTIFS_DEFAULT);
  const [activeTab, setActiveTab] = useState('profilo');
  const [connectModal, setConnectModal] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    setProfileSaved(false);
  };

  const handleSaveProfile = () => {
    addToast({ type: 'success', message: 'Modifiche salvate ✓' });
    setProfileSaved(true);
  };

  const handleToggleNotif = (id) => {
    setNotifs(prev => ({ ...prev, [id]: !prev[id] }));
    const label = NOTIF_LABELS.find(n => n.id === id)?.label;
    addToast({ type: 'success', message: `${label} ${notifs[id] ? 'disabilitata' : 'abilitata'} ✓` });
  };

  const handleConnectIntegration = () => {
    if (apiKey.trim()) {
      setIntegrations(prev => prev.map(i => i.id === connectModal.id ? { ...i, status: 'Connesso', statusColor: '#C3F0D5', statusText: '#15803D' } : i));
      addToast({ type: 'success', message: `${connectModal.label} connesso ✓` });
      setConnectModal(null);
      setApiKey('');
    }
  };

  return (
    <div className="dash-fade">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F' }}>
          Impostazioni
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', marginTop: 4 }}>
          Configura il tuo profilo, le integrazioni e le notifiche
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid #E5E7EB', paddingBottom: 0 }}>
        {[
          { id: 'profilo', label: 'Profilo attività' },
          { id: 'integrazioni', label: 'Integrazioni' },
          { id: 'notifiche', label: 'Notifiche' },
          { id: 'piano', label: 'Piano attivo' },
        ].map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* PROFILO TAB */}
      {activeTab === 'profilo' && (
        <div style={{ maxWidth: 600 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 18, padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 22 }}>
              Informazioni attività
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'name', label: 'Nome attività', placeholder: 'Nome del tuo locale' },
                { key: 'address', label: 'Indirizzo', placeholder: 'Via e città' },
                { key: 'phone', label: 'Telefono', placeholder: '+39 000 000000' },
                { key: 'email', label: 'Email di contatto', placeholder: 'info@...' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    value={profile[field.key]}
                    onChange={e => handleProfileChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '1px solid #E5E7EB', borderRadius: 10,
                      fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#0F0F0F',
                      outline: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#9CA3AF'; }}
                    onBlur={e => { e.target.style.borderColor = '#E5E7EB'; }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={profileSaved}
              style={{
                marginTop: 24, padding: '11px 28px',
                background: profileSaved ? '#D1D5DB' : '#0F0F0F',
                border: 'none', borderRadius: 10,
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                color: '#fff', cursor: profileSaved ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
              }}
            >
              {profileSaved ? '✓ Salvato' : 'Salva modifiche'}
            </button>
          </div>
        </div>
      )}

      {/* INTEGRAZIONI TAB */}
      {activeTab === 'integrazioni' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 760 }}>
          {integrations.map(int => (
            <div key={int.id} style={{
              background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '20px 22px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{int.icon}</div>
                <span style={{
                  fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                  background: int.statusColor, color: int.statusText,
                }}>{int.status}</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#0F0F0F', marginBottom: 4 }}>
                  {int.label}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#6B7280' }}>
                  {int.desc}
                </div>
              </div>
              <button
                onClick={() => int.status === 'Non connesso' && setConnectModal(int)}
                style={{
                  padding: '8px 16px', borderRadius: 8,
                  background: int.actionStyle === 'fill' ? '#0F0F0F' : 'transparent',
                  border: int.actionStyle === 'fill' ? 'none' : '1px solid #E5E7EB',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                  color: int.actionStyle === 'fill' ? '#fff' : '#0F0F0F',
                  cursor: 'pointer', transition: 'all 0.15s', alignSelf: 'flex-start',
                }}
                onMouseEnter={e => {
                  if (int.actionStyle === 'outline' && int.status === 'Non connesso') {
                    e.currentTarget.style.background = '#F8F8F8';
                    e.currentTarget.style.borderColor = '#9CA3AF';
                  }
                }}
                onMouseLeave={e => {
                  if (int.actionStyle === 'outline' && int.status === 'Non connesso') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }
                }}
              >
                {int.actionLabel} →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* NOTIFICHE TAB */}
      {activeTab === 'notifiche' && (
        <div style={{ maxWidth: 580 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 18, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Preferenze notifiche
              </div>
            </div>
            {NOTIF_LABELS.map((n, i) => (
              <div
                key={n.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 24px',
                  borderBottom: i < NOTIF_LABELS.length - 1 ? '1px solid #F3F4F6' : 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#0F0F0F', marginBottom: 3 }}>
                    {n.label}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#6B7280', lineHeight: 1.5 }}>
                    {n.desc}
                  </div>
                </div>
                <Toggle
                  checked={notifs[n.id]}
                  onChange={() => handleToggleNotif(n.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PIANO TAB */}
      {activeTab === 'piano' && (
        <div style={{ maxWidth: 500 }}>
          {/* Current plan */}
          <div style={{
            background: '#0F0F0F', borderRadius: 20, padding: '28px 32px', marginBottom: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  Piano attuale
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 26, color: '#fff' }}>
                  Piano Plus
                </div>
              </div>
              <div style={{ background: '#C3F0D5', color: '#15803D', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                Attivo
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
              {['Fino a 5.000 contatti', 'Email marketing + automazioni', 'Campagne Ads avanzate', 'Recensioni e risposte', 'Report settimanale'].map(feat => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: 'rgba(255,255,255,0.75)' }}>
                  <span style={{ color: '#22C55E', fontSize: 14 }}>✓</span>
                  {feat}
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 18, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 30, color: '#fff' }}>€249</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/mese</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.4)' }}>Rinnovo: 3 Giu 2025</span>
            </div>
          </div>

          {/* Upgrade card */}
          <div style={{
            background: '#fff', border: '2px solid #E4D9FF', borderRadius: 20, padding: '22px 28px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🚀</span>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: '#0F0F0F' }}>
                Passa al Piano Top
              </div>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 18 }}>
              Sblocca contatti illimitati, campagne social avanzate, landing page personalizzate e assistenza prioritaria.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#5B21B6' }}>€490</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF' }}>/mese</span>
            </div>
            <button style={{
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
              color: '#fff', cursor: 'pointer', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Upgrade a Top →
            </button>
          </div>
        </div>
      )}

      {/* Connect Integration Modal */}
      <Modal open={!!connectModal} onClose={() => { setConnectModal(null); setApiKey(''); }} title={`Connetti ${connectModal?.label}`} size="sm">
        {connectModal && (
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#374151', lineHeight: 1.6, marginBottom: 20 }}>
              Questa funzionalità è disponibile nel piano Plus e superiori. Per collegare {connectModal.label} avrai bisogno delle credenziali API.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 8 }}>API Key</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Inserisci la tua API Key"
                  style={{
                    width: '100%', padding: '10px 40px 10px 12px',
                    border: '1px solid #E5E7EB', borderRadius: 10,
                    fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#0F0F0F',
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#9CA3AF'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#9CA3AF',
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
              <button onClick={() => { setConnectModal(null); setApiKey(''); }} style={{ padding: '10px 22px', background: '#F3F4F6', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#0F0F0F' }}>Annulla</button>
              <button onClick={handleConnectIntegration} disabled={!apiKey.trim()} style={{ padding: '10px 22px', background: apiKey.trim() ? '#0F0F0F' : '#D1D5DB', border: 'none', borderRadius: 8, cursor: apiKey.trim() ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#fff' }}>Salva e connetti</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
