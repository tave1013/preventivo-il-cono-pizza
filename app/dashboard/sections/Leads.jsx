'use client';

import { useState, useEffect, useReducer } from 'react';
import { useToast } from '../context/useToast';
import { Modal } from '../components/Modal';

const INITIAL_LEADS = [
  { id: 1, nome: 'Marco', cognome: 'Rossi', email: 'marco@example.com', whatsapp: '+39 123 456 7890', piano: 'Plus', stato: 'Contattato', fonte: 'Landing page', coupon: 'PROMO20', data_iscrizione: '2025-05-20' },
  { id: 2, nome: 'Giulia', cognome: 'Ferrara', email: 'giulia@example.com', whatsapp: '+39 321 654 9870', piano: 'Starter', stato: 'Nuovo', fonte: 'Social', coupon: '', data_iscrizione: '2025-05-22' },
  { id: 3, nome: 'Luca', cognome: 'Moretti', email: 'luca@example.com', whatsapp: '+39 555 123 4567', piano: 'Top', stato: 'Convertito', fonte: 'Ads', coupon: 'PIZZA10', data_iscrizione: '2025-05-18' },
  { id: 4, nome: 'Sofia', cognome: 'Conti', email: 'sofia@example.com', whatsapp: '+39 777 999 1111', piano: 'Nessuno', stato: 'Dormiente', fonte: 'Passaparola', coupon: '', data_iscrizione: '2025-05-15' },
  { id: 5, nome: 'Andrea', cognome: 'Bruno', email: 'andrea@example.com', whatsapp: '+39 888 777 6666', piano: 'Plus', stato: 'Nuovo', fonte: 'Landing page', coupon: '', data_iscrizione: '2025-05-21' },
];

function leadsReducer(state, action) {
  switch (action.type) {
    case 'ADD_LEAD':
      return [{ ...action.payload, id: Date.now() }, ...state];
    case 'UPDATE_LEAD':
      return state.map(l => l.id === action.payload.id ? action.payload : l);
    case 'DELETE_LEAD':
      return state.filter(l => l.id !== action.payload);
    default:
      return state;
  }
}

