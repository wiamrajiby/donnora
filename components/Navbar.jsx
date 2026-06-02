/* Donnora — Navbar.jsx — Composant réutilisable */
/* Placer dans components/Navbar.jsx */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
function LogoutIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
}
function UserIcon(p) {
  return (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke={p.color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
}

export default function Navbar(props) {
  var router = useRouter();
  var current = router.pathname;
  var _s = useState(0), sy = _s[0], setSy = _s[1];
  var _d = useState(false), showDrop = _d[0], setShowDrop = _d[1];

  useEffect(function() {
    function f() { setSy(window.scrollY); }
    window.addEventListener("scroll", f);
    return function() { window.removeEventListener("scroll", f); };
  }, []);

  var links = [
    { label: "Tableau de bord", href: "/home" },
    { label: "R\u00E9sultat", href: "/result" },
    { label: "Donneurs", href: "/donneurs" },
    { label: "Historique", href: "/historique" },
    { label: "Param\u00E8tres", href: "/parametres" }
  ];

  function doLogout() {
    router.push("/");
  }

  return (
    <>
      <style jsx global>{`
        .dn-nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:all .35s}
        .dn-nav-link{font-size:13px;font-weight:500;text-decoration:none;padding:8px 16px;border-radius:8px;transition:all .25s;color:#666}
        .dn-nav-link:hover{color:#DC2626;background:rgba(220,38,38,.05)}
        .dn-nav-link.active{color:#DC2626;font-weight:700;background:#FEF2F2}
        .dn-avatar{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#DC2626,#991B1B);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .dn-avatar:hover{transform:scale(1.05);box-shadow:0 4px 16px rgba(220,38,38,.3)}
        .dn-dropdown{position:absolute;top:52px;right:0;background:#fff;border-radius:14px;padding:8px;box-shadow:0 16px 48px rgba(0,0,0,.12);border:1px solid #f0f0f0;min-width:200px;opacity:0;transform:translateY(-8px) scale(.97);pointer-events:none;transition:all .2s}
        .dn-dropdown.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
        .dn-drop-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:500;color:#555;cursor:pointer;transition:all .15s;border:none;background:none;width:100%;text-align:left}
        .dn-drop-item:hover{background:#FEF2F2;color:#DC2626}
        .dn-drop-item.danger{color:#DC2626}
        .dn-drop-item.danger:hover{background:#FEE2E2}
        @keyframes navSlideIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
        .dn-nav-appear{animation:navSlideIn .5s ease-out both}
      `}</style>

      <nav className="dn-nav dn-nav-appear" style={{
        padding: "12px 40px",
        background: sy > 30 ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: sy > 30 ? "0 1px 24px rgba(0,0,0,.06)" : "none",
        borderBottom: sy > 30 ? "1px solid rgba(0,0,0,.04)" : "1px solid transparent"
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={function(){ router.push("/home"); }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#DC2626,#991B1B)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(220,38,38,.2)" }}>
              <BloodDrop size={16} color="#fff"/>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#DC2626", letterSpacing: "-.3px" }}>donnora</span>
          </div>

          {/* Liens de navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,.02)", padding: "4px 6px", borderRadius: 12 }}>
            {links.map(function(link) {
              var isActive = current === link.href;
              return (
                <a key={link.href} href={link.href} className={"dn-nav-link" + (isActive ? " active" : "")} onClick={function(e) { e.preventDefault(); router.push(link.href); }}>
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Avatar + Dropdown */}
          <div style={{ position: "relative" }}>
            <div className="dn-avatar" onClick={function(){ setShowDrop(!showDrop); }}>
              <UserIcon size={18} color="#fff"/>
            </div>
            <div className={"dn-dropdown" + (showDrop ? " open" : "")}>
              <div style={{ padding: "10px 14px 12px", borderBottom: "1px solid #f5f5f5", marginBottom: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{props.userName || "Dr. Personnel"}</p>
                <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{props.userEmail || "medecin@hopital.ma"}</p>
              </div>
              <button className="dn-drop-item" onClick={function(){ router.push("/parametres"); setShowDrop(false); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                {"Param\u00E8tres"}
              </button>
              <button className="dn-drop-item danger" onClick={doLogout}>
                <LogoutIcon size={14} color="#DC2626"/>
                {"D\u00E9connexion"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Click outside pour fermer le dropdown */}
      {showDrop && <div onClick={function(){ setShowDrop(false); }} style={{ position: "fixed", inset: 0, zIndex: 99 }}/>}
    </>
  );
}
