import { useEffect, useMemo, useState } from "react"; import { useSearchParams } from "react-router-dom"; import { get } from "../api.js";
export default function Desks() {
  const [sp, setSp] = useSearchParams(); const q = sp.get("q") || ""; const cl = sp.get("cluster") || "";
  const [desks, setDesks] = useState([]); const [clusters, setClusters] = useState([]); const [err, setErr] = useState(false);
  useEffect(() => { Promise.all([get("/desks/"), get("/clusters/")]).then(([d, c]) => { setDesks(d); setClusters(c); }).catch(() => setErr(true)); }, []);
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  const shown = useMemo(() => { const t = q.trim().toLowerCase();
    return desks.filter(d => (!cl || d.cluster === cl) && (!t || [d.name, d.code, d.strapline, d.description, ...(d.focus_areas || [])].join(" ").toLowerCase().includes(t))); }, [desks, q, cl]);
  return (<main className="wrap section"><h1>What we broker</h1>
    <p className="lede">Every desk carries its own market knowledge, and most substantial mandates draw on more than one. When they do, you still deal with a single lead broker rather than five departments.</p>
    <input className="find" type="search" aria-label="Search desks" value={q} onChange={e => set("q", e.target.value)} placeholder="What are you buying, selling or placing?"/>
    <div className="chips"><button aria-pressed={!cl} onClick={() => set("cluster", "")}>All {desks.length || 25} desks</button>
      {clusters.map(c => <button key={c.slug} aria-pressed={cl === c.slug} onClick={() => set("cluster", c.slug)}>{c.short_name}</button>)}</div>
    <p aria-live="polite" className="count">{err ? "The desks could not be loaded. Please refresh, or call us." : shown.length === 1 ? "One desk matches." : (q || cl) ? `${shown.length} desks match.` : `Showing all ${shown.length} desks.`}</p>
    {!err && shown.length === 0 ? <p className="empty">No desk matches that word. Try a plainer term such as land, hotel, cocoa, insurance, freight or carbon, or clear the search to see all twenty five.</p> :
    <div className="grid">{shown.map(d => <article className="desk" key={d.code}><h3>{d.name} <small>{d.code}</small></h3>
      {d.strapline && <p className="strap">{d.strapline}</p>}{d.description && <p>{d.description}</p>}
      {d.focus_areas?.length > 0 && <details><summary>What this desk handles</summary><ul>{d.focus_areas.map(f => <li key={f}>{f}</li>)}</ul></details>}
      <p className="cl">{d.cluster_name}</p></article>)}</div>}
  </main>);
}
