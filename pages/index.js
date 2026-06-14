/* Copiez TOUT ce contenu dans votre fichier pages/index.js */
/* Donnora — Landing Page Premium — Design inspiré LifeLinkAI */
/* Pas d'emojis, icônes SVG uniquement, cercles décoratifs roses, professionnel */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { connecter } from "../services/authService";

/* ── Composants Icônes SVG ── */
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
function ShieldIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>);
}
function BoltIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill={p.color||"#DC2626"}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>);
}
function BrainIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5.5 5.5 0 004 7.5c0 1.58.67 3 1.74 4L12 16l6.26-4.5A5.49 5.49 0 0020 7.5 5.5 5.5 0 0014.5 2c-1.62 0-3.06.7-4.06 1.8A5.48 5.48 0 009.5 2z"/><circle cx="12" cy="12" r="2.5" fill={p.color||"#DC2626"} opacity="0.25"/><path d="M12 16v6M9 22h6"/></svg>);
}
function WifiIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={p.color||"#DC2626"}/></svg>);
}
function UsersIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
}
function HospitalIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/></svg>);
}
function TargetIcon(p) {
  return (<svg width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke={p.color||"#DC2626"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill={p.color||"#DC2626"}/></svg>);
}
function ArrowRight(p) {
  return (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
}
function SendIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>);
}

function DecoCircle(p) {
  return (<div style={{ position:"absolute", width:p.size, height:p.size, borderRadius:"50%", background:"radial-gradient(circle, rgba(220,38,38,0.07), rgba(220,38,38,0.02) 60%, transparent 80%)", top:p.top, left:p.left, right:p.right, bottom:p.bottom, opacity:p.opacity||1, pointerEvents:"none" }}/>);
}

function DecoBloodSVG(p) {
  return (<div style={{ position:"absolute", pointerEvents:"none", ...p.style }}><svg width="44" height="58" viewBox="0 0 44 58" fill="none"><path d="M22 4C22 4 4 24 4 36a18 18 0 0036 0c0-12-18-32-18-32z" fill="rgba(220,38,38,0.05)" stroke="rgba(220,38,38,0.1)" strokeWidth="1.2"/></svg></div>);
}

