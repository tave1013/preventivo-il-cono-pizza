'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WhatsAppPage() {
  const router = useRouter();

  const activateWhatsApp = () => {
    localStorage.setItem('wa_connected', 'true');
    router.push('/dashboard/whatsapp/broadcast');
  };

  useEffect(() => {
    const waConnected = localStorage.getItem('wa_connected') === 'true';
    if (waConnected) {
      router.push('/dashboard/whatsapp/broadcast');
    }
  }, [router]);

  return (
    <div style={{ padding: 28, background: '#FFFFFF', minHeight: '100vh' }}>
      <div style={{
        background: 'linear-gradient(135deg, #075E54, #128C7E)', borderRadius: 20,
        padding: 40, color: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
      }}>
        <div>
          <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 30, background: 'rgba(255,255,255,0.15)', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            🟢 Disponibile ora · da €15/mese
          </span>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 42, lineHeight: 1.1, marginBottom: 12 }}>
            Raggiungi i tuoi clienti dove sono già.
          </h1>
          <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: 20 }}>
            Messaggi automatici, promozioni e fidelizzazione direttamente su WhatsApp — il canale con il 98% di tasso di apertura.
          </p>
          <button onClick={activateWhatsApp} style={{ background: '#fff', color: '#075E54', border: 'none', borderRadius: 12, padding: '14px 26px', fontWeight: 700, cursor: 'pointer' }}>
            Attiva WhatsApp ora →
          </button>
        </div>
        <div style={{ background: '#ECE5DD', borderRadius: 16, padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: '12px 12px 12px 0', padding: 12, marginBottom: 10, animation: 'fadeSlideIn 0.4s ease both' }}>🍕 Ciao Marco! Il tuo cono gratis è pronto. Codice: CONO-XK9F</div>
          <div style={{ background: '#DCF8C6', borderRadius: '12px 12px 0 12px', padding: 12, marginBottom: 10, marginLeft: 'auto', width: 'fit-content', animation: 'fadeSlideIn 0.8s ease both' }}>Perfetto grazie! Vengo stasera 😊</div>
          <div style={{ background: '#fff', borderRadius: '12px 12px 12px 0', padding: 12, animation: 'fadeSlideIn 1.2s ease both' }}>🎂 Buon compleanno! Oggi il cono è offerto da noi.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 20, marginBottom: 20 }}>
        {[
          ['98%', 'Tasso di apertura', 'vs 22% delle email', '📬'],
          ['3x', 'Più conversioni', 'rispetto agli SMS', '📈'],
          ['< 3min', 'Tempo di lettura', 'dal momento dell’invio', '⚡'],
          ['2 mld+', 'Utenti attivi', 'nel mondo ogni giorno', '🌍'],
        ].map(([n, l, s, i]) => (
          <div key={l} style={{ border: '1px solid #BBF7D0', borderRadius: 14, padding: 16, textAlign: 'center' }}>
            <div>{i}</div>
            <div style={{ color: '#25D366', fontWeight: 700, fontSize: 28 }}>{n}</div>
            <div style={{ fontWeight: 600 }}>{l}</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#075E54', borderRadius: 20, padding: 32, color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 30, marginBottom: 8 }}>Un prezzo onesto.</h2>
        <p style={{ opacity: 0.9, marginBottom: 18 }}>Niente sorprese.</p>
        <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', color: '#0F0F0F', borderRadius: 14, padding: 22 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#6B7280' }}>da</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 62, color: '#075E54', lineHeight: 1 }}>€15</div>
          <div style={{ color: '#6B7280', marginBottom: 12 }}>/mese</div>
          <button onClick={activateWhatsApp} style={{ width: '100%', padding: 14, border: 'none', borderRadius: 12, background: '#25D366', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            Attiva ora per €15/mese →
          </button>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>🔒 Disdici quando vuoi · Niente contratti</div>
        </div>
      </div>
    </div>
  );
}
