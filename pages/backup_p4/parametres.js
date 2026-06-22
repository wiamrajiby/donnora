/* Donnora — parametres.js — Paramètres */
/* Page bien structurée : Profil, Ambulance, Hôpital, Notifications, Sécurité, Apparence */
/* Placer dans pages/parametres.js */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { deconnecter } from "../services/authService";

/* ── Icônes SVG ── */
function UserIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
}
function AmbulanceIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 6h4l3 4v8h-3"/><circle cx="5.5" cy="18" r="2.5" fill="none"/><circle cx="18.5" cy="18" r="2.5" fill="none"/><path d="M6 9h4M8 7v4"/></svg>);
}
function HospitalIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/></svg>);
}
function BellIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>);
}
function ShieldIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
}
function PaletteIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="1.5" fill={p.color||"currentColor"} stroke="none"/><circle cx="8.5" cy="13" r="1.5" fill={p.color||"currentColor"} stroke="none"/><circle cx="15.5" cy="13" r="1.5" fill={p.color||"currentColor"} stroke="none"/><circle cx="12" cy="17" r="1.5" fill={p.color||"currentColor"} stroke="none"/></svg>);
}
function LockIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);
}
function EyeIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
}
function CheckIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>);
}
function SaveIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>);
}
function LogoutIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
}
function EditIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
}

/* ── Toggle ── */
function Toggle(props) {
  return (
    <div onClick={props.onChange} style={{ width: 46, height: 26, borderRadius: 13, background: props.value ? "linear-gradient(135deg,#DC2626,#B91C1C)" : "#e0e0e0", padding: 3, cursor: "pointer", transition: "background .3s", flexShrink: 0, boxShadow: props.value ? "0 2px 8px rgba(220,38,38,.2)" : "none" }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,.15)", transition: "transform .3s", transform: props.value ? "translateX(20px)" : "translateX(0)" }}></div>
    </div>
  );
}

