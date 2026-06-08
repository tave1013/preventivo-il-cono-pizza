'use client';

import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "La base professionale da cui tutto parte",
    color: "#4A7C59",
    bg: "#F0F7F2",
    border: "#C2DDC9",
    once: "590",
    monthly: "89",
    highlight: false,
    badge: null,
    disclaimer: "Il canone mensile copre manutenzione tecnica e operatività del sistema. Qualsiasi modifica a contenuti, copy, automazioni o landing page è extra e viene preventivata separatamente.",
    summary: "Costruiamo la tua identità digitale da zero: dominio, email professionale, pagina di acquisizione contatti e primo sistema automatico di benvenuto. Il cliente ti trova, ti scrive, riceve la promozione. Tutto senza che tu faccia nulla a mano.",
    once_includes: [
      { label: "Registrazione e configurazione dominio", sub: "Scegliamo insieme il dominio migliore, gestiamo acquisto e configurazioni tecniche, colleghiamo tutto correttamente e ti consegniamo una base digitale pronta in tempi rapidi.", icon: "🌐" },
      { label: "Email professionale aziendale", sub: "Impostiamo caselle professionali (es. info@, ordini@), firma coerente con il brand e protezioni anti-spam, così comunichi in modo serio e affidabile fin dal primo contatto.", icon: "📧" },
      { label: "Configurazione hosting e ambiente di produzione", sub: "Mettiamo online il progetto su infrastruttura stabile e veloce, con HTTPS e monitoraggio: il tuo sito resta accessibile e performante quando i clienti ti cercano.", icon: "🖥️" },
      { label: "Squeeze page di acquisizione contatti", sub: "Costruiamo una pagina pensata per convertire: messaggio chiaro, struttura persuasiva, form semplice e CTA forte, ottimizzata anche per chi naviga da mobile.", icon: "📄" },
      { label: "Email automatica di benvenuto con coupon", sub: "Scriviamo e configuriamo una risposta automatica immediata con coupon: il cliente riceve valore subito e tu aumenti le probabilità di prima visita o riacquisto.", icon: "🎁" },
      { label: "Configurazione piattaforma di email marketing", sub: "Prepariamo account, liste, form, autenticazioni e test di invio: dietro le quinte facciamo il lavoro tecnico necessario per garantire consegna e tracciamento corretti.", icon: "⚙️" },
      { label: "SEO base on-page", sub: "Ottimizziamo struttura e contenuti essenziali della pagina per farti trovare meglio: title, meta, gerarchia testi, performance e collegamenti agli strumenti di analisi.", icon: "🔍" },
      { label: "Ottimizzazione scheda attività locale", sub: "Sistemiamo la tua presenza locale con dati completi e coerenti (orari, descrizione, categorie, foto, menù e primo aggiornamento), per aumentare fiducia e richieste reali.", icon: "📍" },
    ],
    monthly_includes: [
      { label: "Gestione infrastruttura tecnica", sub: "Rinnovo dominio e hosting, aggiornamenti di sicurezza, monitoraggio uptime h24 e backup periodico della pagina.", icon: "🔄" },
      { label: "Piattaforma di email marketing attiva", sub: "Canone della piattaforma incluso nel piano, fino a 500 contatti attivi e automazione di benvenuto sempre operativa.", icon: "📊" },
      { label: "Assistenza e manutenzione base", sub: "Supporto tecnico via email entro 24 ore lavorative e piccole modifiche ai testi della pagina quando necessario.", icon: "🛠️" },
    ],
    not_included: ["Sequenza email di nurturing (4-5 email automatiche)", "Pannello CRM con dati e statistiche avanzate", "Gestione campagne pubblicitarie a pagamento", "Automazione conversazionale sui canali social", "Newsletter mensile"],
    tools: ["Email Marketing Pro", "Landing Page Builder", "SEO Monitor", "Cloud Hosting"],
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "Il sistema che lavora per te ogni giorno",
    color: "#D85A30",
    bg: "#FDF1EC",
    border: "#F5C4B3",
    once: "890",
    monthly: "249",
    highlight: true,
    badge: "Consigliato",
    disclaimer: "Il canone mensile include manutenzione, 1 newsletter mensile, gestione presenza locale e report KPI. Sono incluse fino a 2 piccole modifiche al mese ai testi esistenti. Modifiche strutturali, nuove landing page o nuove automazioni sono extra.",
    summary: "Un funnel completo di acquisizione e fidelizzazione: dalla pagina di atterraggio alla sequenza email automatica, fino al pannello dove tieni sotto controllo i tuoi contatti. Includiamo anche la gestione della tua presenza sui canali dove i clienti ti cercano già. Zero pensieri operativi.",
    once_includes: [
      { label: "Tutto il piano Starter", sub: "Dominio, email professionale, hosting, pagina di acquisizione, automazione di benvenuto, SEO base e scheda attività locale già inclusi.", icon: "✅" },
      { label: "Squeeze page avanzata con ottimizzazione conversione", sub: "Versione potenziata con sezione testimonianze, ottimizzazione mobile avanzata, test A/B e tracciamento completo di visite e iscrizioni.", icon: "📄" },
      { label: "Sequenza di 5 email automatiche di nurturing", sub: "Scriviamo e configuriamo 5 email automatiche nei 14 giorni successivi all'iscrizione: coupon, storia del brand, prova sociale, urgenza e invito al ritorno.", icon: "📧" },
      { label: "Automazioni CRM avanzate", sub: "Configuriamo riattivazione a 30 giorni, email di compleanno, segmentazione dei contatti in gruppi chiari e notifiche interne per i lead più interessanti.", icon: "🤖" },
      { label: "Pannello CRM su misura", sub: "Dashboard personalizzata accessibile da browser per consultare contatti, aperture email, coupon utilizzati e segmenti attivi in modo semplice.", icon: "📊" },
      { label: "SEO avanzato + ottimizzazione per ricerche intelligenti", sub: "Struttura semantica, dati locali, ottimizzazione per risultati evoluti di ricerca e rafforzamento della presenza nei risultati informativi.", icon: "🔍" },
      { label: "Gestione presenza locale e portali di ordinazione", sub: "Ottimizziamo la tua presenza sui principali siti dove i clienti ti cercano già (max 3 piattaforme da concordare insieme, es. Google My Business, Tripadvisor, Deliveroo): foto, descrizione, menù, offerte e linee guida per rispondere alle recensioni.", icon: "📍" },
      { label: "Copywriting completo", sub: "Scriviamo tutti i testi del progetto: pagina, sequenza email, oggetti, call to action, descrizioni profilo e messaggi promozionali.", icon: "✍️" },
    ],
    monthly_includes: [
      { label: "Tutto il piano Starter", sub: "Hosting, dominio, manutenzione tecnica e piattaforma email sempre attiva sono già compresi nel canone mensile.", icon: "✅" },
      { label: "Piattaforma email marketing avanzata", sub: "Fino a 1.000 contatti attivi, automazioni multiple operative e reportistica dettagliata per leggere cosa sta funzionando.", icon: "📊" },
      { label: "1 newsletter mensile inclusa", sub: "Ogni mese scriviamo, impaginiamo e inviamo una newsletter con promozioni, novità e contenuti utili per far tornare i clienti.", icon: "📰" },
      { label: "Report KPI mensile", sub: "Condivisione dei numeri che contano: nuovi iscritti, aperture, coupon utilizzati, andamento lista e risultati della presenza locale.", icon: "📈" },
      { label: "Ottimizzazione continua", sub: "Ogni mese miglioriamo almeno una leva tra oggetto email, headline, call to action o struttura pagina sulla base dei dati reali.", icon: "🎯" },
    ],
    not_included: ["Gestione campagne pubblicitarie a pagamento", "Automazione conversazionale sui canali social", "Gestione mensile completa dei canali esterni"],
    tools: ["Email Marketing Pro", "CRM Dashboard", "SEO & Analytics Suite", "Automation Engine", "Cloud Hosting"],
  },
  {
    id: "top",
    name: "Premium",
    tagline: "Presenza digitale completa, zero pensieri",
    color: "#2A4E8C",
    bg: "#EBF1FB",
    border: "#B5D4F4",
    once: "1.800",
    monthly: "490",
    highlight: false,
    badge: "Full service",
    disclaimer: "Il canone mensile include tutti i servizi del piano. Sono incluse fino a 4 modifiche mensili a contenuti e copy esistenti. Nuove landing page, nuove sequenze email complete o nuovi funnel sono extra e vengono preventivati separatamente.",
    summary: "Il pacchetto per chi vuole affidare tutto a noi: gestiamo le campagne pubblicitarie, attiviamo l'automazione sui social per acquisire lead in modo passivo e curiamo ogni canale online con continuità. Tu ti occupi della pizza, noi del resto.",
    once_includes: [
      { label: "Tutto il piano Plus", sub: "Infrastruttura, funnel email completo, CRM, ottimizzazione della ricerca, presenza locale e copywriting sono già inclusi.", icon: "✅" },
      { label: "Sito web statico completo con tutte le informazioni del locale", sub: "Creiamo un sito web professionale e ottimizzato con tutte le informazioni importanti: chi siete, la storia del locale, il menù, foto di qualità, orari, indirizzo, telefono e mappa interattiva. Il sito è ottimizzato per dispositivi mobile e per la ricerca locale, così i clienti ti trovano quando cercano una pizzeria nella tua zona.", icon: "🌐" },
      { label: "SEO locale e ottimizzazione per attività locali", sub: "Strutturiamo il sito e i contenuti per apparire nei risultati di ricerca locali: ottimizziamo scheda Google My Business, schema markup per ristoranti, keyword locali e link building. Il risultato è maggiore visibilità quando i clienti cercano 'pizzeria a Busto Arsizio' o simili.", icon: "📍" },
      { label: "Modulo di contatto, chat e richieste di prenotazione", sub: "Integriamo nel sito un modulo di contatto intelligente, chat widget per rispondere in tempo reale e sistema di prenotazione online. I clienti possono contattarti, fare domande e prenotare il tavolo direttamente dal sito, senza passare da altre piattaforme.", icon: "💬" },
      { label: "Automazione conversazionale sui social", sub: "Configuriamo e testiamo automazioni basate su parole chiave: chi commenta o interagisce riceve in automatico un messaggio privato con l'offerta e viene registrato come contatto. Collaboriamo con la tua social media manager per ottimizzare i flussi, abbassare il costo di acquisizione e sfruttare al massimo ogni canale social, migliorando continuamente il sistema nel tempo.", icon: "🤖" },
      { label: "Integrazione social → sistema email marketing", sub: "I contatti acquisiti dai canali social entrano automaticamente nella lista, vengono segmentati e ricevono il percorso di nurturing senza lavoro manuale.", icon: "🔗" },
      { label: "Setup campagne pubblicitarie a pagamento", sub: "Creiamo e lanciamo le prime campagne (notorietà, acquisizione contatti, retargeting) con tracciamento completo e pubblici personalizzati. Definiamo insieme alla tua social media manager la strategia pubblicitaria, per ottimizzare ogni euro del budget e ottenere il massimo ritorno possibile. Budget escluso e gestito direttamente dal cliente.", icon: "📱" },
      { label: "Creazione materiale creativo per le campagne", sub: "Prepariamo testi promozionali, angoli di comunicazione e brief creativo per i visual delle prime campagne incluse nel setup.", icon: "🎨" },
      { label: "Gestione strategica presenza locale", sub: "Aggiorniamo offerte, recensioni, menù e contenuti informativi sui principali canali esterni con un'impostazione strategica pronta da mantenere ogni mese.", icon: "📍" },
    ],
    monthly_includes: [
      { label: "Tutto il piano Plus", sub: "Hosting, piattaforma email, CRM, newsletter mensile, report KPI e miglioramento continuo restano tutti attivi.", icon: "✅" },
      { label: "Gestione campagne pubblicitarie a pagamento", sub: "Monitoraggio settimanale, ottimizzazione del budget, aggiornamento creatività, test sugli annunci e report mensile delle performance. Budget escluso.", icon: "📱" },
      { label: "Gestione presenza locale mensile", sub: "Aggiornamento costante di offerte, orari, contenuti e risposte alle recensioni sui canali dove i clienti cercano il locale, come Google My Business, Tripadvisor e Deliveroo.", icon: "📍" },
      { label: "Gestione automazione conversazionale", sub: "Aggiornamento delle parole chiave trigger, creazione di nuovi flussi automatici e report dei contatti acquisiti dai social.", icon: "🤖" },
      { label: "2 newsletter mensili incluse", sub: "Copywriting, progettazione e invio di due newsletter al mese con promozioni, novità e contenuti che aumentano il ritorno dei clienti.", icon: "📰" },
      { label: "Presidio completo piattaforme esterne", sub: "Aggiornamento mensile di profili, portali di ordinazione e directory locali come Google My Business, Tripadvisor e Deliveroo, con offerte, menù, foto e gestione recensioni.", icon: "🌐" },
      { label: "Piattaforma email marketing professionale", sub: "Fino a 2.500 contatti attivi, automazioni estese, segmentazione comportamentale e reportistica avanzata inclusa nel canone.", icon: "📊" },
      { label: "Email mensile personalizzata", sub: "Ogni mese scriviamo e inviamo un'email personalizzata su misura: può essere una promozione stagionale, un'esperienza cliente, una novità sul menù, un contenuto utile per il tuo target. Lavoriamo con te per capire cosa vuoi comunicare e creiamo il messaggio giusto che spinge i clienti ad agire.", icon: "✉️" },
    ],
    not_included: ["Budget campagne pubblicitarie (gestito e versato direttamente dal cliente)"],
    tools: ["Email Marketing Pro", "CRM Dashboard", "Social Automation Engine", "Ads Manager", "Analytics Suite", "Cloud Hosting", "Reporting Hub"],
  },
];

