/* Donnora — home.js — Tableau de Bord Médical */
/* Placer dans pages/home.js */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { ecouterStatutAmbulance } from "../services/realtimeService";
import { alerterHopital } from "../services/notificationsService";

/* ── Icônes SVG ── */
function BloodDrop(p) {
  const s = p.size || 24;
  const c = p.color || "#DC2626";
  return (
    <svg width={s} height={s} viewBox="0 0 80 100" fill="none">
      <path d="M40 5C40 5 10 40 10 58a30 30 0 0060 0c0-18-30-53-30-53z" fill={c}/>
      <polyline points="18,58 28,58 32,48 36,68 40,42 44,72 48,50 52,58 62,58" 
        fill="none" stroke={c === "#fff" || c === "white" ? "#DC2626" : "white"} 
        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function HeartIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill={p.color||"#DC2626"}/></svg>);
}
function UsersIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
}
function WifiIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={p.color||"#16A34A"}/></svg>);
}
function ClockIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
}
function ActivityIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
}
function PhoneIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function BellIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>);
}
function CheckIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>);
}
function HospitalIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/></svg>);
}

/* ── Compteur animé ── */
function AnimCounter(props) {
  var _v = useState(0), val = _v[0], setVal = _v[1];
  useEffect(function() {
    var target = props.to;
    var dur = 1800;
    var start = Date.now();
    function tick() {
      var elapsed = Date.now() - start;
      var progress = Math.min(elapsed / dur, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    var t = setTimeout(function() { requestAnimationFrame(tick); }, props.delay || 0);
    return function() { clearTimeout(t); };
  }, []);
  return <span>{val}{props.suffix || ""}</span>;
}

export default function Home() {
  var router = useRouter();
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _time = useState(""), time = _time[0], setTime = _time[1];
  var _date = useState(""), dateStr = _date[0], setDateStr = _date[1];
  var _statut = useState("deconnecte"), statut = _statut[0], setStatut = _statut[1];

  useEffect(function() {
  setOk(true);
  var unsubStatut = ecouterStatutAmbulance("AMB-03", setStatut);
  function updateTime() {
      var now = new Date();
      setTime(now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDateStr(now.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    }
    updateTime();
    var i = setInterval(updateTime, 1000);
    return function() { clearInterval(i); unsubStatut(); };
  }, []);

  /* Données fictives */
  var lastDetection = { groupe: "B-", confiance: 97.5, heure: "14:30", ambulance: "AMB-03" };
  var recentDonneurs = [
    { id: 1, nom: "Ahmed Ben Ali", groupe: "O+", ville: "Casablanca", tel: "+212 6 12 34 56 78", dispo: true },
    { id: 2, nom: "Fatima Zohra", groupe: "B-", ville: "Rabat", tel: "+212 6 98 76 54 32", dispo: true },
    { id: 3, nom: "Youssef El Amrani", groupe: "O-", ville: "Tanger", tel: "+212 6 11 22 33 44", dispo: false },
    { id: 4, nom: "Khadija Bennani", groupe: "A+", ville: "Marrakech", tel: "+212 6 55 66 77 88", dispo: true },
  ];

  var groupeColors = {
    "A+": "#2563EB", "A-": "#3B82F6", "B+": "#DC2626", "B-": "#EF4444",
    "AB+": "#7C3AED", "AB-": "#8B5CF6", "O+": "#16A34A", "O-": "#22C55E"
  };

  return (
    <>
      <Head>
        <title>Donnora — Tableau de bord</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#FAFAFA;overflow-x:hidden}
        .fs{font-family:'Playfair Display',serif}
        .mono{font-family:'JetBrains Mono',monospace}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes ecgLine{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(22,163,74,.4)}70%{box-shadow:0 0 0 12px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}
        @keyframes bloodPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}

        .afu{animation:fadeUp .6s ease-out both}
        .afi{animation:fadeIn .5s ease-out both}
        .asi{animation:scaleIn .5s ease-out both}
        .asr{animation:slideRight .5s ease-out both}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
        .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}
        .d7{animation-delay:.7s}.d8{animation-delay:.8s}

        .stat-card{border-radius:20px;padding:28px;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s;cursor:default}
        .stat-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.08)}
        .stat-card::before{content:'';position:absolute;top:0;right:0;width:100px;height:100px;border-radius:50%;opacity:.06;pointer-events:none}

        .action-btn{display:flex;align-items:center;gap:10px;padding:16px 24px;border-radius:14px;border:1.5px solid #f0f0f0;background:#fff;font-size:14px;font-weight:600;color:#333;cursor:pointer;transition:all .25s;width:100%}
        .action-btn:hover{border-color:#FECACA;background:#FFFBFB;transform:translateX(4px)}
        .action-btn:hover .action-arrow{transform:translateX(4px)}
        .action-arrow{margin-left:auto;transition:transform .25s}

        .donor-row{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:14px;transition:all .2s;cursor:pointer}
        .donor-row:hover{background:#FEF2F2}

        .ecg-path{stroke-dasharray:1000;animation:ecgLine 3s linear infinite}
        .status-dot{width:10px;height:10px;border-radius:50%;background:#16A34A;animation:ringPulse 2s infinite}

        .groupe-badge{display:inline-flex;align-items:center;justify-content:center;font-weight:800;border-radius:10px;font-family:'JetBrains Mono',monospace}
        .groupe-big{width:120px;height:120px;font-size:42px;border-radius:24px;animation:bloodPulse 3s ease-in-out infinite}
      `}</style>

      <Navbar />

      <main style={{ paddingTop: 90, paddingBottom: 60, maxWidth: 1240, margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* En-tête */}
        <div className={ok ? "afu d1" : ""} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111" }}>Tableau de bord</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F0FDF4", padding: "6px 14px", borderRadius: 100, border: "1px solid #BBF7D0" }}>
                <div className="status-dot"></div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#16A34A" }}>{statut === "connecte" ? "Robot connecté" : statut === "en_route" ? "En route" : "Déconnecté"}</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "#999" }}>{dateStr}</p>
          </div>
          <div className={ok ? "asi d2" : ""} style={{ textAlign: "right" }}>
            <p className="mono" style={{ fontSize: 28, fontWeight: 700, color: "#111", letterSpacing: 1 }}>{time}</p>
            <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>{"Ambulance AMB-03 \u2022 H\u00F4pital Casablanca"}</p>
          </div>
        </div>

        {/* ECG décoratif */}
        <div className={ok ? "afi d2" : ""} style={{ marginBottom: 32, overflow: "hidden", height: 30, opacity: 0.15 }}>
          <svg width="100%" height="30" viewBox="0 0 1200 30" preserveAspectRatio="none">
            <path className="ecg-path" d="M0 15 L200 15 L220 5 L240 25 L260 5 L280 25 L300 15 L500 15 L520 2 L540 28 L560 2 L580 28 L600 15 L800 15 L820 8 L840 22 L860 8 L880 22 L900 15 L1200 15" fill="none" stroke="#DC2626" strokeWidth="2"/>
          </svg>
        </div>

        {/* Cartes statistiques */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
          {[
            { icon: ActivityIcon, label: "D\u00E9tections aujourd'hui", value: 12, suffix: "", color: "#DC2626", bg: "#fff" },
            { icon: UsersIcon, label: "Donneurs disponibles", value: 47, suffix: "", color: "#2563EB", bg: "#fff" },
            { icon: ClockIcon, label: "Temps moyen", value: 3, suffix: " min", color: "#F59E0B", bg: "#fff" },
            { icon: HeartIcon, label: "Vies sauv\u00E9es ce mois", value: 28, suffix: "", color: "#16A34A", bg: "#fff" }
          ].map(function(stat, idx) {
            var Icon = stat.icon;
            return (
              <div key={stat.label} className={"stat-card " + (ok ? "asi d" + (idx + 2) : "")} style={{ background: stat.bg, border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: stat.color + "10", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={stat.color}/>
                  </div>
                  <svg width="60" height="24" viewBox="0 0 60 24" fill="none" style={{ opacity: 0.3 }}>
                    <path d={"M0 " + (20 - idx * 3) + " C15 " + (8 + idx * 2) + " 30 " + (18 - idx * 4) + " 45 " + (6 + idx * 3) + " L60 " + (12 - idx)} stroke={stat.color} strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <p className="mono" style={{ fontSize: 36, fontWeight: 800, color: "#111", lineHeight: 1 }}>
                  <AnimCounter to={stat.value} suffix={stat.suffix} delay={300 + idx * 150}/>
                </p>
                <p style={{ fontSize: 13, color: "#999", marginTop: 6 }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Grille principale : Dernière détection + Actions rapides */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginBottom: 32 }}>

          {/* Dernière détection */}
          <div className={ok ? "afu d5" : ""} style={{ background: "#fff", borderRadius: 24, padding: 36, border: "1px solid #f0f0f0", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,.05), transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 4 }}>{"DERNI\u00C8RE D\u00C9TECTION"}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#111" }}>Groupe sanguin identifi&eacute;</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F0FDF4", padding: "6px 12px", borderRadius: 8, border: "1px solid #BBF7D0" }}>
                <CheckIcon size={12} color="#16A34A"/>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#16A34A" }}>Transmis</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {/* Badge groupe sanguin géant */}
              <div className="groupe-big" style={{ background: "linear-gradient(135deg, #DC2626, #991B1B)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(220,38,38,.25)" }}>
                {lastDetection.groupe}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "#FAFAFA", borderRadius: 14, padding: "14px 18px" }}>
                    <p style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Confiance IA</p>
                    <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{lastDetection.confiance}%</p>
                  </div>
                  <div style={{ background: "#FAFAFA", borderRadius: 14, padding: "14px 18px" }}>
                    <p style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Heure</p>
                    <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{lastDetection.heure}</p>
                  </div>
                  <div style={{ background: "#FAFAFA", borderRadius: 14, padding: "14px 18px" }}>
                    <p style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Ambulance</p>
                    <p className="mono" style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{lastDetection.ambulance}</p>
                  </div>
                  <div style={{ background: "#FAFAFA", borderRadius: 14, padding: "14px 18px" }}>
                    <p style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Donneurs compatibles</p>
                    <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: "#DC2626" }}>12</p>
                  </div>
                </div>
                <button onClick={function(){ router.push("/result"); }} style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px", background: "linear-gradient(135deg,#DC2626,#B91C1C)", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(220,38,38,.25)", transition: "transform .2s" }} onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={function(e){e.currentTarget.style.transform="translateY(0)";}}>
                  {"Voir le r\u00E9sultat complet"} <ArrowRight size={14} color="#fff"/>
                </button>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className={ok ? "afu d6" : ""} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 4 }}>ACTIONS RAPIDES</p>
            {[
              { icon: BloodDrop, label: "Lancer une d\u00E9tection", desc: "D\u00E9marrer l\u2019analyse du groupe sanguin", href: "/result" },
              { icon: UsersIcon, label: "Voir les donneurs", desc: "Liste des donneurs compatibles", href: "/donneurs" },
              { icon: ClockIcon, label: "Historique", desc: "Toutes les d\u00E9tections pass\u00E9es", href: "/historique" },
              { icon: BellIcon, label: "Alerter l\u2019h\u00F4pital", desc: "Envoyer une notification push", href: "#" },
              { icon: HospitalIcon, label: "Param\u00E8tres", desc: "Ambulance et h\u00F4pital", href: "/parametres" }
            ].map(function(action, idx) {
              var Icon = action.icon;
              return (
                <button key={action.label} className={"action-btn " + (ok ? "asr d" + (idx + 3) : "")} onClick={function(){if (action.label === "Alerter l\u2019h\u00F4pital") {alerterHopital({groupe_sanguin: lastDetection.groupe,ambulance_id: lastDetection.ambulance,confiance: lastDetection.confiance,eta: "8 min",nb_donneurs: 12});} else if (action.href !== "#") {router.push(action.href);}}}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="#DC2626"/>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{action.label}</p>
                    <p style={{ fontSize: 11, color: "#999", marginTop: 1 }}>{action.desc}</p>
                  </div>
                  <div className="action-arrow"><ArrowRight size={14} color="#ccc"/></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Donneurs récents */}
        <div className={ok ? "afu d7" : ""} style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 4 }}>DONNEURS COMPATIBLES</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{"Groupe B- et O- \u2014 disponibles"}</p>
            </div>
            <button onClick={function(){ router.push("/donneurs"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#DC2626", cursor: "pointer", transition: "all .2s" }} onMouseEnter={function(e){e.currentTarget.style.background="#FEE2E2";}} onMouseLeave={function(e){e.currentTarget.style.background="#FEF2F2";}}>
              Voir tous <ArrowRight size={12} color="#DC2626"/>
            </button>
          </div>

          {/* En-tête tableau */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 20px", marginBottom: 4 }}>
            <p style={{ flex: 1.5, fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: 0.5 }}>NOM</p>
            <p style={{ width: 70, fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>GROUPE</p>
            <p style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: 0.5 }}>VILLE</p>
            <p style={{ width: 80, fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>STATUT</p>
            <p style={{ width: 100, fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>ACTION</p>
          </div>

          {recentDonneurs.map(function(d, idx) {
            return (
              <div key={d.id} className={"donor-row " + (ok ? "asr d" + (idx + 5) : "")} onClick={function(){ router.push("/donneurs/" + d.id); }}>
                <div style={{ flex: 1.5, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: (groupeColors[d.groupe] || "#DC2626") + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BloodDrop size={16} color={groupeColors[d.groupe] || "#DC2626"}/>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{d.nom}</p>
                    <p style={{ fontSize: 11, color: "#bbb" }}>{d.tel}</p>
                  </div>
                </div>
                <div style={{ width: 70, textAlign: "center" }}>
                  <span className="groupe-badge mono" style={{ padding: "4px 12px", fontSize: 13, background: (groupeColors[d.groupe] || "#DC2626") + "12", color: groupeColors[d.groupe] || "#DC2626" }}>{d.groupe}</span>
                </div>
                <p style={{ flex: 1, fontSize: 13, color: "#666" }}>{d.ville}</p>
                <div style={{ width: 80, textAlign: "center" }}>
                  {d.dispo ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, background: "#F0FDF4", fontSize: 11, fontWeight: 600, color: "#16A34A", border: "1px solid #BBF7D0" }}>Disponible</span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, background: "#FFF7ED", fontSize: 11, fontWeight: 600, color: "#D97706", border: "1px solid #FDE68A" }}>Indisponible</span>
                  )}
                </div>
                <div style={{ width: 100, textAlign: "center" }}>
                  <a href={"tel:" + d.tel} onClick={function(e){ e.stopPropagation(); }} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 16px", borderRadius: 8, background: d.dispo ? "#DC2626" : "#e5e5e5", color: d.dispo ? "#fff" : "#999", fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "transform .2s" }} onMouseEnter={function(e){ if(d.dispo) e.currentTarget.style.transform="translateY(-2px)"; }} onMouseLeave={function(e){ e.currentTarget.style.transform="translateY(0)"; }}>
                    <PhoneIcon size={12} color={d.dispo ? "#fff" : "#999"}/> Appeler
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </>
  );
}