export default function Parametres() {
  var router = useRouter();
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _saved = useState(false), saved = _saved[0], setSaved = _saved[1];
  var _activeSection = useState("profil"), activeSection = _activeSection[0], setActiveSection = _activeSection[1];
  var _showPw = useState(false), showPw = _showPw[0], setShowPw = _showPw[1];

  /* Notifications */
  var _n1 = useState(true), n1 = _n1[0], sn1 = _n1[1];
  var _n2 = useState(true), n2 = _n2[0], sn2 = _n2[1];
  var _n3 = useState(true), n3 = _n3[0], sn3 = _n3[1];
  var _n4 = useState(false), n4 = _n4[0], sn4 = _n4[1];
  var _n5 = useState(true), n5 = _n5[0], sn5 = _n5[1];
  var _n6 = useState(false), n6 = _n6[0], sn6 = _n6[1];

  /* Apparence */
  var _lang = useState("fr"), lang = _lang[0], setLang = _lang[1];

  useEffect(function() { setOk(true); }, []);

  function handleSave() {
    setSaved(true);
    setTimeout(function() { setSaved(false); }, 3000);
  }
  async function handleDeconnexion() {
  await deconnecter();
  router.push("/");
}

  var sections = [
    { id: "profil", label: "Mon profil", Icon: UserIcon },
    { id: "ambulance", label: "Ambulance", Icon: AmbulanceIcon },
    { id: "hopital", label: "H\u00F4pital", Icon: HospitalIcon },
    { id: "notifications", label: "Notifications", Icon: BellIcon },
    { id: "securite", label: "S\u00E9curit\u00E9", Icon: LockIcon },
    { id: "apparence", label: "Apparence", Icon: PaletteIcon }
  ];

  return (
    <>
      <Head>
        <title>{"Donnora \u2014 Param\u00E8tres"}</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#FAFAFA;overflow-x:hidden}
        .mono{font-family:'JetBrains Mono',monospace}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}

        .afu{animation:fadeUp .5s ease-out both}
        .afi{animation:fadeIn .4s ease-out both}
        .asi{animation:scaleIn .4s ease-out both}
        .asd{animation:slideDown .4s ease-out both}
        .asr{animation:slideRight .4s ease-out both}
        .d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}
        .d4{animation-delay:.2s}.d5{animation-delay:.25s}

        .nav-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:500;color:#777;cursor:pointer;transition:all .2s;border:none;background:none;width:100%;text-align:left}
        .nav-item:hover{background:#FEF2F2;color:#DC2626}
        .nav-item.active{background:#DC2626;color:#fff;font-weight:700;box-shadow:0 4px 16px rgba(220,38,38,.2)}

        .settings-panel{background:#fff;border-radius:22px;padding:32px;border:1px solid #f0f0f0;min-height:500px}

        .field-group{margin-bottom:20px}
        .field-label{display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:6px;letter-spacing:.2px}
        .field-input{width:100%;padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:12px;font-size:14px;outline:none;color:#222;font-family:'DM Sans',sans-serif;transition:all .2s;background:#FAFAFA}
        .field-input:focus{border-color:#DC2626;background:#fff;box-shadow:0 0 0 3px rgba(220,38,38,.06)}
        .field-input.mono-input{font-family:'JetBrains Mono',monospace;font-size:13px}

        .setting-row{display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid #f5f5f5}
        .setting-row:last-child{border-bottom:none}

        .section-title{font-size:20px;font-weight:800;color:#111;margin-bottom:4px}
        .section-desc{font-size:13px;color:#999;margin-bottom:28px}

        .btn-primary{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border-radius:12px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all .3s}
        .btn-primary:hover{transform:translateY(-2px)}

        .btn-outline{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:12px;border:1.5px solid #e5e5e5;background:#fff;font-size:13px;font-weight:600;color:#555;cursor:pointer;transition:all .2s}
        .btn-outline:hover{border-color:#FECACA;color:#DC2626}

        .radio-option{display:flex;align-items:center;gap:10px;padding:14px 18px;border-radius:12px;border:1.5px solid #e5e5e5;cursor:pointer;transition:all .2s}
        .radio-option:hover{border-color:#FECACA}
        .radio-option.selected{border-color:#DC2626;background:#FEF2F2}

        .avatar-large{width:80px;height:80px;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;position:relative}
      `}</style>

      <Navbar />

      <main style={{ paddingTop: 90, maxWidth: 1240, margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* En-tête */}
        <div className={ok ? "afu d1" : ""} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111" }}>{"Param\u00E8tres"}</h1>
            <p style={{ fontSize: 14, color: "#999", marginTop: 4 }}>{"G\u00E9rez votre compte et la configuration de l\u2019application"}</p>
          </div>
          <button onClick={handleSave} className="btn-primary" style={{ background: saved ? "#16A34A" : "linear-gradient(135deg,#DC2626,#991B1B)", color: "#fff", boxShadow: saved ? "0 4px 16px rgba(22,163,74,.2)" : "0 4px 16px rgba(220,38,38,.2)" }}>
            {saved ? <CheckIcon size={16} color="#fff"/> : <SaveIcon size={16} color="#fff"/>}
            {saved ? "Enregistr\u00E9 !" : "Enregistrer"}
          </button>
        </div>

        {saved && (
          <div className="asd" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "#F0FDF4", borderRadius: 14, border: "1px solid #BBF7D0", marginBottom: 20 }}>
            <CheckIcon size={16} color="#16A34A"/>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#16A34A" }}>{"Tous les param\u00E8tres ont \u00E9t\u00E9 enregistr\u00E9s"}</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24 }}>

          {/* ═══ Sidebar Navigation ═══ */}
          <div className={ok ? "afu d2" : ""}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 12, border: "1px solid #f0f0f0", position: "sticky", top: 100 }}>
              {sections.map(function(s) {
                var Icon = s.Icon;
                var isActive = activeSection === s.id;
                return (
                  <button key={s.id} className={"nav-item" + (isActive ? " active" : "")} onClick={function(){ setActiveSection(s.id); }}>
                    <Icon size={18} color={isActive ? "#fff" : "#999"}/>
                    {s.label}
                  </button>
                );
              })}

              <div style={{ borderTop: "1px solid #f0f0f0", margin: "8px 0" }}></div>

              <button className="nav-item" onClick={handleDeconnexion} style={{ color: "#DC2626" }}>
                <LogoutIcon size={18} color="#DC2626"/>
                {"D\u00E9connexion"}
              </button>
            </div>
          </div>

          {/* ═══ Contenu principal ═══ */}
          <div className={"settings-panel " + (ok ? "asi d3" : "")}>

            {/* ── PROFIL ── */}
            {activeSection === "profil" && (
              <div className="asr">
                <h2 className="section-title">Mon profil</h2>
                <p className="section-desc">{"Informations de votre compte m\u00E9dical Donnora"}</p>

                {/* Avatar + nom */}
                <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32, padding: 24, background: "#FAFAFA", borderRadius: 18 }}>
                  <div className="avatar-large" style={{ background: "linear-gradient(135deg,#DC2626,#991B1B)", boxShadow: "0 8px 24px rgba(220,38,38,.2)" }}>
                    DR
                    <div style={{ position: "absolute", bottom: -4, right: -4, width: 28, height: 28, borderRadius: 10, background: "#fff", border: "2px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <EditIcon size={12} color="#DC2626"/>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>Dr. Personnel</p>
                    <p style={{ fontSize: 13, color: "#999", marginTop: 2 }}>{"M\u00E9decin urgentiste"}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A" }}></div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#16A34A" }}>{"Compte actif"}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="field-group">
                    <label className="field-label">Nom complet</label>
                    <input className="field-input" defaultValue="Dr. Personnel"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"Sp\u00E9cialit\u00E9"}</label>
                    <input className="field-input" defaultValue={"M\u00E9decin urgentiste"}/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Email</label>
                    <input className="field-input mono-input" defaultValue="medecin@hopital.ma"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"T\u00E9l\u00E9phone"}</label>
                    <input className="field-input mono-input" defaultValue="+212 6 00 00 00 00"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"R\u00F4le"}</label>
                    <select className="field-input" defaultValue="ambulancier" style={{ cursor: "pointer" }}>
                      <option value="ambulancier">Ambulancier</option>
                      <option value="medecin">{"M\u00E9decin"}</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"Matricule"}</label>
                    <input className="field-input mono-input" defaultValue="MED-2026-0042"/>
                  </div>
                </div>
              </div>
            )}

            {/* ── AMBULANCE ── */}
            {activeSection === "ambulance" && (
              <div className="asr">
                <h2 className="section-title">Ambulance</h2>
                <p className="section-desc">{"Configuration du v\u00E9hicule et du robot embarqu\u00E9"}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="field-group">
                    <label className="field-label">Identifiant ambulance</label>
                    <input className="field-input mono-input" defaultValue="AMB-03"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"Immatriculation"}</label>
                    <input className="field-input mono-input" defaultValue="12345-A-78"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"Mod\u00E8le du robot"}</label>
                    <input className="field-input" defaultValue="Donnora v1.0"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Carte embarqu&eacute;e</label>
                    <select className="field-input" defaultValue="rpi4" style={{ cursor: "pointer" }}>
                      <option value="rpi4">Raspberry Pi 4</option>
                      <option value="jetson">NVIDIA Jetson Nano</option>
                      <option value="orin">NVIDIA Jetson Orin</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"Connexion r\u00E9seau"}</label>
                    <select className="field-input" defaultValue="dual" style={{ cursor: "pointer" }}>
                      <option value="4g">4G</option>
                      <option value="5g">5G</option>
                      <option value="dual">Double SIM 4G/5G</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"Autonomie batterie"}</label>
                    <input className="field-input mono-input" defaultValue={"4 heures"}/>
                  </div>
                </div>

                <div style={{ marginTop: 8, padding: "16px 20px", background: "#F0FDF4", borderRadius: 12, border: "1px solid #BBF7D0", display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckIcon size={16} color="#16A34A"/>
                  <p style={{ fontSize: 13, color: "#16A34A", fontWeight: 600 }}>{"Robot connect\u00E9 \u2014 derni\u00E8re synchro il y a 2 minutes"}</p>
                </div>
              </div>
            )}

            {/* ── HÔPITAL ── */}
            {activeSection === "hopital" && (
              <div className="asr">
                <h2 className="section-title">{"H\u00F4pital de destination"}</h2>
                <p className="section-desc">{"L\u2019h\u00F4pital qui recevra les r\u00E9sultats du robot"}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="field-label">{"Nom de l\u2019h\u00F4pital"}</label>
                    <input className="field-input" defaultValue="CHU Ibn Rochd"/>
                  </div>
                  <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="field-label">Adresse</label>
                    <input className="field-input" defaultValue="Rue Tarik Ibn Ziad, Casablanca 20100"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Ville</label>
                    <select className="field-input" defaultValue="casablanca" style={{ cursor: "pointer" }}>
                      <option value="casablanca">Casablanca</option>
                      <option value="rabat">Rabat</option>
                      <option value="tanger">Tanger</option>
                      <option value="marrakech">Marrakech</option>
                      <option value="fes">{"F\u00E8s"}</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"T\u00E9l\u00E9phone"}</label>
                    <input className="field-input mono-input" defaultValue="+212 5 22 27 27 27"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Service</label>
                    <select className="field-input" defaultValue="urgences" style={{ cursor: "pointer" }}>
                      <option value="urgences">Urgences</option>
                      <option value="transfusion">{"Centre de transfusion"}</option>
                      <option value="reanimation">{"R\u00E9animation"}</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{"M\u00E9decin r\u00E9f\u00E9rent"}</label>
                    <input className="field-input" defaultValue="Dr. Alaoui"/>
                  </div>
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === "notifications" && (
              <div className="asr">
                <h2 className="section-title">Notifications</h2>
                <p className="section-desc">{"Choisissez les alertes que vous souhaitez recevoir"}</p>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 0.5, marginBottom: 12 }}>{"R\u00C9SULTATS"}</p>
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{"Nouveau r\u00E9sultat re\u00E7u"}</p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"Quand le robot envoie un groupe sanguin d\u00E9tect\u00E9"}</p>
                    </div>
                    <Toggle value={n1} onChange={function(){ sn1(!n1); }}/>
                  </div>
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{"Confiance IA faible"}</p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"Quand la confiance est inf\u00E9rieure \u00E0 90%"}</p>
                    </div>
                    <Toggle value={n2} onChange={function(){ sn2(!n2); }}/>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 0.5, marginBottom: 12 }}>DONNEURS</p>
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{"Donneur contact\u00E9"}</p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"Quand un donneur r\u00E9pond \u00E0 l\u2019appel"}</p>
                    </div>
                    <Toggle value={n3} onChange={function(){ sn3(!n3); }}/>
                  </div>
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{"Nouveau donneur inscrit"}</p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"Quand un nouveau donneur s\u2019ajoute \u00E0 la base"}</p>
                    </div>
                    <Toggle value={n4} onChange={function(){ sn4(!n4); }}/>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", letterSpacing: 0.5, marginBottom: 12 }}>{"G\u00C9N\u00C9RAL"}</p>
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{"Alerte sonore"}</p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"Jouer un son quand une alerte arrive"}</p>
                    </div>
                    <Toggle value={n5} onChange={function(){ sn5(!n5); }}/>
                  </div>
                  <div className="setting-row">
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{"Notifications par email"}</p>
                      <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{"Recevoir un r\u00E9sum\u00E9 quotidien par email"}</p>
                    </div>
                    <Toggle value={n6} onChange={function(){ sn6(!n6); }}/>
                  </div>
                </div>
              </div>
            )}

            {/* ── SÉCURITÉ ── */}
            {activeSection === "securite" && (
              <div className="asr">
                <h2 className="section-title">{"S\u00E9curit\u00E9"}</h2>
                <p className="section-desc">{"Mot de passe et param\u00E8tres de s\u00E9curit\u00E9 du compte"}</p>

                <div style={{ padding: 24, background: "#FAFAFA", borderRadius: 16, marginBottom: 24 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 16 }}>Changer le mot de passe</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="field-group" style={{ marginBottom: 0 }}>
                      <label className="field-label">Mot de passe actuel</label>
                      <div style={{ position: "relative" }}>
                        <input className="field-input" type={showPw ? "text" : "password"} placeholder="••••••••"/>
                        <button onClick={function(){ setShowPw(!showPw); }} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                          <EyeIcon size={16} color="#bbb"/>
                        </button>
                      </div>
                    </div>
                    <div className="field-group" style={{ marginBottom: 0 }}>
                      <label className="field-label">Nouveau mot de passe</label>
                      <input className="field-input" type="password" placeholder="Minimum 8 caract\u00E8res"/>
                    </div>
                    <div className="field-group" style={{ marginBottom: 0 }}>
                      <label className="field-label">Confirmer le mot de passe</label>
                      <input className="field-input" type="password" placeholder={"R\u00E9p\u00E9tez le nouveau mot de passe"}/>
                    </div>
                    <button className="btn-outline" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                      <LockIcon size={14} color="#DC2626"/>
                      <span style={{ color: "#DC2626" }}>Mettre \u00E0 jour</span>
                    </button>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 16 }}>{"Sessions actives"}</p>
                  {[
                    { appareil: "Chrome \u2014 Windows", lieu: "Casablanca, Maroc", actif: true, heure: "Maintenant" },
                    { appareil: "Safari \u2014 iPhone", lieu: "Casablanca, Maroc", actif: false, heure: "Il y a 3 heures" }
                  ].map(function(s, idx) {
                    return (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: idx === 0 ? "1px solid #f5f5f5" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.actif ? "#16A34A" : "#e5e5e5" }}></div>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{s.appareil}</p>
                            <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{s.lieu + " \u2014 " + s.heure}</p>
                          </div>
                        </div>
                        {!s.actif && (
                          <button className="btn-outline" style={{ padding: "6px 14px", fontSize: 11 }}>
                            {"R\u00E9voquer"}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── APPARENCE ── */}
            {activeSection === "apparence" && (
              <div className="asr">
                <h2 className="section-title">Apparence</h2>
                <p className="section-desc">{"Personnalisez l\u2019interface de l\u2019application"}</p>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 14 }}>Langue</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {[
                      { id: "fr", label: "Fran\u00E7ais", flag: "FR" },
                      { id: "ar", label: "Arabe", flag: "AR" },
                      { id: "en", label: "Anglais", flag: "EN" }
                    ].map(function(l) {
                      var sel = lang === l.id;
                      return (
                        <div key={l.id} className={"radio-option" + (sel ? " selected" : "")} onClick={function(){ setLang(l.id); }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, border: "2px solid " + (sel ? "#DC2626" : "#ddd"), display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {sel && <div style={{ width: 10, height: 10, borderRadius: 5, background: "#DC2626" }}></div>}
                          </div>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{l.label}</p>
                            <p style={{ fontSize: 11, color: "#bbb" }}>{l.flag}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 14 }}>{"Taille du texte"}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {["Petit", "Normal", "Grand"].map(function(t) {
                      var sel = t === "Normal";
                      return (
                        <div key={t} className={"radio-option" + (sel ? " selected" : "")} style={{ justifyContent: "center" }}>
                          <span style={{ fontSize: t === "Petit" ? 12 : t === "Normal" ? 14 : 16, fontWeight: 600, color: sel ? "#DC2626" : "#666" }}>{t}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 14 }}>{"Couleur d\u2019accent"}</p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { color: "#DC2626", label: "Donnora Rouge" },
                      { color: "#2563EB", label: "Bleu" },
                      { color: "#16A34A", label: "Vert" },
                      { color: "#7C3AED", label: "Violet" }
                    ].map(function(c) {
                      var sel = c.color === "#DC2626";
                      return (
                        <div key={c.color} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 12, background: c.color,
                            boxShadow: sel ? "0 0 0 3px " + c.color + "30" : "none",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            {sel && <CheckIcon size={16} color="#fff"/>}
                          </div>
                          <span style={{ fontSize: 10, color: sel ? c.color : "#999", fontWeight: sel ? 700 : 500 }}>{c.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}