/* Donnora — donneurs.js — Liste des Donneurs V2 Premium */
/* Toutes les améliorations : header gradient, avatars, tilt 3D, urgence, gros filtres */
/* Placer dans pages/donneurs.js */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";


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
function SearchIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
}
function PhoneIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>);
}
function MessageIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>);
}
function MapPinIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);
}
function CalendarIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function CloseIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
}
function AlertIcon(p) {
  return (<svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke={p.color||"#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
}
function AmbulanceIcon(p) {
  return (<svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 6h4l3 4v8h-3"/><circle cx="5.5" cy="18" r="2.5" fill="none"/><circle cx="18.5" cy="18" r="2.5" fill="none"/><path d="M6 9h4M8 7v4"/></svg>);
}

/* ── Compteur animé ── */
function AnimCounter(props) {
  var _v = useState(0), val = _v[0], setVal = _v[1];
  useEffect(function() {
    var target = props.to || 0;
    var dur = 1400;
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
  return <span>{val}</span>;
}

/* ── Carte donneur avec effet tilt 3D ── */
function DonorCard(props) {
  var d = props.donor;
  var gc = props.gc;
  var idx = props.idx;
  var ok = props.ok;
  var router = props.router;
  var cardRef = useRef(null);

  function handleMouseMove(e) {
    var card = cardRef.current;
    if (!card) return;
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var rotateX = ((y - centerY) / centerY) * -8;
    var rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.02)";
  }
  function handleMouseLeave() {
    var card = cardRef.current;
    if (card) card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
  }

  var initials = d.nom.split(" ").map(function(w){ return w[0]; }).join("").substring(0, 2);

  return (
    <div ref={cardRef} className={"donor-card " + (ok ? "asi" : "")} style={{ animationDelay: (0.05 * idx) + "s" }}
      onClick={function(){ router.push("/donneurs/" + d.id); }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

      {/* Glow pour disponibles */}
      {d.disponible && <div className="dispo-glow"></div>}

      {/* En-tête : avatar + nom + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className={d.disponible ? "avatar-ring" : ""} style={{
            width: 50, height: 50, borderRadius: 16, background: "linear-gradient(135deg, " + gc + "20, " + gc + "40)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 800, color: gc, letterSpacing: -0.5, flexShrink: 0
          }}>
            {initials}
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{d.nom}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
              <MapPinIcon size={11} color="#bbb"/>
              <span style={{ fontSize: 12, color: "#bbb" }}>{d.ville}</span>
            </div>
          </div>
        </div>
        <div className={d.disponible ? "groupe-badge-glow" : ""} style={{
          padding: "8px 14px", borderRadius: 12,
          background: "linear-gradient(135deg, " + gc + "15, " + gc + "25)",
          border: "1.5px solid " + gc + "35"
        }}>
          <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: gc }}>{d.groupe_sanguin}</span>
        </div>
      </div>

      {/* Infos */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PhoneIcon size={12} color="#999"/>
          </div>
          <span className="mono" style={{ fontSize: 12, color: "#555" }}>{d.telephone}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CalendarIcon size={12} color="#999"/>
          </div>
          <span style={{ fontSize: 12, color: "#555" }}>{"Dernier don : " + d.derniere_date_don}</span>
        </div>
      </div>

      {/* Barre de compatibilité */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#bbb" }}>{"COMPATIBILIT\u00C9"}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: gc }}>{d.compat} groupes</span>
        </div>
        <div style={{ height: 4, borderRadius: 4, background: "#f0f0f0", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, " + gc + ", " + gc + "80)", width: (d.compat / 8 * 100) + "%", transition: "width 1s ease-out" }}></div>
        </div>
      </div>

      {/* Statut + Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {d.disponible ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <div className="pulse-dot-green"></div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#16A34A" }}>Disponible</span>
          </div>
        ) : (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, background: "#FFF7ED", border: "1px solid #FDE68A" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D97706" }}></div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D97706" }}>Indisponible</span>
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <a href={"tel:" + d.telephone} onClick={function(e){ e.stopPropagation(); }} className="action-circle" style={{ background: d.disponible ? "linear-gradient(135deg,#DC2626,#B91C1C)" : "#e5e5e5", boxShadow: d.disponible ? "0 4px 12px rgba(220,38,38,.25)" : "none" }}>
            <PhoneIcon size={13} color={d.disponible ? "#fff" : "#999"}/>
          </a>
          <a href={"sms:" + d.telephone + "?body=Vous%20%C3%AAtes%20un%20donneur%20compatible.%20Urgence%20m%C3%A9dicale%20Donnora."} onClick={function(e){ e.stopPropagation(); }} className="action-circle" style={{ background: d.disponible ? "#FEF2F2" : "#f5f5f5", border: "1.5px solid " + (d.disponible ? "#FECACA" : "#e5e5e5") }}>
            <MessageIcon size={13} color={d.disponible ? "#DC2626" : "#ccc"}/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Donneurs() {
  var router = useRouter();
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _search = useState(""), search = _search[0], setSearch = _search[1];
  var _groupeFilter = useState("Tous"), groupeFilter = _groupeFilter[0], setGroupeFilter = _groupeFilter[1];
  var _villeFilter = useState("Toutes"), villeFilter = _villeFilter[0], setVilleFilter = _villeFilter[1];
  var _dispoFilter = useState("Tous"), dispoFilter = _dispoFilter[0], setDispoFilter = _dispoFilter[1];
  var _showSuggestions = useState(false), showSugg = _showSuggestions[0], setShowSugg = _showSuggestions[1];
  var _donneursReels = useState([]), donneursReels = _donneursReels[0], setDonneursReels = _donneursReels[1];
  var _loading = useState(true), loading = _loading[0], setLoading = _loading[1];

  useEffect(function() { setOk(true); }, []);

  /* Compatibilité : combien de groupes peuvent recevoir de ce donneur */
  var compatMap = { "O-":8, "O+":4, "A-":4, "A+":2, "B-":4, "B+":2, "AB-":4, "AB+":1 };

  var donneursFictifs = [
  { id:1, nom:"Ahmed Ben Ali", telephone:"+212 6 12 34 56 78", groupe_sanguin:"A+", ville:"Casablanca", disponible:true, derniere_date_don:"2026-01-15" },
  { id:2, nom:"Fatima Zohra", telephone:"+212 6 98 76 54 32", groupe_sanguin:"B-", ville:"Rabat", disponible:true, derniere_date_don:"2026-03-20" },
  { id:3, nom:"Youssef El Amrani", telephone:"+212 6 11 22 33 44", groupe_sanguin:"O-", ville:"Tanger", disponible:false, derniere_date_don:"2026-02-10" },
  { id:4, nom:"Khadija Bennani", telephone:"+212 6 55 66 77 88", groupe_sanguin:"A+", ville:"Marrakech", disponible:true, derniere_date_don:"2026-04-05" },
  { id:5, nom:"Omar Idrissi", telephone:"+212 6 43 21 87 65", groupe_sanguin:"O-", ville:"Casablanca", disponible:true, derniere_date_don:"2025-12-28" },
  { id:6, nom:"Nadia Tazi", telephone:"+212 6 77 88 99 00", groupe_sanguin:"O-", ville:"Tanger", disponible:true, derniere_date_don:"2026-02-14" },
  { id:7, nom:"Hassan El Fassi", telephone:"+212 6 22 33 44 55", groupe_sanguin:"B-", ville:"Casablanca", disponible:false, derniere_date_don:"2026-01-30" },
  { id:8, nom:"Amina Chakir", telephone:"+212 6 11 00 99 88", groupe_sanguin:"O+", ville:"Casablanca", disponible:true, derniere_date_don:"2026-03-12" },
  { id:9, nom:"Rachid Moussaoui", telephone:"+212 6 33 44 55 66", groupe_sanguin:"AB+", ville:"Rabat", disponible:true, derniere_date_don:"2026-04-18" },
  { id:10, nom:"Salma Berrada", telephone:"+212 6 66 55 44 33", groupe_sanguin:"B+", ville:"Marrakech", disponible:true, derniere_date_don:"2026-03-01" },
  { id:11, nom:"Mehdi Alaoui", telephone:"+212 6 99 88 77 66", groupe_sanguin:"A-", ville:"Tanger", disponible:false, derniere_date_don:"2025-11-20" },
  { id:12, nom:"Leila Mansour", telephone:"+212 6 44 33 22 11", groupe_sanguin:"AB-", ville:"Casablanca", disponible:true, derniere_date_don:"2026-04-22" },
  { id:13, nom:"Karim Hajji", telephone:"+212 6 88 77 66 55", groupe_sanguin:"O+", ville:"Rabat", disponible:true, derniere_date_don:"2026-02-28" },
  { id:14, nom:"Zineb El Ouardi", telephone:"+212 6 12 00 34 56", groupe_sanguin:"B+", ville:"F\u00E8s", disponible:true, derniere_date_don:"2026-01-10" },
  { id:15, nom:"Hamza Benjelloun", telephone:"+212 6 55 44 33 22", groupe_sanguin:"A+", ville:"Casablanca", disponible:false, derniere_date_don:"2026-03-15" },
  { id:16, nom:"Sara Chraibi", telephone:"+212 6 67 89 01 23", groupe_sanguin:"O-", ville:"F\u00E8s", disponible:true, derniere_date_don:"2026-04-10" }
];

var donneurs = (donneursReels.length > 0 ? donneursReels : donneursFictifs)
  .map(function(d) { d.compat = compatMap[d.groupe_sanguin] || 1; return d; });
  var groupeColors = {
    "A+":"#2563EB","A-":"#3B82F6","B+":"#DC2626","B-":"#EF4444",
    "AB+":"#7C3AED","AB-":"#8B5CF6","O+":"#16A34A","O-":"#22C55E"
  };

  var allGroupes = ["Tous","O-","O+","A-","A+","B-","B+","AB-","AB+"];
  var allVilles = ["Toutes","Casablanca","Rabat","Tanger","Marrakech","F\u00E8s"];

  var filtered = donneurs.filter(function(d) {
    var matchSearch = !search || d.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1 || d.telephone.indexOf(search) !== -1 || d.groupe_sanguin.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    var matchGroupe = groupeFilter === "Tous" || d.groupe_sanguin === groupeFilter;
    var matchVille = villeFilter === "Toutes" || d.ville === villeFilter;
    var matchDispo = dispoFilter === "Tous" || (dispoFilter === "Disponible" && d.disponible) || (dispoFilter === "Indisponible" && !d.disponible);
    return matchSearch && matchGroupe && matchVille && matchDispo;
  });

  var totalDispo = donneurs.filter(function(d) { return d.disponible; }).length;
  var hasFilters = groupeFilter !== "Tous" || villeFilter !== "Toutes" || dispoFilter !== "Tous" || search !== "";

  /* Suggestions de recherche */
  var suggestions = search.length >= 2 ? donneurs.filter(function(d) {
    return d.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }).slice(0, 5) : [];

  function resetFilters() { setSearch(""); setGroupeFilter("Tous"); setVilleFilter("Toutes"); setDispoFilter("Tous"); }

  /* Urgence simulée — patient B- en route */
  var urgence = { active: true, groupe: "B-", ambulance: "AMB-03", eta: "8 min" };

  return (
    <>
      <Head>
        <title>Donnora — Liste des donneurs</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#FAFAFA;overflow-x:hidden}
        .mono{font-family:'JetBrains Mono',monospace}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(22,163,74,.35)}70%{box-shadow:0 0 0 8px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}
        @keyframes glowBadge{0%,100%{box-shadow:0 0 8px rgba(220,38,38,.15)}50%{box-shadow:0 0 20px rgba(220,38,38,.3)}}
        @keyframes urgencePulse{0%,100%{opacity:1}50%{opacity:.85}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dropBounce{0%{transform:scale(0) translateY(-10px)}60%{transform:scale(1.1) translateY(0)}100%{transform:scale(1) translateY(0)}}

        .afu{animation:fadeUp .5s ease-out both}
        .afi{animation:fadeIn .4s ease-out both}
        .asi{animation:scaleIn .45s ease-out both}
        .asr{animation:slideRight .4s ease-out both}
        .asd{animation:slideDown .5s ease-out both}

        .pulse-dot-green{width:7px;height:7px;border-radius:50%;background:#16A34A;animation:ringPulse 2s infinite}

        .donor-card{background:#fff;border-radius:22px;padding:26px;border:1px solid #f0f0f0;cursor:pointer;position:relative;overflow:hidden;transition:box-shadow .4s,border-color .3s;will-change:transform}
        .donor-card:hover{box-shadow:0 20px 60px rgba(0,0,0,.08);border-color:#FECACA}
        .dispo-glow{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;border-radius:24px;border:2px solid transparent;background:linear-gradient(135deg,rgba(22,163,74,.1),rgba(22,163,74,.02)) border-box;pointer-events:none;opacity:.6}

        .avatar-ring{box-shadow:0 0 0 3px rgba(22,163,74,.15)}
        .groupe-badge-glow{animation:glowBadge 3s ease-in-out infinite}

        .action-circle{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all .2s}
        .action-circle:hover{transform:scale(1.12)}

        .blood-filter{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:all .3s;padding:10px 14px;border-radius:16px;border:2px solid transparent;min-width:64px}
        .blood-filter:hover{background:rgba(220,38,38,.03)}
        .blood-filter.active{border-color:currentColor;background:rgba(220,38,38,.04)}
        .blood-filter .drop-icon{transition:transform .3s}
        .blood-filter:hover .drop-icon{transform:scale(1.15)}
        .blood-filter.active .drop-icon{animation:dropBounce .4s ease-out}

        .ville-chip{display:inline-flex;align-items:center;gap:4px;padding:8px 18px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;border:1.5px solid transparent}
        .ville-chip.off{background:#fff;color:#666;border-color:#e5e5e5}
        .ville-chip.off:hover{border-color:#FECACA;color:#DC2626}
        .ville-chip.on{background:#DC2626;color:#fff;border-color:#DC2626}

        .search-suggest{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border-radius:14px;border:1px solid #f0f0f0;box-shadow:0 16px 48px rgba(0,0,0,.1);z-index:20;overflow:hidden}
        .suggest-item{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:background .15s}
        .suggest-item:hover{background:#FEF2F2}

        .urgence-bar{background:linear-gradient(135deg,#DC2626,#991B1B);border-radius:18px;padding:18px 28px;display:flex;align-items:center;gap:16px;animation:urgencePulse 3s ease-in-out infinite;position:relative;overflow:hidden}
        .urgence-bar::before{content:'';position:absolute;top:-50%;right:-10%;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none}

        .header-gradient{background:linear-gradient(135deg,#1a1a1a 0%,#2d1a1a 100%);border-radius:24px;padding:36px 40px;position:relative;overflow:hidden}
        .header-gradient::before{content:'';position:absolute;top:-40%;right:-10%;width:300px;height:300px;border-radius:50%;background:rgba(220,38,38,.08);pointer-events:none}
        .header-gradient::after{content:'';position:absolute;bottom:-30%;left:-5%;width:200px;height:200px;border-radius:50%;background:rgba(220,38,38,.05);pointer-events:none}
      `}</style>

      <Navbar />

      <main style={{ paddingTop: 90, maxWidth: 1240, margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* ═══ Bannière Urgence ═══ */}
        {urgence.active && (
          <div className="urgence-bar asd" style={{ marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AmbulanceIcon size={22} color="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{"Patient groupe " + urgence.groupe + " en route \u2014 Ambulance " + urgence.ambulance}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>{"Les donneurs compatibles (B- et O-) sont mis en \u00E9vidence ci-dessous"}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,.15)", padding: "8px 18px", borderRadius: 10, textAlign: "center", flexShrink: 0 }}>
              <p className="mono" style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{urgence.eta}</p>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: 0.5 }}>{"ARRIV\u00C9E"}</p>
            </div>
            <button onClick={function(){ router.push("/result"); }} style={{ background: "#fff", color: "#DC2626", padding: "10px 20px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, transition: "transform .2s" }} onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={function(e){e.currentTarget.style.transform="translateY(0)";}}>
              {"Voir r\u00E9sultat"} <ArrowRight size={12} color="#DC2626"/>
            </button>
          </div>
        )}

        {/* ═══ Header Gradient avec Stats ═══ */}
        <div className={"header-gradient " + (ok ? "afu" : "")} style={{ marginBottom: 24 }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.4)", letterSpacing: 1, marginBottom: 6 }}>{"FIREBASE FIRESTORE \u2014 API NESTJS"}</p>
                <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>Base de donneurs</h1>
              </div>
              <button onClick={function(){ router.push("/home"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", cursor: "pointer", transition: "all .2s" }} onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,.3)";e.currentTarget.style.color="#fff";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,.15)";e.currentTarget.style.color="rgba(255,255,255,.6)";}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Retour
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {[
                { label: "Total donneurs", value: donneurs.length, color: "#DC2626", icon: "users" },
                { label: "Disponibles", value: totalDispo, color: "#16A34A", icon: "check" },
                { label: "Indisponibles", value: donneurs.length - totalDispo, color: "#F59E0B", icon: "x" },
                { label: "R\u00E9sultats", value: filtered.length, color: "#3B82F6", icon: "filter" }
              ].map(function(s, idx) {
                return (
                  <div key={s.label} className={ok ? "asi" : ""} style={{ animationDelay: (0.1 + idx * 0.08) + "s", background: "rgba(255,255,255,.06)", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }}></div>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontWeight: 500 }}>{s.label}</span>
                    </div>
                    <p className="mono" style={{ fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                      <AnimCounter to={s.value} delay={300 + idx * 100}/>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ Filtres : Groupes sanguins en gouttes de sang ═══ */}
        <div className={ok?"afu":""}  style={{ animationDelay: ".2s", background: "#fff", borderRadius: 22, padding: "24px 28px", border: "1px solid #f0f0f0", marginBottom: 20 }}>

          {/* Recherche avec auto-suggestions */}
          <div style={{ position: "relative", marginBottom: 20 }}>
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 2 }}>
              <SearchIcon size={18} color="#bbb"/>
            </div>
            <input type="text" value={search}
              onChange={function(e){ setSearch(e.target.value); setShowSugg(true); }}
              onFocus={function(){ if(search.length >= 2) setShowSugg(true); }}
              onBlur={function(){ setTimeout(function(){ setShowSugg(false); }, 200); }}
              placeholder={"Rechercher un donneur par nom, t\u00E9l\u00E9phone ou groupe..."}
              style={{ width: "100%", padding: "14px 14px 14px 48px", border: "2px solid #f0f0f0", borderRadius: 14, fontSize: 14, outline: "none", color: "#222", transition: "border-color .2s", background: "#FAFAFA" }}
              onKeyUp={function(e){ if(e.target === document.activeElement) e.target.style.borderColor="#DC2626"; }}
            />
            {hasFilters && (
              <button onClick={resetFilters} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 8, border: "none", background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                <CloseIcon size={10} color="#DC2626"/> {"R\u00E9initialiser"}
              </button>
            )}

            {/* Auto-suggestions */}
            {showSugg && suggestions.length > 0 && (
              <div className="search-suggest asd">
                {suggestions.map(function(s) {
                  var gc = groupeColors[s.groupe_sanguin] || "#DC2626";
                  return (
                    <div key={s.id} className="suggest-item" onMouseDown={function(){ setSearch(s.nom); setShowSugg(false); }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: gc + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <BloodDrop size={14} color={gc}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{s.nom}</p>
                        <p style={{ fontSize: 11, color: "#999" }}>{s.ville}</p>
                      </div>
                      <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: gc }}>{s.groupe_sanguin}</span>
                      {s.disponible ? (
                        <div className="pulse-dot-green"></div>
                      ) : (
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#D97706" }}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filtres groupes sanguins — grosses gouttes */}
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 1, marginBottom: 10 }}>GROUPE SANGUIN</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {allGroupes.map(function(g) {
                var isOn = groupeFilter === g;
                var gc = groupeColors[g] || "#DC2626";
                if (g === "Tous") {
                  return (
                    <div key={g} className={"blood-filter" + (isOn ? " active" : "")} onClick={function(){ setGroupeFilter(g); }} style={{ borderColor: isOn ? "#DC2626" : "transparent", color: "#DC2626" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 12, background: isOn ? "#DC2626" : "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isOn ? "#fff" : "#DC2626"} strokeWidth="2.5"><circle cx="12" cy="12" r="10"/></svg>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: isOn ? "#DC2626" : "#999" }}>Tous</span>
                    </div>
                  );
                }
                var count = donneurs.filter(function(d){ return d.groupe_sanguin === g; }).length;
                return (
                  <div key={g} className={"blood-filter" + (isOn ? " active" : "")} onClick={function(){ setGroupeFilter(g); }} style={{ borderColor: isOn ? gc : "transparent", color: gc }}>
                    <div className="drop-icon">
                      <BloodDrop size={isOn ? 30 : 24} color={gc}/>
                    </div>
                    <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: isOn ? gc : "#555" }}>{g}</span>
                    <span style={{ fontSize: 10, color: "#bbb" }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ville + Disponibilité */}
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 1, marginBottom: 8 }}>VILLE</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {allVilles.map(function(v) {
                  var isOn = villeFilter === v;
                  return <button key={v} className={"ville-chip " + (isOn ? "on" : "off")} onClick={function(){ setVilleFilter(v); }}>{v}</button>;
                })}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 1, marginBottom: 8 }}>{"DISPONIBILIT\u00C9"}</p>
              <div style={{ display: "flex", gap: 6 }}>
                {["Tous", "Disponible", "Indisponible"].map(function(d) {
                  var isOn = dispoFilter === d;
                  return <button key={d} className={"ville-chip " + (isOn ? "on" : "off")} onClick={function(){ setDispoFilter(d); }}>{d}</button>;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Résultats ═══ */}
        {filtered.length === 0 ? (
          <div className="asi" style={{ background: "#fff", borderRadius: 22, padding: 60, border: "1px solid #f0f0f0", textAlign: "center" }}>
            <BloodDrop size={48} color="#e5e5e5"/>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#999", marginTop: 16, marginBottom: 6 }}>{"Aucun donneur trouv\u00E9"}</h3>
            <p style={{ fontSize: 13, color: "#ccc", marginBottom: 16 }}>{"Modifiez vos filtres ou votre recherche."}</p>
            <button onClick={resetFilters} style={{ padding: "10px 24px", borderRadius: 10, background: "linear-gradient(135deg,#DC2626,#B91C1C)", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(220,38,38,.2)" }}>{"R\u00E9initialiser"}</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {filtered.map(function(d, idx) {
              var gc = groupeColors[d.groupe_sanguin] || "#DC2626";
              return <DonorCard key={d.id} donor={d} gc={gc} idx={idx} ok={ok} router={router}/>;
            })}
          </div>
        )}

        {/* Compteur */}
        <div className={ok?"afi":""} style={{ animationDelay: ".6s", marginTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#bbb" }}>{filtered.length} donneur{filtered.length > 1 ? "s" : ""} {"affich\u00E9"}{filtered.length > 1 ? "s" : ""} sur {donneurs.length} {"enregistr\u00E9"}{donneurs.length > 1 ? "s" : ""} dans Firestore</p>
        </div>
      </main>
    </>
  );
}