const costBreakdownData = {
  starter: [
    { item: "Piattaforma di email marketing", cost: "~€24/mese" },
    { item: "Dominio + infrastruttura cloud", cost: "~€10/mese" },
    { item: "Monitoraggio, backup e manutenzione", cost: "~€10/mese" },
    { item: "Gestione operativa e assistenza", cost: "~€15/mese" },
  ],
  plus: [
    { item: "Piattaforma email marketing avanzata", cost: "~€34/mese" },
    { item: "Dominio + infrastruttura cloud", cost: "~€10/mese" },
    { item: "Newsletter mensile e invio", cost: "~€20/mese" },
    { item: "Report KPI e ottimizzazioni", cost: "~€20/mese" },
    { item: "Manutenzione tecnica continuativa", cost: "~€15/mese" },
  ],
  top: [
    { item: "Piattaforma email marketing professionale", cost: "~€49/mese" },
    { item: "Sistema di automazione social", cost: "~€20/mese" },
    { item: "Lavoro di gestione campagne", cost: "~€95/mese" },
    { item: "Gestione presenza locale e canali esterni", cost: "~€45/mese" },
    { item: "2 newsletter mensili e report", cost: "~€40/mese" },
    { item: "Infrastruttura, manutenzione e supporto", cost: "~€50/mese" },
  ],
};

