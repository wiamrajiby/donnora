/* Donnora — donneurs/[id].js — Détail d'un Donneur */
/* Données venant de Firebase Firestore via API NestJS */
/* Placer dans pages/donneurs/[id].js */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";

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
function PhoneIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>);
}
function MessageIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>);
}
function MapPinIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);
}
function CalendarIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
}
function HeartIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill={p.color||"#DC2626"}/></svg>);
}
function CheckIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function ClockIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
}
function UserIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
}
function ShieldIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
}
function DropletIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C12 2 5 10.5 5 15a7 7 0 0014 0c0-4.5-7-13-7-13z"/></svg>);
}

export default function DonneurDetail() {
  var router = useRouter();
  var id = router.query.id;
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _smsSent = useState(false), smsSent = _smsSent[0], setSmsSent = _smsSent[1];

  useEffect(function() { setOk(true); }, []);

  var groupeColors = {
    "A+":"#2563EB","A-":"#3B82F6","B+":"#DC2626","B-":"#EF4444",
    "AB+":"#7C3AED","AB-":"#8B5CF6","O+":"#16A34A","O-":"#22C55E"
  };

  /* Données fictives — en production, fetch depuis GET /donneurs/:id via NestJS */
  var allDonneurs = {
    "1": { nom:"Ahmed Ben Ali", telephone:"+212 6 12 34 56 78", groupe_sanguin:"A+", ville:"Casablanca", disponible:true, derniere_date_don:"2026-01-15", email:"ahmed.benali@email.ma", age:34, poids:78, nb_dons:8 },
    "2": { nom:"Fatima Zohra", telephone:"+212 6 98 76 54 32", groupe_sanguin:"B-", ville:"Rabat", disponible:true, derniere_date_don:"2026-03-20", email:"fatima.zohra@email.ma", age:28, poids:62, nb_dons:5 },
    "3": { nom:"Youssef El Amrani", telephone:"+212 6 11 22 33 44", groupe_sanguin:"O-", ville:"Tanger", disponible:false, derniere_date_don:"2026-02-10", email:"youssef.amrani@email.ma", age:41, poids:85, nb_dons:15 },
    "4": { nom:"Khadija Bennani", telephone:"+212 6 55 66 77 88", groupe_sanguin:"A+", ville:"Marrakech", disponible:true, derniere_date_don:"2026-04-05", email:"khadija.b@email.ma", age:31, poids:58, nb_dons:3 },
    "5": { nom:"Omar Idrissi", telephone:"+212 6 43 21 87 65", groupe_sanguin:"O-", ville:"Casablanca", disponible:true, derniere_date_don:"2025-12-28", email:"omar.idrissi@email.ma", age:45, poids:92, nb_dons:22 },
    "6": { nom:"Nadia Tazi", telephone:"+212 6 77 88 99 00", groupe_sanguin:"O-", ville:"Tanger", disponible:true, derniere_date_don:"2026-02-14", email:"nadia.tazi@email.ma", age:26, poids:55, nb_dons:4 },
    "7": { nom:"Hassan El Fassi", telephone:"+212 6 22 33 44 55", groupe_sanguin:"B-", ville:"Casablanca", disponible:false, derniere_date_don:"2026-01-30", email:"hassan.f@email.ma", age:38, poids:80, nb_dons:11 },
    "8": { nom:"Amina Chakir", telephone:"+212 6 11 00 99 88", groupe_sanguin:"O+", ville:"Casablanca", disponible:true, derniere_date_don:"2026-03-12", email:"amina.ch@email.ma", age:29, poids:60, nb_dons:6 }
  };

  var donneur = allDonneurs[id] || allDonneurs["1"];
  var gc = groupeColors[donneur.groupe_sanguin] || "#DC2626";
  var initials = donneur.nom.split(" ").map(function(w){ return w[0]; }).join("").substring(0, 2);

  /* Compatibilité : qui peut recevoir de ce donneur */
  var compatTable = {
    "O-": ["O-","O+","A-","A+","B-","B+","AB-","AB+"],
    "O+": ["O+","A+","B+","AB+"],
    "A-": ["A-","A+","AB-","AB+"],
    "A+": ["A+","AB+"],
    "B-": ["B-","B+","AB-","AB+"],
    "B+": ["B+","AB+"],
    "AB-": ["AB-","AB+"],
    "AB+": ["AB+"]
  };
  var canGiveTo = compatTable[donneur.groupe_sanguin] || [];

  /* Historique de dons fictif */
  var historiqueDons = [
    { date: "15 Jan 2026", lieu: "Centre de don Casablanca", volume: "450 ml", statut: "ok" },
    { date: "28 Sep 2025", lieu: "CHU Ibn Rochd", volume: "450 ml", statut: "ok" },
    { date: "10 Mai 2025", lieu: "Centre de don Casablanca", volume: "450 ml", statut: "ok" },
    { date: "22 Jan 2025", lieu: "Campagne mobile Donnora", volume: "450 ml", statut: "ok" },
    { date: "05 Oct 2024", lieu: "CHU Ibn Rochd", volume: "250 ml", statut: "partiel" }
  ];

  function handleSMS() {
    setSmsSent(true);
    setTimeout(function() { setSmsSent(false); }, 3000);
  }

  return (
    <>
      <Head>
        <title>{"Donnora \u2014 " + donneur.nom}</title>
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
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(220,38,38,.12)}50%{box-shadow:0 0 40px rgba(220,38,38,.28)}}
        @keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(22,163,74,.3)}70%{box-shadow:0 0 0 10px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}
        @keyframes checkPop{from{transform:scale(0)}to{transform:scale(1)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

        .afu{animation:fadeUp .5s ease-out both}
        .afi{animation:fadeIn .4s ease-out both}
        .asi{animation:scaleIn .5s ease-out both}
        .asr{animation:slideRight .4s ease-out both}
        .asd{animation:slideDown .4s ease-out both}
        .d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}
        .d4{animation-delay:.2s}.d5{animation-delay:.25s}.d6{animation-delay:.3s}
        .d7{animation-delay:.35s}.d8{animation-delay:.4s}.d9{animation-delay:.45s}

        .profile-header{border-radius:28px;position:relative;overflow:hidden}
        .profile-header::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.6));z-index:1}
        .profile-header::after{content:'';position:absolute;top:-30%;right:-10%;width:300px;height:300px;border-radius:50%;background:rgba(220,38,38,.1);z-index:1;pointer-events:none}

        .compat-cell{border-radius:12px;padding:10px;text-align:center;transition:all .3s;cursor:default}
        .compat-cell.yes{border:2px solid rgba(22,163,74,.2)}
        .compat-cell.yes:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(22,163,74,.15)}
        .compat-cell.no{border:2px solid #f0f0f0;opacity:.4}

        .timeline-item{display:flex;gap:16px;position:relative}
        .timeline-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:4px}
        .timeline-line{position:absolute;left:5px;top:18px;bottom:-16px;width:2px}

        .contact-btn{display:flex;align-items:center;justify-content:center;gap:10px;padding:16px;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .3s;border:none;width:100%}
        .contact-btn:hover{transform:translateY(-2px)}

        .info-card{background:#fff;border-radius:20px;padding:28px;border:1px solid #f0f0f0;transition:all .3s}
        .info-card:hover{border-color:#FECACA}

        .stat-block{text-align:center;padding:16px;border-radius:14px;background:#FAFAFA;border:1px solid #f0f0f0}
      `}</style>

      <Navbar />

      <main style={{ paddingTop: 90, maxWidth: 1240, margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* Breadcrumb */}
        <div className={ok?"afu d1":""} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <button onClick={function(){ router.push("/donneurs"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1px solid #e5e5e5", background: "#fff", fontSize: 12, fontWeight: 600, color: "#666", cursor: "pointer", transition: "all .2s" }} onMouseEnter={function(e){e.currentTarget.style.borderColor="#FECACA";e.currentTarget.style.color="#DC2626";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="#e5e5e5";e.currentTarget.style.color="#666";}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Donneurs
          </button>
          <span style={{ fontSize: 12, color: "#ccc" }}>/</span>
          <span style={{ fontSize: 12, color: "#999" }}>{donneur.nom}</span>
        </div>

        {/* ═══ Header Profil ═══ */}
        <div className={"profile-header " + (ok ? "asi d1" : "")} style={{ background: "linear-gradient(135deg,#1a1a1a,#2d1a1a)", padding: 40, marginBottom: 24 }}>
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 32 }}>

            {/* Avatar géant */}
            <div style={{ position: "relative" }}>
              {donneur.disponible && <div style={{ position: "absolute", inset: -6, borderRadius: 28, border: "2px solid rgba(22,163,74,.3)", animation: "ringPulse 2.5s infinite" }}></div>}
              <div style={{
                width: 100, height: 100, borderRadius: 24,
                background: "linear-gradient(135deg, " + gc + "30, " + gc + "60)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: -1,
                boxShadow: "0 12px 40px rgba(0,0,0,.3)"
              }}>
                {initials}
              </div>
            </div>

            {/* Infos principales */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{donneur.nom}</h1>
                {donneur.disponible ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(22,163,74,.15)", border: "1px solid rgba(22,163,74,.25)" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", animation: "ringPulse 2s infinite" }}></div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#16A34A" }}>Disponible</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(217,119,6,.15)", border: "1px solid rgba(217,119,6,.25)" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#D97706" }}></div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#D97706" }}>Indisponible</span>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPinIcon size={14} color="rgba(255,255,255,.4)"/>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>{donneur.ville}, Maroc</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CalendarIcon size={14} color="rgba(255,255,255,.4)"/>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>{"Inscrit depuis 2024"}</span>
                </div>
              </div>
            </div>

            {/* Badge groupe sanguin */}
            <div style={{
              width: 100, height: 100, borderRadius: 24,
              background: "linear-gradient(135deg, " + gc + ", " + gc + "CC)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 32px " + gc + "40",
              animation: "glow 3s ease-in-out infinite"
            }}>
              <span className="mono" style={{ fontSize: 34, fontWeight: 800, color: "#fff" }}>{donneur.groupe_sanguin}</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,.7)", fontWeight: 600, letterSpacing: 1, marginTop: -2 }}>GROUPE</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 24 }}>

          {/* ═══ Colonne 1 : Informations personnelles ═══ */}
          <div className={"info-card " + (ok ? "afu d2" : "")}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserIcon size={16} color="#DC2626"/>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Informations</p>
            </div>

            {[
              { icon: PhoneIcon, label: "T\u00E9l\u00E9phone", value: donneur.telephone },
              { icon: MessageIcon, label: "Email", value: donneur.email },
              { icon: MapPinIcon, label: "Ville", value: donneur.ville + ", Maroc" },
              { icon: UserIcon, label: "\u00C2ge", value: donneur.age + " ans" },
              { icon: ShieldIcon, label: "Poids", value: donneur.poids + " kg" },
              { icon: CalendarIcon, label: "Dernier don", value: donneur.derniere_date_don }
            ].map(function(info, idx) {
              var Icon = info.icon;
              return (
                <div key={info.label} className={ok ? "asr d" + Math.min(idx + 3, 9) : ""} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: idx < 5 ? "1px solid #f5f5f5" : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={13} color="#bbb"/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 10, color: "#bbb", fontWeight: 600, letterSpacing: 0.3 }}>{info.label}</p>
                    <p className={info.label === "T\u00E9l\u00E9phone" ? "mono" : ""} style={{ fontSize: 13, fontWeight: 600, color: "#333", marginTop: 1 }}>{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═══ Colonne 2 : Stats + Compatibilité ═══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Stats rapides */}
            <div className={"info-card " + (ok ? "afu d3" : "")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HeartIcon size={16} color="#DC2626"/>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Statistiques</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="stat-block">
                  <p className="mono" style={{ fontSize: 28, fontWeight: 800, color: gc }}>{donneur.nb_dons}</p>
                  <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>Dons totaux</p>
                </div>
                <div className="stat-block">
                  <p className="mono" style={{ fontSize: 28, fontWeight: 800, color: "#16A34A" }}>{canGiveTo.length}</p>
                  <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>Groupes aid&eacute;s</p>
                </div>
                <div className="stat-block">
                  <p className="mono" style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B" }}>{donneur.poids}</p>
                  <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>Poids (kg)</p>
                </div>
                <div className="stat-block">
                  <p className="mono" style={{ fontSize: 28, fontWeight: 800, color: "#2563EB" }}>{donneur.age}</p>
                  <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{"\u00C2ge (ans)"}</p>
                </div>
              </div>
            </div>

            {/* Compatibilité sanguine */}
            <div className={"info-card " + (ok ? "afu d4" : "")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon size={14} color="#16A34A"/>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{"Peut donner \u00E0"}</p>
                  <p style={{ fontSize: 11, color: "#999" }}>{canGiveTo.length + " groupes compatibles sur 8"}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(function(g, idx) {
                  var isCompat = canGiveTo.indexOf(g) !== -1;
                  var gColor = groupeColors[g] || "#DC2626";
                  return (
                    <div key={g} className={"compat-cell " + (isCompat ? "yes" : "no") + " " + (ok ? "asi" : "")} style={{ animationDelay: (0.2 + idx * 0.04) + "s", background: isCompat ? gColor + "08" : "#FAFAFA" }}>
                      <BloodDrop size={16} color={isCompat ? gColor : "#ddd"}/>
                      <p className="mono" style={{ fontSize: 13, fontWeight: 800, color: isCompat ? gColor : "#ddd", marginTop: 4 }}>{g}</p>
                      {isCompat && <CheckIcon size={10} color="#16A34A"/>}
                    </div>
                  );
                })}
              </div>
              {/* Barre de compatibilité */}
              <div style={{ marginTop: 14 }}>
                <div style={{ height: 6, borderRadius: 6, background: "#f0f0f0", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 6, background: "linear-gradient(90deg, #16A34A, #22C55E)", width: (canGiveTo.length / 8 * 100) + "%", transition: "width 1.2s ease-out" }}></div>
                </div>
                <p style={{ fontSize: 10, color: "#999", marginTop: 4, textAlign: "right" }}>{Math.round(canGiveTo.length / 8 * 100) + "% de compatibilit\u00E9"}</p>
              </div>
            </div>
          </div>

          {/* ═══ Colonne 3 : Actions + Historique ═══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Boutons d'action */}
            <div className={"info-card " + (ok ? "afu d4" : "")}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 1, marginBottom: 16 }}>CONTACTER</p>

              <a href={"tel:" + donneur.telephone} style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
                <div className="contact-btn" style={{ background: donneur.disponible ? "linear-gradient(135deg,#DC2626,#991B1B)" : "#e5e5e5", color: donneur.disponible ? "#fff" : "#999", boxShadow: donneur.disponible ? "0 6px 24px rgba(220,38,38,.25)" : "none" }}>
                  <PhoneIcon size={18} color={donneur.disponible ? "#fff" : "#999"}/>
                  Appeler maintenant
                </div>
              </a>

              <a href={"sms:" + donneur.telephone + "?body=Vous%20%C3%AAtes%20un%20donneur%20compatible.%20Urgence%20m%C3%A9dicale%20Donnora.%20Merci%20de%20nous%20contacter."} style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
                <div className="contact-btn" style={{ background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" }}>
                  <MessageIcon size={18} color="#DC2626"/>
                  {"Envoyer un SMS d\u2019urgence"}
                </div>
              </a>

              <button onClick={handleSMS} className="contact-btn" style={{ background: "#fff", color: "#333", border: "1.5px solid #e5e5e5" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                {"Copier le num\u00E9ro"}
              </button>

              {smsSent && (
                <div className="asd" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0", marginTop: 10 }}>
                  <CheckIcon size={14} color="#16A34A"/>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16A34A" }}>{"Num\u00E9ro copi\u00E9 !"}</span>
                </div>
              )}
            </div>

            {/* Historique de dons */}
            <div className={"info-card " + (ok ? "afu d5" : "")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ClockIcon size={16} color="#DC2626"/>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Historique de dons</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {historiqueDons.map(function(don, idx) {
                  var isLast = idx === historiqueDons.length - 1;
                  return (
                    <div key={idx} className={"timeline-item " + (ok ? "asr d" + Math.min(idx + 5, 9) : "")}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                        <div className="timeline-dot" style={{ background: don.statut === "ok" ? "#16A34A" : "#F59E0B", boxShadow: "0 0 0 3px " + (don.statut === "ok" ? "rgba(22,163,74,.12)" : "rgba(245,158,11,.12)") }}></div>
                        {!isLast && <div className="timeline-line" style={{ background: don.statut === "ok" ? "#BBF7D0" : "#FDE68A" }}></div>}
                      </div>
                      <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{don.date}</p>
                          <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: don.statut === "ok" ? "#16A34A" : "#F59E0B", padding: "2px 8px", borderRadius: 6, background: don.statut === "ok" ? "#F0FDF4" : "#FFF7ED" }}>{don.volume}</span>
                        </div>
                        <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{don.lieu}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Bandeau RGPD ═══ */}
        <div className={ok ? "afi d8" : ""} style={{ padding: "14px 24px", background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 12 }}>
          <ShieldIcon size={16} color="#bbb"/>
          <p style={{ fontSize: 11, color: "#bbb" }}>{"Donn\u00E9es personnelles stock\u00E9es dans Firebase Firestore, chiffr\u00E9es et prot\u00E9g\u00E9es conform\u00E9ment au RGPD. Acc\u00E8s limit\u00E9 aux utilisateurs authentifi\u00E9s via Firebase Auth."}</p>
        </div>
      </main>
    </>
  );
}