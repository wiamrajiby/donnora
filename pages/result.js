/* Donnora — result.js — Réception du Résultat (Côté Hôpital) */
/* L'app REÇOIT le résultat envoyé par le robot via Firebase */
/* Le robot fait la détection IA, pas l'app */
/* Placer dans pages/result.js */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";

/* ── Icônes SVG ── */
function BloodDrop(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 10.5 5 15a7 7 0 0014 0c0-4.5-7-13-7-13z" fill={p.color||"#DC2626"}/></svg>);
}
function CheckIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function PhoneIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>);
}
function HospitalIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/></svg>);
}
function ClockIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
}
function WifiIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={p.color||"currentColor"}/></svg>);
}
function UsersIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
}
function BellIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>);
}
function AmbulanceIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 6h4l3 4v8h-3"/><circle cx="5.5" cy="18" r="2.5" fill="none"/><circle cx="18.5" cy="18" r="2.5" fill="none"/><path d="M6 9h4M8 7v4"/></svg>);
}
function BoxIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>);
}

/* ── Cercle de progression animé (confiance IA) ── */
function CircleProgress(props) {
  var _v = useState(0), val = _v[0], setVal = _v[1];
  var r = 54;
  var circ = 2 * Math.PI * r;

  useEffect(function() {
    var t = setTimeout(function() { setVal(props.value); }, 600);
    return function() { clearTimeout(t); };
  }, []);

  var offset = circ - (val / 100) * circ;
  var color = val >= 95 ? "#16A34A" : val >= 85 ? "#F59E0B" : "#DC2626";

  return (
    <div style={{ position: "relative", width: props.size || 130, height: props.size || 130 }}>
      <svg width={props.size || 130} height={props.size || 130} viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f0f0f0" strokeWidth="8"/>
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1), stroke .5s" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span className="mono" style={{ fontSize: 26, fontWeight: 800, color: "#111" }}>{val}%</span>
        <span style={{ fontSize: 10, color: "#999", marginTop: 2 }}>confiance IA</span>
      </div>
    </div>
  );
}

