/* Donnora — historique.js — Historique des Détections Reçues */
/* Résultats reçus des robots via Firebase Realtime Database */
/* Placer dans pages/historique.js */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { getHistorique } from "../services/resultatsService";

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
function ClockIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
}
function CheckIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>);
}
function AmbulanceIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 6h4l3 4v8h-3"/><circle cx="5.5" cy="18" r="2.5" fill="none"/><circle cx="18.5" cy="18" r="2.5" fill="none"/><path d="M6 9h4M8 7v4"/></svg>);
}
function HospitalIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/></svg>);
}
function SearchIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function ActivityIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
}
function UsersIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
}

/* ── Compteur animé ── */
function AnimCounter(props) {
  var _v = useState(0), val = _v[0], setVal = _v[1];
  useEffect(function() {
    var target = props.to;
    var dur = 1200;
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

export default function Historique() {
  var router = useRouter();
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _filter = useState("Tous"), filter = _filter[0], setFilter = _filter[1];
  var _search = useState(""), search = _search[0], setSearch = _search[1];
  var _detReelles = useState([]), detReelles = _detReelles[0], setDetReelles = _detReelles[1];
  var _loading = useState(true), loading = _loading[0], setLoading = _loading[1];

  useEffect(function() {
  setOk(true);
  getHistorique().then(function(result) {
    if (result.succes && result.resultats.length > 0) {
      setDetReelles(result.resultats);
    }
    setLoading(false);
  });
}, []);

  var groupeColors = {
    "A+":"#2563EB","A-":"#3B82F6","B+":"#DC2626","B-":"#EF4444",
    "AB+":"#7C3AED","AB-":"#8B5CF6","O+":"#16A34A","O-":"#22C55E"
  };

  /* Historique des détections reçues via Firebase */
  var detectionsFictives = [
  { id:"R-001", groupe:"B-", confiance:97.5, date:"12/05/2026", heure:"14:30", ambulance:"AMB-03", hopital:"CHU Casablanca", patient:"PAT-042", statut:"transmis", donneurs_trouves:12 },
  { id:"R-002", groupe:"O+", confiance:98.1, date:"12/05/2026", heure:"11:15", ambulance:"AMB-07", hopital:"CHU Rabat", patient:"PAT-041", statut:"transmis", donneurs_trouves:18 },
  { id:"R-003", groupe:"A+", confiance:96.3, date:"11/05/2026", heure:"22:48", ambulance:"AMB-03", hopital:"CHU Casablanca", patient:"PAT-040", statut:"transmis", donneurs_trouves:8 },
  { id:"R-004", groupe:"AB-", confiance:91.2, date:"11/05/2026", heure:"16:30", ambulance:"AMB-12", hopital:"CHU Tanger", patient:"PAT-039", statut:"transmis", donneurs_trouves:4 },
  { id:"R-005", groupe:"O-", confiance:99.1, date:"10/05/2026", heure:"09:05", ambulance:"AMB-07", hopital:"CHU Rabat", patient:"PAT-038", statut:"transmis", donneurs_trouves:22 },
  { id:"R-006", groupe:"B+", confiance:95.8, date:"10/05/2026", heure:"03:22", ambulance:"AMB-03", hopital:"CHU Casablanca", patient:"PAT-037", statut:"transmis", donneurs_trouves:10 },
  { id:"R-007", groupe:"A-", confiance:93.4, date:"09/05/2026", heure:"19:10", ambulance:"AMB-12", hopital:"CHU Tanger", patient:"PAT-036", statut:"transmis", donneurs_trouves:6 },
  { id:"R-008", groupe:"O+", confiance:97.9, date:"09/05/2026", heure:"14:45", ambulance:"AMB-03", hopital:"CHU Casablanca", patient:"PAT-035", statut:"transmis", donneurs_trouves:18 },
  { id:"R-009", groupe:"AB+", confiance:88.5, date:"08/05/2026", heure:"20:30", ambulance:"AMB-07", hopital:"CHU Rabat", patient:"PAT-034", statut:"faible_confiance", donneurs_trouves:2 },
  { id:"R-010", groupe:"B-", confiance:96.7, date:"08/05/2026", heure:"08:15", ambulance:"AMB-12", hopital:"CHU Tanger", patient:"PAT-033", statut:"transmis", donneurs_trouves:12 }
];

var detections = detReelles.length > 0 ? detReelles.map(function(r) {
  return {
    id: r.id || "R-???",
    groupe: r.groupe_sanguin_detecte || r.groupe,
    confiance: r.confiance,
    date: r.date || new Date(r.timestamp).toLocaleDateString("fr-FR"),
    heure: r.heure || new Date(r.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    ambulance: r.ambulance_id,
    hopital: r.hopital,
    patient: r.patient_id,
    statut: r.statut,
    donneurs_trouves: r.donneurs_trouves || 0
  };
}) : detectionsFictives;

  var filtered = detections.filter(function(d) {
    var matchFilter = filter === "Tous" || d.groupe === filter;
    var matchSearch = !search || d.id.toLowerCase().indexOf(search.toLowerCase()) !== -1 || d.ambulance.toLowerCase().indexOf(search.toLowerCase()) !== -1 || d.patient.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    return matchFilter && matchSearch;
  });

  var totalDonneurs = detections.reduce(function(a, b) { return a + b.donneurs_trouves; }, 0);
  var avgConfiance = Math.round(detections.reduce(function(a, b) { return a + b.confiance; }, 0) / detections.length * 10) / 10;

  return (
    <>
      <Head>
        <title>{"Donnora \u2014 Historique des d\u00E9tections"}</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#FAFAFA;overflow-x:hidden}
        .mono{font-family:'JetBrains Mono',monospace}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ecgLine{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}

        .afu{animation:fadeUp .5s ease-out both}
        .afi{animation:fadeIn .4s ease-out both}
        .asi{animation:scaleIn .4s ease-out both}
        .asr{animation:slideRight .4s ease-out both}

        .ecg-anim{stroke-dasharray:600;animation:ecgLine 4s linear infinite}

        .header-dark{background:linear-gradient(135deg,#1a1a1a,#2d1a1a);border-radius:24px;padding:36px 40px;position:relative;overflow:hidden}
        .header-dark::before{content:'';position:absolute;top:-40%;right:-8%;width:280px;height:280px;border-radius:50%;background:rgba(220,38,38,.07);pointer-events:none}

        .filter-chip{display:inline-flex;align-items:center;gap:4px;padding:7px 14px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;border:1.5px solid transparent}
        .filter-chip.off{background:#fff;color:#666;border-color:#e5e5e5}
        .filter-chip.off:hover{border-color:#FECACA;color:#DC2626}
        .filter-chip.on{background:#DC2626;color:#fff;border-color:#DC2626}

        .detection-row{display:flex;align-items:center;gap:16px;padding:18px 24px;border-radius:16px;background:#fff;border:1px solid #f0f0f0;transition:all .25s;cursor:pointer}
        .detection-row:hover{border-color:#FECACA;transform:translateX(4px);box-shadow:0 8px 32px rgba(0,0,0,.04)}
      `}</style>

      <Navbar />

      <main style={{ paddingTop: 90, maxWidth: 1240, margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* ═══ Header ═══ */}
        <div className={"header-dark " + (ok ? "afu" : "")} style={{ marginBottom: 24 }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)", letterSpacing: 1, marginBottom: 6 }}>{"FIREBASE REALTIME DATABASE \u2014 COLLECTION RESULTATS"}</p>
                <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>{"Historique des d\u00E9tections"}</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", marginTop: 4 }}>{"R\u00E9sultats re\u00E7us des robots embarqu\u00E9s via Firebase"}</p>
              </div>
              <button onClick={function(){ router.push("/home"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", cursor: "pointer", transition: "all .2s" }} onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,.3)";e.currentTarget.style.color="#fff";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,.15)";e.currentTarget.style.color="rgba(255,255,255,.6)";}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Retour
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {[
                { icon: ActivityIcon, label: "D\u00E9tections totales", value: detections.length, color: "#DC2626" },
                { icon: UsersIcon, label: "Donneurs contact\u00E9s", value: totalDonneurs, color: "#16A34A" },
                { icon: ClockIcon, label: "Confiance moyenne", value: avgConfiance, suffix: "%", color: "#F59E0B" },
                { icon: HospitalIcon, label: "H\u00F4pitaux alert\u00E9s", value: 3, color: "#2563EB" }
              ].map(function(s, idx) {
                var Icon = s.icon;
                return (
                  <div key={s.label} className={ok ? "asi" : ""} style={{ animationDelay: (0.1 + idx * 0.08) + "s", background: "rgba(255,255,255,.06)", borderRadius: 16, padding: "18px 20px", border: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: s.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={14} color={s.color}/>
                      </div>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>{s.label}</span>
                    </div>
                    <p className="mono" style={{ fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                      <AnimCounter to={s.value} suffix={s.suffix} delay={200 + idx * 100}/>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ECG */}
            <div style={{ marginTop: 20, opacity: 0.08 }}>
              <svg width="100%" height="20" viewBox="0 0 600 20" preserveAspectRatio="none">
                <path className="ecg-anim" d="M0 10 L120 10 L135 2 L150 18 L165 2 L180 18 L195 10 L350 10 L365 4 L380 16 L395 4 L410 16 L425 10 L600 10" fill="none" stroke="#DC2626" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ Filtres ═══ */}
        <div className={ok ? "afu" : ""} style={{ animationDelay: ".15s", background: "#fff", borderRadius: 18, padding: "18px 24px", border: "1px solid #f0f0f0", marginBottom: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <SearchIcon size={15} color="#bbb"/>
            </div>
            <input type="text" value={search} onChange={function(e){ setSearch(e.target.value); }} placeholder={"Rechercher par ID, ambulance, patient..."} style={{ width: "100%", padding: "10px 14px 10px 40px", border: "1.5px solid #f0f0f0", borderRadius: 10, fontSize: 13, outline: "none", color: "#222", background: "#FAFAFA" }} onFocus={function(e){e.target.style.borderColor="#DC2626";}} onBlur={function(e){e.target.style.borderColor="#f0f0f0";}}/>
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["Tous","A+","A-","B+","B-","AB+","AB-","O+","O-"].map(function(g) {
              var isOn = filter === g;
              return (
                <button key={g} className={"filter-chip " + (isOn ? "on" : "off")} onClick={function(){ setFilter(g); }}>
                  {g !== "Tous" && <BloodDrop size={10} color={isOn ? "#fff" : groupeColors[g]}/>}
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ Liste des détections ═══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* En-tête */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 24px" }}>
            <p style={{ width: 70, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5 }}>ID</p>
            <p style={{ width: 60, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>GROUPE</p>
            <p style={{ width: 70, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>CONFIANCE</p>
            <p style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5 }}>DATE / HEURE</p>
            <p style={{ flex: 0.8, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5 }}>AMBULANCE</p>
            <p style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5 }}>{"H\u00D4PITAL"}</p>
            <p style={{ width: 70, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>DONNEURS</p>
            <p style={{ width: 80, fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 0.5, textAlign: "center" }}>STATUT</p>
          </div>

          {filtered.length === 0 ? (
            <div className="asi" style={{ background: "#fff", borderRadius: 18, padding: 48, border: "1px solid #f0f0f0", textAlign: "center" }}>
              <ActivityIcon size={36} color="#e5e5e5"/>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#ccc", marginTop: 12 }}>{"Aucune d\u00E9tection trouv\u00E9e"}</p>
            </div>
          ) : filtered.map(function(d, idx) {
            var gc = groupeColors[d.groupe] || "#DC2626";
            var confColor = d.confiance >= 95 ? "#16A34A" : d.confiance >= 90 ? "#F59E0B" : "#DC2626";
            return (
              <div key={d.id} className={"detection-row " + (ok ? "asr" : "")} style={{ animationDelay: (0.05 * idx) + "s" }} onClick={function(){ router.push("/result"); }}>
                <p className="mono" style={{ width: 70, fontSize: 12, fontWeight: 600, color: "#999" }}>{d.id}</p>
                <div style={{ width: 60, textAlign: "center" }}>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 800, padding: "5px 10px", borderRadius: 8, background: gc + "12", color: gc }}>{d.groupe}</span>
                </div>
                <div style={{ width: 70, textAlign: "center" }}>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: confColor }}>{d.confiance}%</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{d.date}</p>
                  <p className="mono" style={{ fontSize: 11, color: "#bbb" }}>{d.heure}</p>
                </div>
                <div style={{ flex: 0.8, display: "flex", alignItems: "center", gap: 6 }}>
                  <AmbulanceIcon size={13} color="#999"/>
                  <span className="mono" style={{ fontSize: 12, color: "#666" }}>{d.ambulance}</span>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                  <HospitalIcon size={13} color="#999"/>
                  <span style={{ fontSize: 12, color: "#666" }}>{d.hopital}</span>
                </div>
                <div style={{ width: 70, textAlign: "center" }}>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#2563EB" }}>{d.donneurs_trouves}</span>
                </div>
                <div style={{ width: 80, textAlign: "center" }}>
                  {d.statut === "transmis" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 6, background: "#F0FDF4", border: "1px solid #BBF7D0", fontSize: 10, fontWeight: 600, color: "#16A34A" }}>
                      <CheckIcon size={9} color="#16A34A"/> OK
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 6, background: "#FFF7ED", border: "1px solid #FDE68A", fontSize: 10, fontWeight: 600, color: "#D97706" }}>
                      Faible
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={ok ? "afi" : ""} style={{ animationDelay: ".5s", marginTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#bbb" }}>{filtered.length} {"d\u00E9tection"}{filtered.length > 1 ? "s" : ""} {"affich\u00E9e"}{filtered.length > 1 ? "s" : ""} {"sur " + detections.length + " enregistr\u00E9es dans Firebase"}</p>
        </div>
      </main>
    </>
  );
}