const serviceProfiles = {
  starter: {
    icon: "🚀",
    badge: "Avvio autonomo",
    headline: "Ti costruiamo la base, poi sei autonomo. Ma non sei mai solo.",
    body: "Questo piano è pensato per chi vuole avere il suo sistema online funzionante senza doversi occupare delle parti tecniche. Ci occupiamo noi di tutto il setup: dalla registrazione del dominio alla pagina pronta, fino all'email automatica. Tu ricevi le credenziali, una guida chiara su come gestire i contenuti e il nostro supporto nei primi passi. Il tuo focus rimane sul locale, noi facciamo partire il motore.",
  },
  plus: {
    icon: "🎯",
    badge: "Presenza gestita",
    headline: "Noi gestiamo tutto. Tu pensi al locale.",
    body: "Questo piano è per chi vuole una presenza digitale curata in modo continuo, senza dover pensare a nulla. Ogni mese aggiorniamo i tuoi profili online, rispondiamo alle recensioni, teniamo in ordine orari e chiusure, gestiamo Deliveroo e le altre piattaforme, aggiungiamo o rimuoviamo voci quando serve. Foto nuove, offerte stagionali, novità sul menù: pensiamo noi a comunicarle nel modo giusto. Il risultato è una presenza professionale e sempre aggiornata, che lavora per te anche quando sei in cucina.",
  },
  top: {
    icon: "🎯",
    badge: "Presenza gestita",
    headline: "Noi gestiamo tutto. Tu pensi al locale.",
    body: "Questo piano è per chi vuole una presenza digitale curata in modo continuo, senza dover pensare a nulla. Ogni mese aggiorniamo i tuoi profili online, rispondiamo alle recensioni, teniamo in ordine orari e chiusure, gestiamo Deliveroo e le altre piattaforme, aggiungiamo o rimuoviamo voci quando serve. Foto nuove, offerte stagionali, novità sul menù: pensiamo noi a comunicarle nel modo giusto. Il risultato è una presenza professionale e sempre aggiornata, che lavora per te anche quando sei in cucina.",
  },
};