export default function Result() {
  var router = useRouter();
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _phase = useState(0), phase = _phase[0], setPhase = _phase[1];
  /* phase: 0 = en attente de réception, 1 = résultat reçu, 2 = préparation confirmée */
  var _prepping = useState(false), prepping = _prepping[0], setPrepping = _prepping[1];

  useEffect(function() {
    setOk(true);
    /* Simulation : notification reçue du robot via Firebase après 2s */
    var t1 = setTimeout(function() { setPhase(1); }, 2000);
    return function() { clearTimeout(t1); };
  }, []);

  function confirmPreparation() {
    setPrepping(true);
    setTimeout(function() { setPhase(2); setPrepping(false); }, 1500);
  }

  /* Données reçues du robot via Firebase */
  var reception = {
    groupe: "B-",
    confiance: 97.5,
    timestamp: "12/05/2026 14:30:00",
    ambulance_id: "AMB-03",
    patient_id: "PAT-042",
    hopital: "CHU Casablanca",
    eta: "8 min",
    robot_model: "Donnora v1.0"
  };

  /* Table de compatibilité sanguine — logique côté NestJS */
  var compatibles = [
    { nom: "Fatima Zohra", groupe: "B-", ville: "Rabat", tel: "+212 6 98 76 54 32", dispo: true },
    { nom: "Omar Idrissi", groupe: "O-", ville: "Casablanca", tel: "+212 6 43 21 87 65", dispo: true },
    { nom: "Nadia Tazi", groupe: "O-", ville: "Tanger", tel: "+212 6 77 88 99 00", dispo: true },
    { nom: "Hassan El Fassi", groupe: "B-", ville: "Casablanca", tel: "+212 6 22 33 44 55", dispo: false },
    { nom: "Amina Chakir", groupe: "O-", ville: "Casablanca", tel: "+212 6 11 00 99 88", dispo: true }
  ];

  /* Chronologie — ce qui se passe côté robot, reçu via Firebase */
  var timeline = [
    { t: "14:28:12", label: "Ambulancier a plac\u00E9 l\u2019\u00E9chantillon dans le robot", icon: "blood", done: true },
    { t: "14:28:45", label: "Robot : cam\u00E9ra + IA analysent l\u2019agglutination", icon: "robot", done: true },
    { t: "14:30:00", label: "Robot : groupe sanguin B- d\u00E9tect\u00E9 (97.5%)", icon: "detect", done: phase >= 1 },
    { t: "14:30:01", label: "Firebase : r\u00E9sultat re\u00E7u par l\u2019application", icon: "receive", done: phase >= 1 },
    { t: "14:30:03", label: "Donneurs compatibles (B-, O-) identifi\u00E9s", icon: "donors", done: phase >= 1 },
    { t: "--:--:--", label: "H\u00F4pital : pr\u00E9paration du sang confirm\u00E9e", icon: "hospital", done: phase >= 2 }
  ];

  var groupeColors = {
    "A+":"#2563EB","A-":"#3B82F6","B+":"#DC2626","B-":"#EF4444",
    "AB+":"#7C3AED","AB-":"#8B5CF6","O+":"#16A34A","O-":"#22C55E"
  };

  return (
    <>
      <Head>
        <title>{"Donnora \u2014 R\u00E9sultat re\u00E7u"}</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#FAFAFA;overflow-x:hidden}
        .mono{font-family:'JetBrains Mono',monospace}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(220,38,38,.15)}50%{box-shadow:0 0 40px rgba(220,38,38,.35)}}
        @keyframes ripple{0%{transform:scale(1);opacity:.3}100%{transform:scale(2.5);opacity:0}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes notifBounce{0%{transform:scale(0) rotate(-12deg)}60%{transform:scale(1.15) rotate(3deg)}100%{transform:scale(1) rotate(0)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ecgLine{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}
        @keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(220,38,38,.3)}70%{box-shadow:0 0 0 14px rgba(220,38,38,0)}100%{box-shadow:0 0 0 0 rgba(220,38,38,0)}}
        @keyframes checkPop{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
        @keyframes progressBar{from{width:0%}to{width:100%}}

        .afu{animation:fadeUp .6s ease-out both}
        .afi{animation:fadeIn .5s ease-out both}
        .asi{animation:scaleIn .5s ease-out both}
        .asr{animation:slideRight .5s ease-out both}
        .asd{animation:slideDown .5s ease-out both}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
        .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}
        .d7{animation-delay:.7s}.d8{animation-delay:.8s}.d9{animation-delay:.9s}

        .notif-bell{animation:notifBounce .6s cubic-bezier(.34,1.56,.64,1) both}
        .groupe-reveal{animation:scaleIn .6s cubic-bezier(.34,1.56,.64,1) .2s both,glow 3s ease-in-out infinite .8s}
        .ripple-ring{position:absolute;border-radius:50%;border:2px solid rgba(220,38,38,.3);animation:ripple 2.5s infinite}
        .ecg-anim{stroke-dasharray:600;animation:ecgLine 4s linear infinite}

        .timeline-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;transition:all .5s}
        .timeline-line{width:2px;flex-shrink:0;transition:background .5s}

        .donor-chip{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:14px;border:1px solid #f0f0f0;background:#fff;transition:all .25s;cursor:pointer}
        .donor-chip:hover{border-color:#FECACA;background:#FFFBFB;transform:translateX(4px)}

        .action-btn-lg{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .3s}
        .action-btn-lg:not(:disabled):hover{transform:translateY(-2px)}
        .action-btn-lg:disabled{opacity:.7;cursor:default}

        .info-pill{display:flex;align-items:center;gap:8px;padding:12px 18px;border-radius:12px;background:#FAFAFA;border:1px solid #f0f0f0}
      `}</style>

      <Navbar />

      <main style={{ paddingTop: 90, maxWidth: 1240, margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* Breadcrumb */}
        <div className={ok?"afu d1":""} style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <button onClick={function(){ router.push("/home"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1px solid #e5e5e5", background: "#fff", fontSize: 12, fontWeight: 600, color: "#666", cursor: "pointer", transition: "all .2s" }} onMouseEnter={function(e){e.currentTarget.style.borderColor="#FECACA";e.currentTarget.style.color="#DC2626";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="#e5e5e5";e.currentTarget.style.color="#666";}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Retour
            </button>
            <span style={{ fontSize: 12, color: "#ccc" }}>/</span>
            <span style={{ fontSize: 12, color: "#999" }}>{"R\u00E9sultat re\u00E7u du robot"}</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111" }}>{"R\u00E9sultat re\u00E7u de l\u2019ambulance"}</h1>
          <p style={{ fontSize: 14, color: "#999", marginTop: 4 }}>{"Le robot embarqu\u00E9 a transmis le r\u00E9sultat via Firebase Realtime Database"}</p>
        </div>

        {/* ═══ Phase 0 : En attente de réception ═══ */}
        {phase === 0 && (
          <div className="asi" style={{ background: "#fff", borderRadius: 24, padding: 60, border: "1px solid #f0f0f0", textAlign: "center" }}>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 24px" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", animation: "ringPulse 2s infinite" }}>
                <WifiIcon size={32} color="#DC2626"/>
              </div>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 8 }}>{"En attente du r\u00E9sultat..."}</h2>
            <p style={{ fontSize: 14, color: "#999", marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>
              {"Le robot dans l\u2019ambulance AMB-03 est en train d\u2019analyser l\u2019\u00E9chantillon sanguin. Le r\u00E9sultat sera re\u00E7u automatiquement via Firebase."}
            </p>

            {/* Indicateur ambulance → Firebase → hôpital */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 28 }}>
              {[
                { icon: AmbulanceIcon, label: "Robot (ambulance)", color: "#16A34A" },
                null,
                { icon: WifiIcon, label: "Firebase", color: "#F59E0B" },
                null,
                { icon: HospitalIcon, label: "App (h\u00F4pital)", color: "#DC2626" }
              ].map(function(item, idx) {
                if (!item) {
                  return (
                    <div key={idx} style={{ display: "flex", alignItems: "center" }}>
                      <svg width="60" height="12" viewBox="0 0 60 12"><path d="M0 6h48" stroke="#ddd" strokeWidth="2" strokeDasharray="4 4"/><path d="M44 2l6 4-6 4" stroke="#ddd" strokeWidth="2" fill="none"/></svg>
                    </div>
                  );
                }
                var Icon = item.icon;
                return (
                  <div key={idx} style={{ textAlign: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: item.color + "10", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", border: "2px solid " + item.color + "25" }}>
                      <Icon size={22} color={item.color}/>
                    </div>
                    <p style={{ fontSize: 11, color: "#999", fontWeight: 500 }}>{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B", animation: "pulse 1.5s infinite" }}></div>
              <span style={{ fontSize: 13, color: "#F59E0B", fontWeight: 600 }}>{"Connexion Firebase active \u2014 \u00E9coute en temps r\u00E9el"}</span>
            </div>

            {/* ECG animé */}
            <div style={{ marginTop: 32, opacity: 0.12 }}>
              <svg width="100%" height="24" viewBox="0 0 600 24" preserveAspectRatio="none">
                <path className="ecg-anim" d="M0 12 L120 12 L140 3 L155 21 L170 3 L185 21 L200 12 L350 12 L370 5 L385 19 L400 5 L415 19 L430 12 L600 12" fill="none" stroke="#DC2626" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        )}

        {/* ═══ Phase 1 & 2 : Résultat reçu du robot ═══ */}
        {phase >= 1 && (
          <>
            {/* Bannière de notification */}
            <div className="notif-bell asd" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 22px", background: "#FEF2F2", borderRadius: 14, border: "1px solid #FECACA", marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BellIcon size={18} color="#fff"/>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#DC2626" }}>{"Nouveau r\u00E9sultat re\u00E7u de l\u2019ambulance " + reception.ambulance_id}</p>
                <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"D\u00E9tection effectu\u00E9e par le robot Donnora \u2014 re\u00E7u \u00E0 " + reception.timestamp}</p>
              </div>
              <span className="mono" style={{ fontSize: 11, color: "#DC2626", fontWeight: 600 }}>{"Arriv\u00E9e estim\u00E9e : " + reception.eta}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>

              {/* ── Colonne gauche ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Carte résultat reçu */}
                <div className="afu d2" style={{ background: "#fff", borderRadius: 24, padding: 36, border: "1px solid #f0f0f0", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,.06), transparent 70%)", pointerEvents: "none" }}/>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", letterSpacing: 1 }}>{"GROUPE SANGUIN RE\u00C7U DU ROBOT"}</p>
                      <p style={{ fontSize: 13, color: "#999", marginTop: 2 }}>{"D\u00E9tect\u00E9 par IA embarqu\u00E9e \u2014 Raspberry Pi"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: phase >= 2 ? "#F0FDF4" : "#FEF2F2", border: "1px solid " + (phase >= 2 ? "#BBF7D0" : "#FECACA") }}>
                      {phase >= 2 ? <CheckIcon size={12} color="#16A34A"/> : <AmbulanceIcon size={14} color="#DC2626"/>}
                      <span style={{ fontSize: 11, fontWeight: 600, color: phase >= 2 ? "#16A34A" : "#DC2626" }}>{phase >= 2 ? "Sang en pr\u00E9paration" : "Patient en route"}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    {/* Badge groupe sanguin géant */}
                    <div style={{ position: "relative" }}>
                      <div className="ripple-ring" style={{ width: 144, height: 144, top: -7, left: -7 }}></div>
                      <div className="groupe-reveal" style={{
                        width: 130, height: 130, borderRadius: 28,
                        background: "linear-gradient(135deg, #DC2626, #991B1B)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 16px 48px rgba(220,38,38,.3)"
                      }}>
                        <span className="mono" style={{ fontSize: 48, fontWeight: 800, color: "#fff" }}>{reception.groupe}</span>
                      </div>
                    </div>

                    {/* Cercle confiance */}
                    <CircleProgress value={reception.confiance} size={130}/>
                  </div>

                  {/* Informations reçues */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 28 }}>
                    {[
                      { icon: AmbulanceIcon, label: "Ambulance", value: reception.ambulance_id },
                      { icon: ClockIcon, label: "Re\u00E7u \u00E0", value: "14:30:01" },
                      { icon: HospitalIcon, label: "Destination", value: reception.hopital },
                      { icon: BoxIcon, label: "Robot", value: reception.robot_model }
                    ].map(function(info) {
                      var Icon = info.icon;
                      return (
                        <div key={info.label} className="info-pill">
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Icon size={14} color="#DC2626"/>
                          </div>
                          <div>
                            <p style={{ fontSize: 10, color: "#bbb", fontWeight: 600 }}>{info.label}</p>
                            <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{info.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Compatibilité sanguine — rappel visuel */}
                <div className="afu d4" style={{ background: "#fff", borderRadius: 24, padding: 28, border: "1px solid #f0f0f0" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 6 }}>{"COMPATIBILIT\u00C9 SANGUINE"}</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 16 }}>{"Patient B- \u2014 Peut recevoir de :"}</p>

                  <div style={{ display: "flex", gap: 14 }}>
                    {["B-", "O-"].map(function(g) {
                      return (
                        <div key={g} style={{ flex: 1, padding: "20px", borderRadius: 16, background: "linear-gradient(135deg, " + (groupeColors[g] || "#DC2626") + "08, " + (groupeColors[g] || "#DC2626") + "15)", border: "2px solid " + (groupeColors[g] || "#DC2626") + "30", textAlign: "center" }}>
                          <div style={{ width: 48, height: 48, borderRadius: 14, background: (groupeColors[g] || "#DC2626") + "18", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                            <BloodDrop size={22} color={groupeColors[g] || "#DC2626"}/>
                          </div>
                          <p className="mono" style={{ fontSize: 28, fontWeight: 800, color: groupeColors[g] || "#DC2626" }}>{g}</p>
                          <p style={{ fontSize: 11, color: "#999", marginTop: 4 }}>Donneur compatible</p>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: 14, padding: "10px 16px", background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0" }}>
                    <p style={{ fontSize: 12, color: "#16A34A" }}>
                      <strong>{compatibles.filter(function(d){ return d.dispo; }).length} donneurs disponibles</strong>{" trouv\u00E9s automatiquement par l\u2019API NestJS dans Firebase Firestore"}
                    </p>
                  </div>
                </div>

                {/* Bouton d'action hôpital */}
                {phase === 1 && !prepping && (
                  <button className="action-btn-lg afu d5" onClick={confirmPreparation} style={{ background: "linear-gradient(135deg,#DC2626,#991B1B)", color: "#fff", boxShadow: "0 6px 24px rgba(220,38,38,.3)" }}>
                    <HospitalIcon size={20} color="#fff"/>
                    {"Confirmer la pr\u00E9paration du sang B-"}
                  </button>
                )}
                {prepping && (
                  <div className="asi" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16, background: "#FEF2F2", borderRadius: 14, border: "1px solid #FECACA" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: "3px solid #FEE2E2", borderTop: "3px solid #DC2626", animation: "spin .8s linear infinite" }}></div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#DC2626" }}>Confirmation en cours...</span>
                  </div>
                )}
                {phase >= 2 && (
                  <div className="asi" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16, background: "#F0FDF4", borderRadius: 14, border: "1px solid #BBF7D0" }}>
                    <CheckIcon size={18} color="#16A34A"/>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#16A34A" }}>{"Pr\u00E9paration du sang B- confirm\u00E9e \u2014 \u00E9quipe m\u00E9dicale alert\u00E9e"}</span>
                  </div>
                )}
              </div>

              {/* ── Colonne droite ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Chronologie */}
                <div className="afu d3" style={{ background: "#fff", borderRadius: 24, padding: 28, border: "1px solid #f0f0f0" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 20 }}>CHRONOLOGIE</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {timeline.map(function(item, idx) {
                      var isLast = idx === timeline.length - 1;
                      return (
                        <div key={idx} className={ok ? "asr d" + Math.min(idx + 2, 9) : ""} style={{ display: "flex", gap: 14 }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div className="timeline-dot" style={{
                              background: item.done ? "#DC2626" : "#e5e5e5",
                              boxShadow: item.done ? "0 0 0 4px rgba(220,38,38,.12)" : "none"
                            }}>
                              {item.done && <div style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                              </div>}
                            </div>
                            {!isLast && <div className="timeline-line" style={{ height: 28, background: item.done ? "#FECACA" : "#f0f0f0" }}></div>}
                          </div>
                          <div style={{ paddingBottom: isLast ? 0 : 16 }}>
                            <p className="mono" style={{ fontSize: 10, color: item.done ? "#DC2626" : "#ddd", marginBottom: 2 }}>{item.t}</p>
                            <p style={{ fontSize: 12, fontWeight: item.done ? 600 : 400, color: item.done ? "#111" : "#ccc", lineHeight: 1.4 }}>{item.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Donneurs compatibles */}
                <div className="afu d5" style={{ background: "#fff", borderRadius: 24, padding: 28, border: "1px solid #f0f0f0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 4 }}>DONNEURS COMPATIBLES</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>B- et O-</p>
                    </div>
                    <button onClick={function(){ router.push("/donneurs"); }} style={{ fontSize: 11, fontWeight: 600, color: "#DC2626", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      Voir tous <ArrowRight size={10} color="#DC2626"/>
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {compatibles.map(function(d, idx) {
                      return (
                        <div key={idx} className={"donor-chip " + (ok ? "asr d" + Math.min(idx + 5, 9) : "")} onClick={function(){ router.push("/donneurs/" + (idx + 1)); }}>
                          <div style={{ width: 34, height: 34, borderRadius: 10, background: (groupeColors[d.groupe] || "#DC2626") + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <BloodDrop size={14} color={groupeColors[d.groupe] || "#DC2626"}/>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{d.nom}</p>
                            <p style={{ fontSize: 11, color: "#999" }}>{d.ville}</p>
                          </div>
                          <span className="mono" style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: (groupeColors[d.groupe] || "#DC2626") + "12", color: groupeColors[d.groupe] || "#DC2626" }}>{d.groupe}</span>
                          {d.dispo ? (
                            <a href={"tel:" + d.tel} onClick={function(e){ e.stopPropagation(); }} style={{ width: 30, height: 30, borderRadius: 8, background: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform .2s" }} onMouseEnter={function(e){e.currentTarget.style.transform="scale(1.1)";}} onMouseLeave={function(e){e.currentTarget.style.transform="scale(1)";}}>
                              <PhoneIcon size={12} color="#fff"/>
                            </a>
                          ) : (
                            <span style={{ fontSize: 10, color: "#D97706", fontWeight: 600, padding: "4px 8px", background: "#FFF7ED", borderRadius: 6, border: "1px solid #FDE68A" }}>Indispo.</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Infos patient en route */}
                <div className="afu d7" style={{ background: "linear-gradient(135deg,#DC2626,#991B1B)", borderRadius: 20, padding: 24, color: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <AmbulanceIcon size={20} color="#fff"/>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>Patient en route</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 14px" }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>{"Arriv\u00E9e estim\u00E9e"}</p>
                      <p className="mono" style={{ fontSize: 20, fontWeight: 800 }}>{reception.eta}</p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 14px" }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>Patient</p>
                      <p className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{reception.patient_id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}