export default function Accueil() {
  var r = useRouter();
  var _c = useState(false), connecte = _c[0], setConnecte = _c[1];
  var _l = useState(false), showLogin = _l[0], setShowLogin = _l[1];
  var _e = useState(""), email = _e[0], setEmail = _e[1];
  var _p = useState(""), pw = _p[0], setPw = _p[1];
  var _s = useState(0), sy = _s[0], setSy = _s[1];
  var _m = useState(false), ok = _m[0], setOk = _m[1];
  var _v = useState({}), visible = _v[0], setVisible = _v[1];
  var _a = useState("accueil"), activeNav = _a[0], setActiveNav = _a[1];
  var _ls = useState("idle"), loginState = _ls[0], setLoginState = _ls[1];
  /* loginState: "idle" | "loading" | "success" */

  useEffect(function() {
    setOk(true);
    function f() { setSy(window.scrollY); }
    window.addEventListener("scroll", f);

    /* IntersectionObserver pour détecter les sections visibles */
    var ids = ["accueil","services","temoignages","comment-ca-marche","contact"];
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setVisible(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[entry.target.id] = true; return n; });
          setActiveNav(entry.target.id);
        }
      });
    }, { threshold: 0.2 });
    ids.forEach(function(id) { var el = document.getElementById(id); if (el) observer.observe(el); });

    return function() { window.removeEventListener("scroll", f); observer.disconnect(); };
  }, []);

  async function doLogin() {
  if (!email || !pw) return;
  setLoginState("loading");
  const result = await connecter(email, pw);
  if (result.succes) {
    setLoginState("success");
    setConnecte(true);
    setTimeout(function() {
      setShowLogin(false);
      setLoginState("idle");
      r.push("/home");
    }, 2200);
  } else {
    setLoginState("idle");
    alert(result.erreur);
  }
}
  function doLogout() { setConnecte(false); setEmail(""); setPw(""); }

  return (
    <>
      <Head>
        <title>Donnora — Le bon sang, au bon moment</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;background:#fff;overflow-x:hidden}
        .fs{font-family:'Playfair Display',serif}
        @keyframes fu{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        .au{animation:fu .7s ease-out both}
        .ai{animation:fi .5s ease-out both}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
        .d4{animation-delay:.4s}.d5{animation-delay:.5s}
        .bp{background:linear-gradient(135deg,#DC2626,#B91C1C);color:#fff;border:none;border-radius:11px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(220,38,38,.25);transition:transform .2s}
        .bp:hover{transform:translateY(-2px)}
        .bo{background:#fff;color:#333;border:1.5px solid #ddd;border-radius:11px;font-weight:600;cursor:pointer;transition:all .2s}
        .bo:hover{border-color:#DC2626;color:#DC2626}
        .sec-title{opacity:0;transform:translateY(24px);transition:opacity .7s ease-out,transform .7s ease-out,color .5s}
        .sec-title.vis{opacity:1;transform:translateY(0);color:#DC2626}
        .nav-link{font-size:14px;font-weight:500;text-decoration:none;transition:color .2s}
        .nav-link.active{color:#DC2626 !important;font-weight:700}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes checkDraw{from{stroke-dashoffset:24}to{stroke-dashoffset:0}}
        @keyframes scalePop{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
        @keyframes progressBar{from{width:0%}to{width:100%}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .login-spinner{width:40px;height:40px;border:4px solid #FEE2E2;border-top:4px solid #DC2626;border-radius:50%;animation:spin .8s linear infinite}
        .check-circle{animation:scalePop .5s ease-out both}
        .check-path{stroke-dasharray:24;stroke-dashoffset:24;animation:checkDraw .4s ease-out .4s forwards}
        .welcome-text{animation:fadeSlideUp .5s ease-out .6s both}
        .progress-track{width:100%;height:4px;background:#FEE2E2;border-radius:4px;overflow:hidden;margin-top:20px}
        .progress-fill{height:100%;background:linear-gradient(90deg,#DC2626,#EF4444);border-radius:4px;animation:progressBar 2s ease-out forwards}
      `}</style>

      <div>
        {/* NAVIGATION */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 48px",background:sy>60?"rgba(255,255,255,.92)":"transparent",backdropFilter:sy>60?"blur(16px)":"none",boxShadow:sy>60?"0 1px 20px rgba(0,0,0,.06)":"none",borderBottom:sy>60?"1px solid rgba(0,0,0,.04)":"1px solid transparent",transition:"all .35s"}}>
          <div style={{maxWidth:1180,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={function(){window.scrollTo({top:0,behavior:"smooth"});}}>
              <div style={{width:38,height:38,background:"linear-gradient(135deg,#DC2626,#991B1B)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><BloodDrop size={18} color="#fff"/></div>
              <span style={{fontSize:22,fontWeight:800,color:"#DC2626",letterSpacing:"-.3px"}}>donnora</span>
            </div>
            <div style={{display:"flex",gap:36}}>
              {[{label:"Accueil",id:"accueil"},{label:"Services",id:"services"},{label:"T\u00E9moignages",id:"temoignages"},{label:"Comment \u00E7a marche",id:"comment-ca-marche"},{label:"Contact",id:"contact"}].map(function(t){return <a key={t.id} href={"#"+t.id} className={"nav-link"+(activeNav===t.id?" active":"")} style={{color:activeNav===t.id?"#DC2626":"#555"}} onMouseEnter={function(e){e.target.style.color="#DC2626";}} onMouseLeave={function(e){if(activeNav!==t.id)e.target.style.color="#555";}}>{t.label}</a>;})}
            </div>
            <div style={{display:"flex",gap:10}}>
              {connecte?(<><button onClick={function(){r.push("/home");}} className="bp" style={{padding:"10px 24px",fontSize:13}}>Tableau de bord</button><button onClick={doLogout} className="bo" style={{padding:"10px 18px",fontSize:13}}>D&eacute;connexion</button></>):(<button onClick={function(){setShowLogin(true);}} className="bp" style={{padding:"10px 28px",fontSize:13}}>Connexion</button>)}
            </div>
          </div>
        </nav>

        {/* CONNEXION — Modal avec animation */}
        {showLogin&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
          <div className="au" style={{background:"#fff",borderRadius:20,padding:44,width:"100%",maxWidth:420,boxShadow:"0 30px 80px rgba(0,0,0,.15)",minHeight:loginState==="idle"?"auto":320,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

            {/* État 1 : Formulaire */}
            {loginState==="idle"&&(<>
              <div style={{textAlign:"center",marginBottom:28,width:"100%"}}>
                <div style={{width:56,height:56,background:"linear-gradient(135deg,#DC2626,#991B1B)",borderRadius:"50%",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center"}}><BloodDrop size={24} color="#fff"/></div>
                <h2 style={{fontSize:24,fontWeight:800,color:"#111"}}>Bienvenue</h2>
                <p style={{color:"#888",fontSize:14,marginTop:4}}>{"Acc\u00E8s r\u00E9serv\u00E9 au personnel m\u00E9dical"}</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:14,width:"100%"}}>
                <div><label style={{display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:5}}>Email professionnel</label><input type="email" value={email} onChange={function(e){setEmail(e.target.value);}} placeholder="medecin@hopital.ma" style={{width:"100%",padding:"13px 14px",border:"1.5px solid #e0e0e0",borderRadius:10,fontSize:14,outline:"none",color:"#222"}} onFocus={function(e){e.target.style.borderColor="#DC2626";}} onBlur={function(e){e.target.style.borderColor="#e0e0e0";}}/></div>
                <div><label style={{display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:5}}>Mot de passe</label><input type="password" value={pw} onChange={function(e){setPw(e.target.value);}} placeholder="••••••••" style={{width:"100%",padding:"13px 14px",border:"1.5px solid #e0e0e0",borderRadius:10,fontSize:14,outline:"none",color:"#222"}} onFocus={function(e){e.target.style.borderColor="#DC2626";}} onBlur={function(e){e.target.style.borderColor="#e0e0e0";}}/></div>
                <button onClick={doLogin} className="bp" style={{width:"100%",padding:"14px",fontSize:15,marginTop:6}}>Se connecter</button>
                <button onClick={function(){setShowLogin(false);}} style={{background:"none",border:"none",color:"#999",cursor:"pointer",fontSize:13,padding:6}}>Annuler</button>
              </div>
            </>)}

            {/* État 2 : Chargement */}
            {loginState==="loading"&&(<div style={{textAlign:"center"}}>
              <div className="login-spinner" style={{margin:"0 auto 24px"}}></div>
              <p style={{fontSize:16,fontWeight:600,color:"#444"}}>{"V\u00E9rification en cours..."}</p>
              <p style={{fontSize:13,color:"#999",marginTop:6}}>Connexion au serveur Donnora</p>
            </div>)}

            {/* État 3 : Succès + animation */}
            {loginState==="success"&&(<div style={{textAlign:"center",width:"100%"}}>
              <div className="check-circle" style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#DC2626,#991B1B)",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(220,38,38,.3)"}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path className="check-path" d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 className="welcome-text" style={{fontSize:24,fontWeight:800,color:"#111",marginBottom:6}}>{"Connexion r\u00E9ussie !"}</h2>
              <p className="welcome-text" style={{fontSize:14,color:"#888",marginBottom:4}}>{"Bienvenue sur Donnora,"}</p>
              <p className="welcome-text" style={{fontSize:15,fontWeight:700,color:"#DC2626",marginBottom:0}}>{email}</p>
              <div className="progress-track"><div className="progress-fill"></div></div>
              <p className="welcome-text" style={{fontSize:12,color:"#bbb",marginTop:10}}>{"Redirection vers le tableau de bord..."}</p>
            </div>)}

          </div>
        </div>)}

        {/* HERO */}
        <section id="accueil" style={{position:"relative",paddingTop:130,paddingBottom:80,minHeight:"100vh",overflow:"hidden",background:"linear-gradient(180deg,#fff 0%,#FFF5F5 50%,#fff 100%)"}}>
          <DecoCircle size={500} top={-100} right={-100}/>
          <DecoCircle size={300} bottom={-80} left={-60} opacity={0.6}/>
          <DecoCircle size={180} top={200} right={300} opacity={0.4}/>
          <DecoBloodSVG style={{top:120,right:80}}/>
          <DecoBloodSVG style={{bottom:60,right:200}}/>

          <div style={{maxWidth:1180,margin:"0 auto",padding:"0 48px",display:"flex",alignItems:"center",gap:60,position:"relative",zIndex:2}}>
            <div style={{flex:1}}>
              <div className={ok?"au d1":""} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#FEF2F2",padding:"8px 18px",borderRadius:100,marginBottom:20,border:"1px solid rgba(220,38,38,.1)"}}>
                <BloodDrop size={14} color="#DC2626"/>
                <span style={{color:"#DC2626",fontSize:13,fontWeight:600}}>{"Des connexions qui sauvent des vies"}</span>
              </div>
              <h1 className={ok?"au d2":""} style={{fontSize:54,fontWeight:800,color:"#111",lineHeight:1.1,marginBottom:6}}>
                LE BON SANG,<br/><span style={{color:"#DC2626"}}>AU BON ENDROIT,<br/>AU BON MOMENT.</span>
              </h1>
              <svg width="180" height="20" viewBox="0 0 180 20" fill="none" style={{marginBottom:20}}><path d="M0 10h50l8-8 8 16 8-16 8 8h98" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p className={ok?"au d3":""} style={{fontSize:16,color:"#666",lineHeight:1.75,marginBottom:32,maxWidth:440}}>{"Notre plateforme d\u2019analyse sanguine permet aux h\u00F4pitaux de sauver des vies en identifiant les groupes sanguins en ambulance \u2014 avant l\u2019arriv\u00E9e du patient."}</p>
              <div className={ok?"au d4":""} style={{display:"flex",gap:14,marginBottom:48}}>
                {!connecte?(<button onClick={function(){r.push("/inscription-donneur");}} className="bp" style={{display:"flex",alignItems:"center",gap:8,padding:"14px 30px",fontSize:14}}><HeartIcon size={16} color="#fff"/>Devenir donneur</button>):(<button onClick={function(){r.push("/home");}} className="bp" style={{display:"flex",alignItems:"center",gap:8,padding:"14px 30px",fontSize:14}}>{"Tableau de bord "}<ArrowRight size={14} color="#fff"/></button>)}
                <button className="bo" style={{padding:"14px 28px",fontSize:14}} onClick={function(){var el=document.getElementById("comment-ca-marche");if(el)el.scrollIntoView({behavior:"smooth"});}}>En savoir plus</button>
              </div>
              <div className={ok?"au d5":""} style={{display:"flex",gap:28}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><BloodDrop size={16} color="#DC2626"/><span style={{fontSize:13,color:"#777"}}><strong style={{color:"#222"}}>10 000+</strong> dons</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><UsersIcon size={16} color="#DC2626"/><span style={{fontSize:13,color:"#777"}}><strong style={{color:"#222"}}>5 000+</strong> {"vies sauv\u00E9es"}</span></div>
              </div>
            </div>
            {/* Illustration Hero */}
            <div style={{flex:1,display:"flex",justifyContent:"center",position:"relative"}} className={ok?"au d3":""}>
              <div style={{width:440,height:400,position:"relative"}}>
                <DecoCircle size={350} top={20} left={40} opacity={0.5}/>
                <svg width="400" height="360" viewBox="0 0 400 360" fill="none" style={{position:"relative",zIndex:2}}>
                  <rect x="120" y="60" width="160" height="200" rx="20" fill="#FEE2E2" stroke="#FECACA" strokeWidth="2"/>
                  <rect x="140" y="80" width="120" height="160" rx="12" fill="#FEF2F2"/>
                  <rect x="140" y="140" width="120" height="100" rx="0" fill="#DC2626" opacity="0.15"/>
                  <rect x="140" y="180" width="120" height="60" rx="0" fill="#DC2626" opacity="0.3"/>
                  <rect x="180" y="30" width="40" height="40" rx="4" fill="#E5E7EB"/><rect x="190" y="10" width="20" height="30" rx="4" fill="#D1D5DB"/>
                  <rect x="188" y="130" width="24" height="8" rx="2" fill="#DC2626"/><rect x="196" y="122" width="8" height="24" rx="2" fill="#DC2626"/>
                  <g transform="translate(290,70)"><path d="M40 15C40 6.72 33.28 0 25 0c-5 0-9.4 2.5-12 6.3A15 15 0 000 15c0 16 25 35 25 35s25-19 25-35z" fill="#DC2626" opacity="0.8"/></g>
                  <ellipse cx="200" cy="280" rx="40" ry="10" fill="rgba(220,38,38,.06)"/>
                  <path d="M200 264c0 0-8 10-8 16a8 8 0 0016 0c0-6-8-16-8-16z" fill="#DC2626" opacity="0.4"/>
                  <line x1="280" y1="160" x2="340" y2="120" stroke="#FECACA" strokeWidth="1.5" strokeDasharray="4 4"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{padding:"100px 48px",background:"linear-gradient(180deg,#fff 0%,#FFF5F5 100%)",position:"relative"}}>
          <DecoCircle size={200} top={-50} right={100} opacity={0.4}/><DecoBloodSVG style={{bottom:40,right:40}}/>
          <div style={{maxWidth:1180,margin:"0 auto",position:"relative",zIndex:2}}>
            <span style={{color:"#DC2626",fontSize:13,fontWeight:700,letterSpacing:1}}>{"R\u00C9VOLUTIONNER LE DON DE SANG"}</span>
            <h2 className={"sec-title"+(visible["services"]?" vis":"")} style={{fontSize:38,fontWeight:800,marginBottom:8,marginTop:4}}>{"R\u00E9volutionner le "}<span style={{color:"#DC2626"}}>Don de Sang</span></h2>
            <p style={{fontSize:15,color:"#888",marginBottom:48,maxWidth:520}}>{"Notre plateforme num\u00E9rique connecte les donneurs aux patients dans le besoin gr\u00E2ce \u00E0 une technologie innovante."}</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
              {[{I:BrainIcon,t:"Assistance IA par Chatbot",d:"Obtenez des r\u00E9ponses imm\u00E9diates \u00E0 toutes vos questions sur le don de sang gr\u00E2ce \u00E0 notre chatbot intelligent aliment\u00E9 par le Machine Learning.",bg:"#FFF5F5",c:"#DC2626"},{I:HospitalIcon,t:"Trouver l\u2019h\u00F4pital le plus proche",d:"Localisez les centres de don de sang les plus proches de chez vous pour rendre le don rapide et pratique.",bg:"#DC2626",c:"#fff",dk:true},{I:TargetIcon,t:"Pr\u00E9diction de retour des donneurs",d:"Les h\u00F4pitaux peuvent pr\u00E9voir la probabilit\u00E9 de retour des donneurs gr\u00E2ce \u00E0 notre mod\u00E8le d\u2019analyse pr\u00E9dictive bas\u00E9 sur XGBoost.",bg:"#FFF5F5",c:"#DC2626"}].map(function(s){var Icon=s.I;return(<div key={s.t} style={{background:s.bg,borderRadius:20,padding:32,transition:"transform .3s,box-shadow .3s",cursor:"pointer",overflow:"hidden"}} onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.08)";}} onMouseLeave={function(e){e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:48,height:48,borderRadius:14,background:s.dk?"rgba(255,255,255,.15)":"rgba(220,38,38,.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Icon size={24} color={s.c}/></div>
                <h3 style={{fontSize:18,fontWeight:700,color:s.dk?"#fff":"#111",marginBottom:8}}>{s.t}</h3>
                <p style={{fontSize:13.5,color:s.dk?"rgba(255,255,255,.75)":"#888",lineHeight:1.7}}>{s.d}</p>
                <div style={{marginTop:20,display:"flex",alignItems:"center",gap:6}}><ArrowRight size={14} color={s.dk?"#fff":"#DC2626"}/><span style={{fontSize:13,fontWeight:600,color:s.dk?"#fff":"#DC2626"}}>En savoir plus</span></div>
              </div>);})}
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section id="temoignages" style={{padding:"100px 48px",background:"linear-gradient(135deg,#1a1a1a 0%,#2d1a1a 100%)",position:"relative",overflow:"hidden"}}>
          <DecoCircle size={300} top={-100} right={-50} opacity={0.3}/>
          <div style={{maxWidth:1180,margin:"0 auto",position:"relative",zIndex:2}}>
            <div style={{display:"inline-block",background:"#DC2626",padding:"6px 16px",borderRadius:8,marginBottom:16}}><span style={{color:"#fff",fontSize:12,fontWeight:700,letterSpacing:1}}>{"T\u00C9MOIGNAGES"}</span></div>
            <h2 className={"sec-title"+(visible["temoignages"]?" vis":"")} style={{fontSize:38,fontWeight:800,color:visible["temoignages"]?"#DC2626":"#fff",marginBottom:8}}>{"La confiance des "}<span style={{color:"#DC2626"}}>{"Professionnels de Sant\u00E9"}</span></h2>
            <p style={{fontSize:15,color:"rgba(255,255,255,.5)",marginBottom:48,maxWidth:520}}>{"D\u00E9couvrez les t\u00E9moignages r\u00E9els d\u2019h\u00F4pitaux, de donneurs et de patients qui font confiance \u00E0 Donnora."}</p>
            <div style={{background:"rgba(255,255,255,.05)",borderRadius:24,padding:48,border:"1px solid rgba(255,255,255,.08)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:20,marginBottom:24}}>
                <div style={{width:48,height:48,borderRadius:"50%",background:"#DC2626",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18,color:"#fff",fontWeight:800}}>66</div>
                <p style={{fontSize:17,color:"rgba(255,255,255,.85)",lineHeight:1.8,fontStyle:"italic"}}>{"«\u00A0En tant que donneuse, je me sens enfin connect\u00E9e et utile. Je re\u00E7ois des alertes en temps r\u00E9el quand mon groupe sanguin est recherch\u00E9. L\u2019exp\u00E9rience est fluide, respectueuse et enrichissante.\u00A0»"}</p>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div><div style={{display:"flex",gap:3,marginBottom:6}}>{[1,2,3,4,5].map(function(i){return <div key={i} style={{width:14,height:14,borderRadius:3,background:"#DC2626"}}></div>;})}</div><p style={{fontSize:15,fontWeight:700,color:"#fff"}}>Leila Mansour</p><p style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{"Donneuse r\u00E9guli\u00E8re"}</p></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><HeartIcon size={16} color="#DC2626"/><span style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>{"12 dons cette ann\u00E9e"}</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section id="comment-ca-marche" style={{padding:"100px 48px",background:"#fff",position:"relative"}}>
          <DecoCircle size={250} bottom={-80} right={-60} opacity={0.3}/>
          <div style={{maxWidth:1180,margin:"0 auto",position:"relative",zIndex:2}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <h2 className={"sec-title"+(visible["comment-ca-marche"]?" vis":"")} style={{fontSize:36,fontWeight:800,marginBottom:8}}>{"Comment \u00E7a marche"}</h2>
              <p style={{fontSize:15,color:"#888"}}>{"Nous rendons le don de sang plus simple et plus intelligent \u2014 pour les donneurs comme pour les h\u00F4pitaux."}</p>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:48}}>
              <div style={{display:"flex",alignItems:"center",gap:8,background:"#FEF2F2",padding:"10px 22px",borderRadius:10,border:"1.5px solid #FECACA",cursor:"pointer"}}><HospitalIcon size={16} color="#DC2626"/><span style={{fontSize:13,fontWeight:700,color:"#DC2626"}}>{"Pour les h\u00F4pitaux"}</span></div>
              <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",padding:"10px 22px",borderRadius:10,border:"1.5px solid #e0e0e0",cursor:"pointer"}}><HeartIcon size={16} color="#999"/><span style={{fontSize:13,fontWeight:600,color:"#999"}}>Pour les donneurs</span></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              {[{I:WifiIcon,t:"Rejoindre le r\u00E9seau",d:"Les h\u00F4pitaux se connectent facilement \u00E0 notre plateforme pour g\u00E9rer et acc\u00E9der \u00E0 leurs propres listes de donneurs."},{I:UsersIcon,t:"Gestion intelligente des donneurs",d:"Ajoutez de nouveaux donneurs via une interface intuitive. Envoyez des rappels, des alertes et g\u00E9rez vos campagnes de don."},{I:BrainIcon,t:"Analyses bas\u00E9es sur l\u2019IA",d:"Utilisez nos outils d\u2019IA pour pr\u00E9dire la probabilit\u00E9 de don, optimiser la sensibilisation et garantir des r\u00E9ponses rapides."},{I:ShieldIcon,t:"Support 24h/24 et 7j/7",d:"Les h\u00F4pitaux peuvent contacter notre \u00E9quipe \u00E0 tout moment pour r\u00E9soudre des probl\u00E8mes ou sugg\u00E9rer des am\u00E9liorations."}].map(function(item){var Icon=item.I;return(<div key={item.t} style={{display:"flex",gap:16,padding:24,borderRadius:16,border:"1px solid #f0f0f0",transition:"all .3s",cursor:"pointer"}} onMouseEnter={function(e){e.currentTarget.style.borderColor="#FECACA";e.currentTarget.style.background="#FFFBFB";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="#f0f0f0";e.currentTarget.style.background="transparent";}}>
                <div style={{width:44,height:44,borderRadius:12,background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={20} color="#DC2626"/></div>
                <div><h3 style={{fontSize:16,fontWeight:700,color:"#111",marginBottom:6}}>{item.t}</h3><p style={{fontSize:13.5,color:"#888",lineHeight:1.7}}>{item.d}</p></div>
              </div>);})}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{padding:"100px 48px",background:"linear-gradient(180deg,#FFF5F5 0%,#fff 100%)",position:"relative"}}>
          <DecoCircle size={280} top={40} right={100} opacity={0.4}/>
          <div style={{maxWidth:900,margin:"0 auto",position:"relative",zIndex:2}}>
            <h2 className={"sec-title"+(visible["contact"]?" vis":"")} style={{fontSize:36,fontWeight:800,marginBottom:4}}>{"Contactez-"}<span style={{color:"#DC2626"}}>nous</span></h2>
            <p style={{fontSize:15,color:"#888",marginBottom:40}}>{"Partagez vos id\u00E9es et collaborons ensemble pour sauver des vies."}</p>
            <div style={{display:"flex",gap:40}}>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:16}}>
                <div><label style={{display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:5}}>Nom complet</label><input type="text" placeholder="Votre nom" style={{width:"100%",padding:"13px 14px",border:"1.5px solid #e0e0e0",borderRadius:10,fontSize:14,outline:"none",color:"#222"}}/></div>
                <div><label style={{display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:5}}>Adresse email</label><input type="email" placeholder="email@exemple.com" style={{width:"100%",padding:"13px 14px",border:"1.5px solid #e0e0e0",borderRadius:10,fontSize:14,outline:"none",color:"#222"}}/></div>
                <div><label style={{display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:5}}>Ville</label><select style={{width:"100%",padding:"13px 14px",border:"1.5px solid #e0e0e0",borderRadius:10,fontSize:14,outline:"none",color:"#222",background:"#fff"}}><option>{"Choisir votre ville"}</option><option>Casablanca</option><option>Rabat</option><option>Tanger</option><option>Marrakech</option><option>{"F\u00E8s"}</option></select></div>
                <div><label style={{display:"block",fontSize:13,fontWeight:600,color:"#444",marginBottom:5}}>Message</label><textarea rows="4" placeholder="Dites-nous comment nous pouvons vous aider..." style={{width:"100%",padding:"13px 14px",border:"1.5px solid #e0e0e0",borderRadius:10,fontSize:14,outline:"none",resize:"vertical",color:"#222"}}></textarea></div>
                <button className="bp" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"14px",fontSize:15}}><SendIcon size={16} color="#fff"/>Envoyer le message</button>
              </div>
              <div style={{flex:.7,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{position:"relative"}}><DecoCircle size={250} top={-40} left={-40} opacity={0.6}/><svg width="240" height="200" viewBox="0 0 240 200" fill="none" style={{position:"relative",zIndex:2}}><rect x="20" y="40" width="200" height="130" rx="16" fill="#FEE2E2" stroke="#FECACA" strokeWidth="1.5"/><path d="M20 60L120 120L220 60" stroke="#DC2626" strokeWidth="2" fill="none"/><circle cx="190" cy="60" r="20" fill="#DC2626" opacity="0.15"/><circle cx="195" cy="55" r="4" fill="#DC2626"/><circle cx="185" cy="55" r="4" fill="#DC2626"/><circle cx="190" cy="65" r="4" fill="#DC2626"/></svg></div></div>
            </div>
          </div>
        </section>

        {/* PIED DE PAGE */}
        <footer style={{background:"#111",padding:"60px 48px 28px",color:"#fff"}}>
          <div style={{maxWidth:1180,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1.5fr",gap:40,marginBottom:40}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><div style={{width:34,height:34,background:"linear-gradient(135deg,#DC2626,#991B1B)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><BloodDrop size={16} color="#fff"/></div><span style={{fontSize:20,fontWeight:800,color:"#DC2626"}}>donnora</span></div>
                <p style={{fontSize:13,color:"#666",lineHeight:1.8,maxWidth:280}}>{"Connecter les donneurs et les h\u00F4pitaux gr\u00E2ce \u00E0 la gestion du don de sang pilot\u00E9e par l\u2019IA. Chaque goutte compte."}</p>
                <div style={{display:"flex",gap:6,marginTop:16}}><a href="#" style={{fontSize:12,fontWeight:600,color:"#999",textDecoration:"none"}}>{"H\u00F4pitaux"}</a><span style={{color:"#444"}}>·</span><a href="#" style={{fontSize:12,fontWeight:600,color:"#999",textDecoration:"none"}}>Donneurs</a><span style={{color:"#444"}}>·</span><a href="#" style={{fontSize:12,fontWeight:600,color:"#999",textDecoration:"none"}}>Contact</a></div>
              </div>
              <div></div>
              <div>
                <div style={{display:"inline-block",background:"#DC2626",padding:"6px 14px",borderRadius:6,marginBottom:14}}><span style={{color:"#fff",fontSize:11,fontWeight:700}}>Nous contacter</span></div>
                <p style={{fontSize:13,color:"#888",marginBottom:8}}>support@donnora.com</p>
                <p style={{fontSize:13,color:"#888",marginBottom:8}}>+212 544567953</p>
                <p style={{fontSize:13,color:"#888"}}>Casablanca, Maroc</p>
              </div>
              <div>
                <div style={{background:"rgba(220,38,38,.1)",borderRadius:16,padding:24,border:"1px solid rgba(220,38,38,.15)"}}>
                  <h4 style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:8}}>Ne manquez aucune campagne de don</h4>
                  <p style={{fontSize:12,color:"#999",marginBottom:14,lineHeight:1.6}}>{"Inscrivez-vous pour recevoir les alertes de besoins urgents en sang."}</p>
                  <div style={{display:"flex",gap:8}}><input type="email" placeholder="Votre email" style={{flex:1,padding:"10px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.05)",fontSize:12,color:"#fff",outline:"none"}}/><button style={{background:"#DC2626",color:"#fff",padding:"10px 16px",borderRadius:8,border:"none",fontSize:12,fontWeight:700,cursor:"pointer"}}>{"S'inscrire"}</button></div>
                </div>
              </div>
            </div>
            {/* INSTAGRAM — comme sur le poster */}
            <div style={{background:"linear-gradient(135deg,#DC2626,#B91C1C)",borderRadius:16,padding:"24px 32px",marginBottom:32,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:48,height:48,borderRadius:12,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none"/></svg>
                </div>
                <div>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.7)",fontWeight:600,letterSpacing:1,marginBottom:2}}>SUIVEZ-NOUS SUR INSTAGRAM</p>
                  <p style={{fontSize:22,fontWeight:800,color:"#fff"}}>@donno_ra</p>
                </div>
              </div>
              <a href="https://instagram.com/donno_ra" target="_blank" rel="noopener noreferrer" style={{background:"#fff",color:"#DC2626",padding:"12px 28px",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none",transition:"transform .2s",display:"flex",alignItems:"center",gap:8}} onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={function(e){e.currentTarget.style.transform="translateY(0)";}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="#DC2626" stroke="none"/></svg>
                Suivre
              </a>
            </div>
            <div style={{borderTop:"1px solid #222",paddingTop:20,display:"flex",justifyContent:"space-between"}}><p style={{fontSize:12,color:"#555"}}>{"© 2026 Donnora. Tous droits r\u00E9serv\u00E9s."}</p><div style={{display:"flex",gap:16}}><a href="#" style={{fontSize:12,color:"#555",textDecoration:"none"}}>{"Politique de confidentialit\u00E9"}</a><a href="#" style={{fontSize:12,color:"#555",textDecoration:"none"}}>{"Conditions d\u2019utilisation"}</a></div></div>
          </div>
        </footer>
      </div>
    </>
  );
}