function LeadForm({ onClose, onSave, editingLead, customFields }) {
  const [form, setForm] = useState(editingLead || {
    nome: '', cognome: '', email: '', whatsapp: '', data_nascita: '',
    piano: 'Nessuno', stato: 'Nuovo', fonte: 'Landing page', coupon: '', note: '',
  });
  const [newFields, setNewFields] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleCustomChange = (fieldName, value) => {
    setForm(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleAddCustomField = () => {
    setNewFields(prev => [...prev, { name: '', type: 'Testo' }]);
  };

  const handleDeleteCustomField = (index) => {
    setNewFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!form.nome || !form.cognome || !form.email || !form.whatsapp) {
      alert('Compila i campi obbligatori');
      return;
    }

    const fullForm = { ...form };
    newFields.forEach(f => {
      if (f.name) fullForm[f.name] = '';
    });

    if (newFields.length > 0) {
      const stored = JSON.parse(localStorage.getItem('dashboard_custom_fields') || '[]');
      newFields.forEach(f => {
        if (f.name && !stored.find(s => s.name === f.name)) {
          stored.push(f);
        }
      });
      localStorage.setItem('dashboard_custom_fields', JSON.stringify(stored));
    }

    onSave(fullForm);
  };

  return (
    <>
      {/* Informazioni base */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.08em' }}>Informazioni base</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Nome *</label>
            <input value={form.nome} onChange={(e) => setForm(p => ({ ...p, nome: e.target.value }))} placeholder="Nome" style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 16, outline: 'none', minHeight: 44 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Cognome *</label>
            <input value={form.cognome} onChange={(e) => setForm(p => ({ ...p, cognome: e.target.value }))} placeholder="Cognome" style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 16, outline: 'none', minHeight: 44 }} />
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Email *</label>
          <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 16, outline: 'none', minHeight: 44 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Numero WhatsApp *</label>
          <input type="tel" value={form.whatsapp} onChange={(e) => setForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="+39 123 456 7890" style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 16, outline: 'none', minHeight: 44 }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Data di nascita</label>
          <input type="date" value={form.data_nascita} onChange={(e) => setForm(p => ({ ...p, data_nascita: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 16, outline: 'none', minHeight: 44 }} />
        </div>
      </div>

      {/* Dettagli */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.08em' }}>Dettagli</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Piano</label>
            <select value={form.piano} onChange={(e) => handleChange('piano', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }}>
              <option>Nessuno</option>
              <option>Starter</option>
              <option>Plus</option>
              <option>Top</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Stato</label>
            <select value={form.stato} onChange={(e) => handleChange('stato', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }}>
              <option>Nuovo</option>
              <option>Contattato</option>
              <option>Convertito</option>
              <option>Dormiente</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Fonte</label>
          <select value={form.fonte} onChange={(e) => handleChange('fonte', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }}>
            <option>Landing page</option>
            <option>Social</option>
            <option>Passaparola</option>
            <option>Ads</option>
            <option>Altro</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Coupon (opzionale)</label>
          <input value={form.coupon} onChange={(e) => handleChange('coupon', e.target.value)} placeholder="Es: PROMO20" style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }} />
        </div>
      </div>

      {/* Campi personalizzati */}
      {(customFields.length > 0 || newFields.length > 0) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.08em' }}>Campi personalizzati</h3>
          {customFields.map(f => (
            <div key={f.name} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{f.name}</label>
              <input value={form[f.name] || ''} onChange={(e) => handleCustomChange(f.name, e.target.value)} placeholder={`Inserisci ${f.name.toLowerCase()}`} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          {newFields.map((f, i) => (
            <div key={i} style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Nome campo</label>
                <input value={f.name} onChange={(e) => {
                  const updated = [...newFields];
                  updated[i].name = e.target.value;
                  setNewFields(updated);
                }} placeholder="Es: Allergie" style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }} />
              </div>
              <div style={{ width: 120 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Tipo</label>
                <select value={f.type} onChange={(e) => {
                  const updated = [...newFields];
                  updated[i].type = e.target.value;
                  setNewFields(updated);
                }} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }}>
                  <option>Testo</option>
                  <option>Numero</option>
                  <option>Data</option>
                  <option>Sì/No</option>
                </select>
              </div>
              <button onClick={() => handleDeleteCustomField(i)} style={{ width: 36, height: 36, background: '#FEE2E2', border: 'none', borderRadius: 8, color: '#EF4444', cursor: 'pointer', fontSize: 16 }}>🗑</button>
            </div>
          ))}
          <button onClick={handleAddCustomField} style={{ padding: '8px 12px', background: 'transparent', border: '1px dashed #E5E7EB', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>+ Aggiungi campo personalizzato</button>
        </div>
      )}

      {/* Note */}
      <div style={{ marginBottom: 0 }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.08em' }}>Note</h3>
        <textarea value={form.note} onChange={(e) => handleChange('note', e.target.value)} placeholder="Note interne (non visibili al cliente)" style={{ width: '100%', minHeight: 80, padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none', resize: 'vertical' }} />
      </div>

      {/* Footer */}
      <div style={{ marginTop: 32, display: 'flex', gap: 10, justifyContent: 'flex-end', borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
        <button onClick={onClose} style={{ padding: '10px 22px', background: '#F3F4F6', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#0F0F0F' }}>Annulla</button>
        <button onClick={handleSubmit} style={{ padding: '10px 22px', background: '#0F0F0F', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#fff' }}>{editingLead ? 'Salva modifiche' : 'Salva Lead'}</button>
      </div>
    </>
  );
}

export default function Leads() {
  const { addToast } = useToast();
  const [leads, dispatch] = useReducer(leadsReducer, INITIAL_LEADS);
  const [filter, setFilter] = useState('Tutte');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [customFields, setCustomFields] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Carica campi personalizzati
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dashboard_custom_fields') || '[]');
    setCustomFields(stored);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filtered = leads.filter(l => {
    const stateMatch = filter === 'Tutte' || l.stato === filter;
    const searchMatch = !search || 
      l.nome.toLowerCase().includes(search.toLowerCase()) ||
      l.cognome.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.whatsapp.includes(search);
    return stateMatch && searchMatch;
  });

  const stateCounts = {
    Tutte: leads.length,
    Nuovo: leads.filter(l => l.stato === 'Nuovo').length,
    Contattato: leads.filter(l => l.stato === 'Contattato').length,
    Convertito: leads.filter(l => l.stato === 'Convertito').length,
    Dormiente: leads.filter(l => l.stato === 'Dormiente').length,
  };

  const handleAddOrEdit = (formData) => {
    if (editingLead) {
      dispatch({ type: 'UPDATE_LEAD', payload: { ...editingLead, ...formData } });
      addToast({ type: 'success', message: 'Lead modificato ✓' });
    } else {
      dispatch({ type: 'ADD_LEAD', payload: formData });
      addToast({ type: 'success', message: 'Lead aggiunto ✓' });
    }
    setModalOpen(false);
    setEditingLead(null);
  };

  const handleDelete = (lead) => {
    dispatch({ type: 'DELETE_LEAD', payload: lead.id });
    addToast({ type: 'success', message: `${lead.nome} ${lead.cognome} eliminato ✓` });
    setDeleteConfirm(null);
  };

  const handleExportCSV = () => {
    const headers = ['Nome', 'Cognome', 'Email', 'WhatsApp', 'Piano', 'Stato', 'Fonte', 'Coupon', 'Data Iscrizione'];
    const rows = filtered.map(l => [l.nome, l.cognome, l.email, l.whatsapp, l.piano, l.stato, l.fonte, l.coupon, l.data_iscrizione]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', message: `${filtered.length} lead esportati ✓` });
  };

  return (
    <div className="dash-fade">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#0F0F0F', marginBottom: 4 }}>Lead & Contatti</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>Gestisci e monitora tutti i tuoi contatti</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'minmax(200px, 1fr) auto auto', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isMobile ? "Cerca..." : "Cerca per nome, email, WhatsApp..."} style={{ gridColumn: isMobile ? '1 / -1' : 'auto', padding: '9px 14px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none', minHeight: 44 }} />
        <button onClick={() => { setEditingLead(null); setModalOpen(true); }} style={{ padding: '9px 18px', background: '#0F0F0F', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}>+ Aggiungi</button>
        <button onClick={handleExportCSV} style={{ padding: '9px 18px', background: '#F3F4F6', color: '#0F0F0F', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, cursor: 'pointer', minHeight: 44 }}>📥 CSV</button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {['Tutte', 'Nuovo', 'Contattato', 'Convertito', 'Dormiente'].map(state => (
          <button key={state} onClick={() => setFilter(state)} style={{
            padding: '8px 14px', borderRadius: 8, border: '1px solid #E5E7EB',
            background: filter === state ? '#0F0F0F' : '#fff',
            color: filter === state ? '#fff' : '#0F0F0F',
            fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: filter === state ? 600 : 400,
            cursor: 'pointer', transition: 'all 0.15s',
            whiteSpace: 'nowrap', flexShrink: 0,
            minHeight: 44,
          }}>
            {state} <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700, background: filter === state ? 'rgba(255,255,255,0.2)' : '#F3F4F6', padding: '0 6px', borderRadius: 10, color: filter === state ? '#fff' : '#6B7280' }}>({stateCounts[state]})</span>
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      {!isMobile && (
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F8F8F8', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>Nome</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>Email</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>WhatsApp</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>Piano</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280' }}>Stato</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#6B7280' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#F8F8F8' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 500, color: '#0F0F0F' }}>{lead.nome} {lead.cognome}</td>
                  <td style={{ padding: '14px 16px', color: '#6B7280' }}>{lead.email}</td>
                  <td style={{ padding: '14px 16px', color: '#6B7280' }}>{lead.whatsapp}</td>
                  <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 16, background: lead.piano === 'Top' ? '#E4D9FF' : lead.piano === 'Plus' ? '#C3F0D5' : lead.piano === 'Starter' ? '#C7D9FF' : '#F3F4F6', color: lead.piano === 'Top' ? '#5B21B6' : lead.piano === 'Plus' ? '#15803D' : lead.piano === 'Starter' ? '#1D4ED8' : '#6B7280' }}>{lead.piano}</span></td>
                  <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 16, background: lead.stato === 'Convertito' ? '#C3F0D5' : lead.stato === 'Nuovo' ? '#FFF0C2' : lead.stato === 'Contattato' ? '#C7D9FF' : '#F3F4F6', color: lead.stato === 'Convertito' ? '#15803D' : lead.stato === 'Nuovo' ? '#92400E' : lead.stato === 'Contattato' ? '#1D4ED8' : '#6B7280' }}>{lead.stato}</span></td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', display: 'flex', gap: 6, justifyContent: 'center' }}>
                    <button onClick={() => { setEditingLead(lead); setModalOpen(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, opacity: 0.7, minWidth: 44, minHeight: 44 }}>✏️</button>
                    <button onClick={() => setDeleteConfirm(lead)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, opacity: 0.7, minWidth: 44, minHeight: 44 }}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '48px 32px', textAlign: 'center', color: '#9CA3AF' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500 }}>Nessun lead trovato</div>
          </div>
        )}
      </div>
      )}

      {/* Mobile Card List */}
      {isMobile && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((lead) => (
          <div
            key={lead.id}
            style={{
              background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14,
              padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            {/* Header: Avatar + Name + Badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: lead.piano === 'Top' ? '#E4D9FF' : lead.piano === 'Plus' ? '#C3F0D5' : lead.piano === 'Starter' ? '#C7D9FF' : '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 13,
                color: lead.piano === 'Top' ? '#5B21B6' : lead.piano === 'Plus' ? '#15803D' : lead.piano === 'Starter' ? '#1D4ED8' : '#6B7280',
                flexShrink: 0,
              }}>
                {lead.nome[0]}{lead.cognome[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#0F0F0F' }}>
                  {lead.nome} {lead.cognome}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
                  {lead.email}
                </div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 12,
                background: lead.stato === 'Convertito' ? '#C3F0D5' : lead.stato === 'Nuovo' ? '#FFF0C2' : lead.stato === 'Contattato' ? '#C7D9FF' : '#F3F4F6',
                color: lead.stato === 'Convertito' ? '#15803D' : lead.stato === 'Nuovo' ? '#92400E' : lead.stato === 'Contattato' ? '#1D4ED8' : '#6B7280',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {lead.stato}
              </span>
            </div>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>
              <div>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Inter, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                  📱 Telefono
                </div>
                <div style={{ fontSize: 12.5, color: '#0F0F0F', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {lead.whatsapp}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Inter, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                  📌 Piano
                </div>
                <div style={{ fontSize: 12.5, color: '#0F0F0F', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {lead.piano}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { setEditingLead(lead); setModalOpen(true); }}
                style={{
                  flex: 1, padding: 10, background: '#0F0F0F', border: 'none',
                  borderRadius: 8, color: '#fff', fontFamily: 'Inter, sans-serif',
                  fontSize: 12.5, fontWeight: 600, cursor: 'pointer', minHeight: 44,
                }}
              >
                ✏️ Modifica
              </button>
              <button
                onClick={() => setDeleteConfirm(lead)}
                style={{
                  flex: 1, padding: 10, background: '#FEE2E2', border: 'none',
                  borderRadius: 8, color: '#DC2626', fontFamily: 'Inter, sans-serif',
                  fontSize: 12.5, fontWeight: 600, cursor: 'pointer', minHeight: 44,
                }}
              >
                🗑️ Elimina
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '48px 32px', textAlign: 'center', color: '#9CA3AF' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500 }}>Nessun lead trovato</div>
          </div>
        )}
      </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingLead(null); }}
        title={editingLead ? 'Modifica Lead' : 'Nuovo Lead'}
        subtitle={editingLead ? 'Aggiorna i dati del contatto' : 'Aggiungi un nuovo contatto alla lista'}
        size="md"
      >
        <LeadForm onClose={() => { setModalOpen(false); setEditingLead(null); }} onSave={handleAddOrEdit} editingLead={editingLead} customFields={customFields} />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Elimina contatto" size="sm">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#F59E0B', marginBottom: 12 }}>⚠️</div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#374151', lineHeight: 1.6, marginBottom: 24 }}>
            Sei sicuro di voler eliminare <strong>{deleteConfirm?.nome} {deleteConfirm?.cognome}</strong> (<strong>{deleteConfirm?.email}</strong>)? Questa azione non può essere annullata.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 22px', background: '#F3F4F6', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#0F0F0F' }}>Annulla</button>
            <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '10px 22px', background: '#EF4444', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#fff' }}>Sì, elimina</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
