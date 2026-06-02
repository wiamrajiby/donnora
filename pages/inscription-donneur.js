/* Donnora — inscription-donneur.js — S'inscrire comme Donneur de Sang */
/* Page PUBLIQUE — Pas de login requis — Les donneurs s'enregistrent ici */
/* Données vont dans Firebase Firestore collection 'donneurs' */
/* Placer dans pages/inscription-donneur.js */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

/* ── Icônes SVG ── */
function BloodDrop(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 10.5 5 15a7 7 0 0014 0c0-4.5-7-13-7-13z" fill={p.color||"#DC2626"}/></svg>);
}
function CheckIcon(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"#16A34A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function HeartIcon(p) {
  return (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill={p.color||"#DC2626"}/></svg>);
}
function ShieldIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
}
function PhoneIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>);
}
function MapPinIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);
}
function AlertIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
}

export default function InscriptionDonneur() {
  var router = useRouter();
  var _ok = useState(false), ok = _ok[0], setOk = _ok[1];
  var _step = useState(1), step = _step[0], setStep = _step[1];
  var _submitted = useState(false), submitted = _submitted[0], setSubmitted = _submitted[1];

  /* Formulaire */
  var _nom = useState(""), nom = _nom[0], setNom = _nom[1];
  var _prenom = useState(""), prenom = _prenom[0], setPrenom = _prenom[1];
  var _age = useState(""), age = _age[0], setAge = _age[1];
  var _poids = useState(""), poids = _poids[0], setPoids = _poids[1];
  var _groupe = useState(""), groupe = _groupe[0], setGroupe = _groupe[1];
  var _telephone = useState(""), telephone = _telephone[0], setTelephone = _telephone[1];
  var _ville = useState(""), ville = _ville[0], setVille = _ville[1];
  var _email = useState(""), email = _email[0], setEmail = _email[1];
  var _sante = useState(true), sante = _sante[0], setSante = _sante[1];
  var _cgu = useState(false), cgu = _cgu[0], setCgu = _cgu[1];

  useEffect(function() { setOk(true); }, []);

  var groupes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  var groupeColors = {
    "A+":"#2563EB","A-":"#3B82F6","B+":"#DC2626","B-":"#EF4444",
    "AB+":"#7C3AED","AB-":"#8B5CF6","O+":"#16A34A","O-":"#22C55E"
  };
  var villes = ["Casablanca","Rabat","Tanger","Marrakech","Fès","Agadir","Meknès"];

  function nextStep() {
    if (step < 4) setStep(step + 1);
  }
  function prevStep() {
    if (step > 1) setStep(step - 1);
  }
  function submitForm() {
    if (cgu && sante && nom && prenom && age && poids && groupe && telephone && ville && email) {
      setSubmitted(true);
      /* En prod : POST vers Firebase via API NestJS */
    }
  }

  var isStep1Valid = nom && prenom && age && poids && age >= 18 && poids >= 50;
  var isStep2Valid = groupe;
  var isStep3Valid = sante;
  var isStep4Valid = cgu && email && telephone && ville;

  return (
    <>
      <Head>
        <title>{"Donnora \u2014 S'inscrire comme donneur"}</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html,body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#FAFAFA;overflow-x:hidden}
        .fs{font-family:'Playfair Display',serif}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes checkDraw{from{stroke-dashoffset:24}to{stroke-dashoffset:0}}

        .afu{animation:fadeUp .5s ease-out both}
        .afi{animation:fadeIn .4s ease-out both}
        .asi{animation:scaleIn .5s ease-out both}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
        .d4{animation-delay:.4s}.d5{animation-delay:.5s}

        .input-field{width:100%;padding:12px 14px;border:1.5px solid #e5e5e5;border-radius:10px;font-size:13px;outline:none;color:#222;font-family:'DM Sans',sans-serif;transition:all .2s;background:#FAFAFA}
        .input-field:focus{border-color:#DC2626;background:#fff;box-shadow:0 0 0 3px rgba(220,38,38,.06)}

        .groupe-badge{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 14px;border-radius:14px;cursor:pointer;transition:all .25s;border:2px solid transparent}
        .groupe-badge:hover{border-color:rgba(220,38,38,.2)}
        .groupe-badge.selected{border-color:currentColor;background:rgba(220,38,38,.05)}

        .checkbox-item{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;border-radius:12px;border:1.5px solid #e5e5e5;cursor:pointer;transition:all .2s;background:#fff}
        .checkbox-item:hover{border-color:#FECACA;background:#FFFBFB}
        .checkbox-item.checked{border-color:#DC2626;background:#FEF2F2}

        .btn-next{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 32px;border-radius:12px;border:none;background:linear-gradient(135deg,#DC2626,#991B1B);color:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all .3s;box-shadow:0 4px 16px rgba(220,38,38,.2)}
        .btn-next:hover{transform:translateY(-2px)}
        .btn-next:disabled{opacity:.5;cursor:default}

        
      `}</style>

      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>

        {!submitted ? (
          <>
            {/* Header + Logo */}
            <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={function(){ router.push("/"); }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#DC2626,#991B1B)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BloodDrop size={20} color="#fff"/>
              </div>
              <span className="fs" style={{ fontSize: 22, fontWeight: 800, color: "#DC2626", letterSpacing: -0.5 }}>donnora</span>
            </div>

            <div style={{ maxWidth: 640, width: "100%" }} className={ok ? "afu" : ""}>

              {/* Étapes */}
              <div style={{ marginBottom: 40, width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>

                  {[
                    { n: 1, label: "Identité" },
                    { n: 2, label: "Groupe sanguin" },
                    { n: 3, label: "Santé" },
                    { n: 4, label: "Confirmation" }
                  ].map(function(item, idx) {
                    var isDone = item.n < step;
                    var isActive = item.n === step;
                    var isLast = item.n === 4;
                    var circleBg = isDone ? "#16A34A" : isActive ? "#DC2626" : "#e5e5e5";
                    var circleColor = (isDone || isActive) ? "#fff" : "#999";
                    var circleBoxShadow = isActive ? "0 0 0 6px rgba(220,38,38,.12)" : "none";
                    var labelColor = isActive ? "#DC2626" : isDone ? "#16A34A" : "#bbb";
                    var labelWeight = isActive ? "700" : "500";
                    var lineColor = isDone ? "#16A34A" : "#e5e5e5";

                    return (
                      <div key={item.n} style={{ display: "flex", flex: 1, alignItems: "flex-start" }}>

                        {/* Cercle + Label */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: circleBg, color: circleColor,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: "700", fontSize: 14,
                            boxShadow: circleBoxShadow,
                            transition: "all .3s",
                            flexShrink: 0
                          }}>
                            {isDone
                              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                              : item.n
                            }
                          </div>
                          <span style={{
                            fontSize: 11, fontWeight: labelWeight,
                            color: labelColor, whiteSpace: "nowrap",
                            textAlign: "center", display: "block"
                          }}>
                            {item.label}
                          </span>
                        </div>

                        {/* Ligne entre les cercles */}
                        {!isLast && (
                          <div style={{
                            flex: 1, height: 2,
                            background: lineColor,
                            marginTop: 17,
                            transition: "background .3s"
                          }}/>
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* ═══ Étape 1 : Identité ═══ */}
              {step === 1 && (
                <div className={ok ? "asi d1" : ""}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 8 }}>{"Votre identité"}</h2>
                  <p style={{ fontSize: 14, color: "#999", marginBottom: 28 }}>{"Nous avons besoin de quelques informations de base"}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Nom</label>
                      <input className="input-field" value={nom} onChange={function(e){ setNom(e.target.value); }} placeholder="Ben Ali"/>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Prénom</label>
                      <input className="input-field" value={prenom} onChange={function(e){ setPrenom(e.target.value); }} placeholder="Ahmed"/>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Âge</label>
                      <input className="input-field" type="number" value={age} onChange={function(e){ setAge(e.target.value); }} placeholder="30" min="18" max="65"/>
                      {age && age < 18 && <p style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{"Minimum 18 ans"}</p>}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Poids (kg)</label>
                      <input className="input-field" type="number" value={poids} onChange={function(e){ setPoids(e.target.value); }} placeholder="70" min="50" max="150"/>
                      {poids && poids < 50 && <p style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{"Minimum 50 kg"}</p>}
                    </div>
                  </div>

                  {isStep1Valid && (
                    <div style={{ padding: "12px 14px", background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0", display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                      <CheckIcon size={14} color="#16A34A"/>
                      <p style={{ fontSize: 12, color: "#16A34A", fontWeight: 600 }}>{"Conditions d'accès remplies"}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                    <button className="btn-next" style={{ background: "none", color: "#DC2626", border: "1.5px solid #FECACA", boxShadow: "none" }} onClick={function(){ router.push("/"); }}>
                      Annuler
                    </button>
                    <button className="btn-next" disabled={!isStep1Valid} onClick={nextStep}>
                      Continuer <ArrowRight size={14} color="#fff"/>
                    </button>
                  </div>
                </div>
              )}

              {/* ═══ Étape 2 : Groupe sanguin ═══ */}
              {step === 2 && (
                <div className={ok ? "asi d2" : ""}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 8 }}>{"Votre groupe sanguin"}</h2>
                  <p style={{ fontSize: 14, color: "#999", marginBottom: 28 }}>{"Sélectionnez votre groupe sanguin"}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
                    {groupes.map(function(g) {
                      var gc = groupeColors[g] || "#DC2626";
                      var sel = groupe === g;
                      return (
                        <div key={g} className={"groupe-badge " + (sel ? "selected" : "")} style={{ color: gc, borderColor: sel ? gc : "#e5e5e5", background: sel ? gc + "08" : "#fff" }} onClick={function(){ setGroupe(g); }}>
                          <BloodDrop size={20} color={gc}/>
                          <span className="mono" style={{ fontSize: 16, fontWeight: 800, color: gc }}>{g}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ padding: "16px 20px", background: "#FEF2F2", borderRadius: 12, border: "1px solid #FECACA", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 28 }}>
                    <AlertIcon size={14} color="#DC2626" style={{ marginTop: 2, flexShrink: 0 }}/>
                    <p style={{ fontSize: 12, color: "#DC2626" }}>
                      <strong>Important :</strong> {"Si vous n'êtes pas sûr de votre groupe sanguin, l'hôpital confirmera lors de votre premier don."}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <button className="btn-next" style={{ background: "none", color: "#DC2626", border: "1.5px solid #FECACA", boxShadow: "none" }} onClick={prevStep}>
                      Retour
                    </button>
                    <button className="btn-next" disabled={!isStep2Valid} onClick={nextStep}>
                      Continuer <ArrowRight size={14} color="#fff"/>
                    </button>
                  </div>
                </div>
              )}

              {/* ═══ Étape 3 : Santé ═══ */}
              {step === 3 && (
                <div className={ok ? "asi d3" : ""}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 8 }}>{"Questionnaire de santé"}</h2>
                  <p style={{ fontSize: 14, color: "#999", marginBottom: 28 }}>{"Vérification d'éligibilité basique"}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {[
                      { q: "Êtes-vous en bonne santé générale?", desc: "Sans maladie chronique ou infection actuelle" },
                      { q: "N'avez pas de maladie transfusionnelle?", desc: "VIH, Hépatite B/C, Syphilis" },
                      { q: "Vous êtes à jeun (sauf eau)?", desc: "Dernière prise de nourriture il y a >4h" },
                      { q: "Avez-vous donné du sang récemment?", desc: "Dernier don il y a >2 mois" }
                    ].map(function(item, idx) {
                      return (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <input type="checkbox" defaultChecked style={{ width: 18, height: 18, cursor: "pointer" }} onChange={function(e){ if (idx === 0) setSante(e.target.checked); }}/>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{item.q}</p>
                            <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ padding: "16px 20px", background: "#F0FDF4", borderRadius: 12, border: "1px solid #BBF7D0", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 28 }}>
                    <ShieldIcon size={14} color="#16A34A" style={{ marginTop: 2, flexShrink: 0 }}/>
                    <p style={{ fontSize: 12, color: "#16A34A" }}>
                      <strong>{"Confidentialité :"}</strong> {"Vos données de santé sont chiffrées et protégées selon les lois RGPD."}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <button className="btn-next" style={{ background: "none", color: "#DC2626", border: "1.5px solid #FECACA", boxShadow: "none" }} onClick={prevStep}>
                      Retour
                    </button>
                    <button className="btn-next" disabled={!isStep3Valid} onClick={nextStep}>
                      Continuer <ArrowRight size={14} color="#fff"/>
                    </button>
                  </div>
                </div>
              )}

              {/* ═══ Étape 4 : Confirmation ═══ */}
              {step === 4 && (
                <div className={ok ? "asi d4" : ""}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 8 }}>{"Finalisez votre inscription"}</h2>
                  <p style={{ fontSize: 14, color: "#999", marginBottom: 28 }}>{"Vérifiez vos coordonnées et confirmez"}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Email</label>
                      <input className="input-field" type="email" value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="ahmed@email.ma"/>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Téléphone</label>
                      <input className="input-field" value={telephone} onChange={function(e){ setTelephone(e.target.value); }} placeholder="+212 6 00 00 00 00"/>
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Ville</label>
                    <select className="input-field" value={ville} onChange={function(e){ setVille(e.target.value); }} style={{ cursor: "pointer" }}>
                      <option value="">Sélectionnez une ville</option>
                      {villes.map(function(v) { return <option key={v} value={v}>{v}</option>; })}
                    </select>
                  </div>

                  {/* CGU */}
                  <label className={"checkbox-item " + (cgu ? "checked" : "")} style={{ marginBottom: 28, cursor: "pointer" }}>
                    <input type="checkbox" checked={cgu} onChange={function(e){ setCgu(e.target.checked); }} style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0 }}/>
                    <span>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{"J'accepte les conditions d'utilisation"}</p>
                      <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{"J'accepte que mes données soient stockées dans Donnora et utilisées pour coordonner les dons de sang."}</p>
                    </span>
                  </label>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <button className="btn-next" style={{ background: "none", color: "#DC2626", border: "1.5px solid #FECACA", boxShadow: "none" }} onClick={prevStep}>
                      Retour
                    </button>
                    <button className="btn-next" disabled={!isStep4Valid} onClick={submitForm}>
                      {"S'inscrire"} <CheckIcon size={14} color="#fff"/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* ═══ Confirmation ═══ */
          <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }} className="afu">
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#16A34A,#15803D)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckIcon size={36} color="#fff"/>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>{"Inscription réussie !"}</h2>
            <p style={{ fontSize: 14, color: "#999", marginBottom: 32 }}>
              {"Merci " + prenom + " ! Vous êtes maintenant inscrit comme donneur de sang Donnora.\n\nVous recevrez bientôt les contacts des hôpitaux partenaires pour effectuer votre premier don."}
            </p>

            <div style={{ background: "#F0FDF4", borderRadius: 16, padding: 24, border: "1px solid #BBF7D0", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <HeartIcon size={18} color="#16A34A"/>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{"Récapitulatif de votre profil"}</p>
              </div>
              <div style={{ fontSize: 13, color: "#666", textAlign: "left" }}>
                <p><strong>Nom :</strong> {prenom + " " + nom}</p>
                <p style={{ marginTop: 6 }}><strong>{"Groupe sanguin :"}</strong> <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: groupeColors[groupe] }}>{groupe}</span></p>
                <p style={{ marginTop: 6 }}><strong>Ville :</strong> {ville}</p>
                <p style={{ marginTop: 6 }}><strong>Email :</strong> {email}</p>
              </div>
            </div>

            <button className="btn-next" onClick={function(){ router.push("/"); }}>
              Retour à l'accueil
            </button>
          </div>
        )}
      </main>
    </>
  );
}