const supportPackages = {
  starter: {
    title: "Modalità di lavoro & assistenza inclusa",
    badge: "Supporto base incluso",
    points: [
      "Affiancamento operativo in avvio: non vieni lasciato solo durante il setup.",
      "Supporto WhatsApp in orario lavorativo per dubbi pratici e richieste veloci.",
      "Indicazioni chiare, passo-passo, per aiutarti a usare subito il sistema.",
    ],
  },
  plus: {
    title: "Modalità di lavoro & assistenza inclusa",
    badge: "Supporto prioritario incluso",
    points: [
      "Assistenza WhatsApp prioritaria con tempi di risposta più rapidi.",
      "Supporto strategico e operativo continuo per decisioni e ottimizzazioni.",
      "Presenza costante del team: ti seguiamo in modo proattivo, non reattivo.",
    ],
  },
  top: {
    title: "Modalità di lavoro & assistenza inclusa",
    badge: "Supporto prioritario incluso",
    points: [
      "Assistenza WhatsApp prioritaria con tempi di risposta più rapidi.",
      "Supporto strategico e operativo continuo per decisioni e ottimizzazioni.",
      "Presenza costante del team: ti seguiamo in modo proattivo, non reattivo.",
    ],
  },
};

export default function Preventivo() {
  const [active, setActive] = useState("plus");
  const [showCosts, setShowCosts] = useState(false);
  const [tab, setTab] = useState("once");
  const [showContactModal, setShowContactModal] = useState(false);

  const plan = plans.find((p) => p.id === active);
  const costs = costBreakdownData[active] || [];
  const support = supportPackages[active] || supportPackages.starter;
  const serviceProfile = serviceProfiles[active] || serviceProfiles.starter;
  const whatsappUrl = `https://wa.me/393914272540?text=${encodeURIComponent("Ciao Eric, ho qualche dubbio sul preventivo e vorrei un confronto rapido.")}`;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#FAFAF8", minHeight: "100vh", padding: "0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'DM Serif Display', serif; }
        .check-item { display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .check-item:last-child { border-bottom: none; }
        .plan-btn { border: none; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
        .plan-btn:hover { transform: translateY(-1px); }
        .tab-btn { border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s; }
        .not-inc { display: flex; gap: 8px; align-items: center; padding: 7px 0; font-size: 12px; color: #999; }
        .note-box { background: #fff; border-radius: 10px; padding: 14px 16px; border: 1px solid rgba(0,0,0,0.08); margin-top: 10px; }
        .cost-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid rgba(0,0,0,0.06); font-size: 12px; }
        .cost-row:last-child { border-bottom: none; }
        .tool-tag { display: inline-block; padding: 3px 9px; border-radius: 20px; font-size: 11px; background: rgba(0,0,0,0.06); color: #555; margin: 2px; font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#1C1C1C", padding: "28px 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Proposta commerciale</div>
        <h1 className="serif" style={{ fontSize: 30, color: "#fff", fontWeight: 400, marginBottom: 4 }}>
          🍕 Il Cono Pizza
        </h1>
        <div style={{ fontSize: 13, color: "#666", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>Via Isonzo, 22, 21052 Busto Arsizio VA</div>
        <p style={{ fontSize: 14, color: "#888", fontFamily: "'DM Sans', sans-serif", maxWidth: 420, margin: "0 auto" }}>
          Tre piani per costruire la tua presenza digitale e trasformare follower in clienti ricorrenti.
        </p>
      </div>

      {/* SELECTOR PIANI */}
      <div style={{ padding: "20px 20px 0", display: "flex", gap: 10 }}>
        {plans.map((p) => (
          <button
            key={p.id}
            className="plan-btn"
            onClick={() => setActive(p.id)}
            style={{
              flex: 1,
              padding: "14px 10px",
              borderRadius: 12,
              background: active === p.id ? p.color : "#fff",
              border: `2px solid ${active === p.id ? p.color : "#E8E8E4"}`,
              color: active === p.id ? "#fff" : "#555",
              textAlign: "center",
            }}
          >
            {p.badge && (
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", opacity: active === p.id ? 1 : 0.6, marginBottom: 4 }}>
                {p.badge}
              </div>
            )}
            <div style={{ fontSize: 17, fontWeight: 600, fontFamily: "'DM Serif Display', serif" }}>{p.name}</div>
            <div style={{ fontSize: 12, marginTop: 2, opacity: 0.8 }}>€{p.once} + IVA + €{p.monthly}/mese + IVA</div>
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "16px 20px 32px" }}>

        {/* PLAN HEADER */}
        <div style={{ background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: 14, padding: "18px 18px 14px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <span className="serif" style={{ fontSize: 24, color: plan.color, fontWeight: 400 }}>Piano {plan.name}</span>
              <div style={{ fontSize: 14, color: "#666", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{plan.tagline}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#999", fontFamily: "'DM Sans', sans-serif" }}>Una tantum</div>
              <div className="serif" style={{ fontSize: 24, color: plan.color }}>€{plan.once}<span style={{ fontSize: 13, color: "#999", fontFamily: "sans-serif" }}> + IVA</span></div>
            </div>
          </div>
          <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.72, fontFamily: "'DM Sans', sans-serif" }}>{plan.summary}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${plan.border}` }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ fontSize: 12, color: "#999" }}>Canone mensile</span>
              <div className="serif" style={{ fontSize: 22, color: plan.color }}>
                €{plan.monthly}<span style={{ fontSize: 13, color: "#999", fontFamily: "sans-serif" }}>/mese + IVA</span>
              </div>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#999" }}>Tool inclusi</div>
              <div style={{ marginTop: 4 }}>
                {plan.tools.slice(0, 3).map((t) => (
                  <span key={t} className="tool-tag">{t}</span>
                ))}
                {plan.tools.length > 3 && <span className="tool-tag">+{plan.tools.length - 3}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* TAB SELECTOR */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, background: "#EEEEE9", borderRadius: 10, padding: 4 }}>
          {[
            { id: "once", label: "Setup una tantum" },
            { id: "monthly", label: "Canone mensile" },
            { id: "not", label: "Non incluso" },
          ].map((t) => (
            <button
              key={t.id}
              className="tab-btn"
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "8px 6px",
                borderRadius: 7,
                fontSize: 12.5,
                fontWeight: tab === t.id ? 600 : 400,
                background: tab === t.id ? "#fff" : "transparent",
                color: tab === t.id ? "#1C1C1C" : "#888",
                boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB: UNA TANTUM */}
        {tab === "once" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "4px 16px 8px", border: "1px solid #E8E8E4" }}>
            <div style={{ fontSize: 12, color: "#999", padding: "10px 0 6px", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              Incluso nel setup · pagato una volta
            </div>
            <div style={{ margin: "4px 0 8px", padding: "14px 14px", background: "#1C1C1C", borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{serviceProfile.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Cosa prevede il pacchetto {plan.name}?</div>
                  <span style={{ fontSize: 11, color: "#1C1C1C", background: plan.color, borderRadius: 999, padding: "4px 9px", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", fontWeight: 700 }}>{serviceProfile.badge}</span>
                </div>
                <div style={{ fontSize: 13, color: plan.color, fontWeight: 700, fontFamily: "'DM Serif Display', serif", marginBottom: 8, fontStyle: "italic", lineHeight: 1.4 }}>{serviceProfile.headline}</div>
                <p style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{serviceProfile.body}</p>
              </div>
            </div>
            <div style={{ margin: "4px 0 8px", padding: "12px 12px", background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <div style={{ fontSize: 13, color: plan.color, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{support.title}</div>
                <span style={{ fontSize: 11, color: "#fff", background: plan.color, borderRadius: 999, padding: "4px 8px", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{support.badge}</span>
              </div>
              <div style={{ marginTop: 8 }}>
                {support.points.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: i === support.points.length - 1 ? 0 : 6 }}>
                    <span style={{ color: plan.color, fontSize: 13 }}>•</span>
                    <span style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55, fontFamily: "'DM Sans', sans-serif" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            {plan.once_includes.map((item, i) => (
              <div key={i} className="check-item">
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: "#1C1C1C", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: MENSILE */}
        {tab === "monthly" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: "4px 16px 8px", border: "1px solid #E8E8E4" }}>
              <div style={{ fontSize: 12, color: "#999", padding: "10px 0 6px", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                Incluso nel canone mensile · ogni mese
              </div>
              {plan.monthly_includes.map((item, i) => (
                <div key={i} className="check-item">
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#1C1C1C", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {plan.disclaimer && (
              <div style={{ marginTop: 12, padding: "12px 14px", background: plan.bg, borderRadius: 10, border: `1px solid ${plan.border}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.68, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{plan.disclaimer}</p>
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => setShowCosts(!showCosts)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#999", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 4 }}
              >
                {showCosts ? "▾" : "▸"} {showCosts ? "Nascondi" : "Mostra"} composizione del canone
              </button>
              {showCosts && (
                <div className="note-box" style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                    Composizione indicativa del canone mensile
                  </div>
                  {costs.map((c, i) => (
                    <div key={i} className="cost-row">
                      <span style={{ color: "#555", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{c.item}</span>
                      <span style={{ fontWeight: 600, color: "#1C1C1C", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{c.cost}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 10, fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>
                    * I costi dei servizi inclusi possono variare nel tempo in base alla crescita della base contatti.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: NON INCLUSO */}
        {tab === "not" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "4px 16px 8px", border: "1px solid #E8E8E4" }}>
            <div style={{ fontSize: 11, color: "#999", padding: "10px 0 6px", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              Non incluso in questo piano
            </div>
            {plan.not_included.map((item, i) => (
              <div key={i} className="not-inc">
                <span style={{ color: "#E53E3E", fontSize: 14 }}>✕</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
              </div>
            ))}
            {plan.id !== "top" && (
              <div style={{ marginTop: 12, padding: "12px 14px", background: plan.bg, borderRadius: 10, border: `1px solid ${plan.border}` }}>
                <div style={{ fontSize: 13, color: plan.color, fontWeight: 600, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                  Vuoi queste funzionalità?
                </div>
                <div style={{ fontSize: 13, color: "#666", fontFamily: "'DM Sans', sans-serif" }}>
                  Sono incluse nel piano {plan.id === "starter" ? "Plus o Premium" : "Premium"}. Puoi fare upgrade in qualsiasi momento, il lavoro già fatto non si butta.
                </div>
              </div>
            )}
          </div>
        )}

        {/* NOTE FINALI */}
        <div style={{ marginTop: 16, padding: "14px 16px", background: "#F5F4EF", borderRadius: 12, border: "1px solid #E8E8E4" }}>
          <div style={{ fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            Note importanti
          </div>
          {[
            { icon: "📌", text: "Il budget delle campagne pubblicitarie è sempre separato e gestito direttamente dal cliente. Non è mai incluso nei piani." },
            { icon: "🔄", text: "Upgrade possibile in qualsiasi momento. Il lavoro già svolto non viene mai rifatto, si costruisce sopra." },
            { icon: "🔒", text: "Tutti i dati (lista email, dominio, account) restano di proprietà del cliente al 100%." },
            { icon: "📃", text: "Il canone mensile ha durata minima di 3 mesi, poi è rinnovabile mese per mese con preavviso di 30 giorni." },
          ].map((n, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14 }}>{n.icon}</span>
              <span style={{ fontSize: 13, color: "#666", lineHeight: 1.62, fontFamily: "'DM Sans', sans-serif" }}>{n.text}</span>
            </div>
          ))}
        </div>

        {/* CONFRONTO PIANI */}
        <div style={{ marginTop: 14, padding: "14px 16px", background: "#1C1C1C", borderRadius: 12 }}>
          <div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            Confronto piani
          </div>
          {[
            ["Dominio + email professionale", true, true, true],
            ["Pagina di acquisizione contatti", true, true, true],
            ["Email di benvenuto + coupon", true, true, true],
            ["Presenza locale iniziale", true, true, true],
            ["Sequenza 5 email automatica", false, true, true],
            ["Pannello CRM su misura", false, true, true],
            ["Automazioni avanzate (win-back, birthday)", false, true, true],
            ["Newsletter mensile inclusa", false, true, true],
            ["SEO avanzato + ricerca evoluta", false, true, true],
            ["Automazione conversazionale social", false, false, true],
            ["Gestione campagne pubblicitarie", false, false, true],
            ["Gestione presenza locale mensile", false, false, true],
            ["2 newsletter mensili incluse", false, false, true],
          ].map(([label, s, p, t], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ flex: 1, fontSize: 12.5, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
              {[s, p, t].map((v, j) => (
                <span key={j} style={{ width: 44, textAlign: "center", fontSize: 14, color: v ? ["#4A7C59", "#D85A30", "#2A4E8C"][j] : "#444" }}>
                  {v ? "✓" : "·"}
                </span>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            {["Starter", "Plus", "Premium"].map((name, j) => (
              <span key={j} style={{ width: 44, textAlign: "center", fontSize: 11, color: ["#4A7C59", "#D85A30", "#2A4E8C"][j], fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* BOX OBIETTIVO FINALE */}
        <div style={{ marginTop: 14, padding: "14px 14px", background: "#FFFBEA", border: "1px solid #F5E97A", borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>⭐</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92700A", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>L'obiettivo finale, indipendentemente dal piano scelto</div>
            <p style={{ fontSize: 12.5, color: "#6B5500", lineHeight: 1.68, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>Costruire un sistema che lavora per te ogni giorno: acquisire nuovi clienti, mantenere una presenza online curata e coerente su tutte le piattaforme (testi, grafica, video e informazioni sempre aggiornate) e garantire una risposta tempestiva a ogni messaggio. Un'unica macchina ben oliata fatta di automazioni, gestione dei profili, email marketing e supporto costante. Lavoriamo in stretta collaborazione con tutte le figure che già supportano la tua attivita: fotografa, social media manager, grafico, titolare e chiunque altro faccia parte del team. Tutti con un unico obiettivo condiviso. Seleziona il piano che fa per te e iniziamo a costruire le basi digitali della tua attivita.</p>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ marginTop: 16, background: "#fff", border: "1px solid #E8E8E4", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            QuiWeb · Preventivo professionale
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: "#666", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
            Proposta personalizzata per Il Cono Pizza di Busto Arsizio · Assistenza operativa e supporto continuo inclusi.
          </div>
        </footer>

      </div>

      {/* FLOATING WHATSAPP */}
      <div style={{ position: "fixed", right: 16, bottom: 18, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <button
          onClick={() => setShowContactModal(true)}
          style={{
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 14px",
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(37,211,102,0.28)",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            minHeight: 44,
          }}
        >
          💬 Hai qualche dubbio?
        </button>
      </div>

      {showContactModal && (
        <div
          onClick={() => setShowContactModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.34)", zIndex: 70, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 12 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 18, border: "1px solid #ECECEC", padding: "14px 14px 12px", boxShadow: "0 22px 50px rgba(0,0,0,0.16)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", fontFamily: "'DM Sans', sans-serif" }}>Supporto rapido su WhatsApp</div>
              <button onClick={() => setShowContactModal(false)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 20, lineHeight: 1, color: "#999", minWidth: 36, minHeight: 36 }}>×</button>
            </div>

            <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
              Ciao, sono Eric! Sono qui per te: se hai dubbi, domande sul preventivo o vuoi qualcosa di ancora più su misura per la tua attività, non esitare a scrivermi. Sarò felice di aiutarti!
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 44, borderRadius: 12, background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}
            >
              Apri WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
