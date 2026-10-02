import { useEffect, useState } from "react"; import { useNavigate, Link } from "react-router-dom";
import { get } from "../api.js"; import { hero, vision } from "../content.js";
export default function Home() {
  const [q, setQ] = useState(""); const [clusters, setClusters] = useState([]); const go = useNavigate();
  useEffect(() => { get("/clusters/").then(setClusters).catch(() => {}); }, []);
  return (<main>
    <section className="hero"><div className="hero-l"><div className="inner">
      <h1>{hero.h}</h1><p className="sub">{hero.sub}</p>
      <form role="search" onSubmit={e => { e.preventDefault(); go(`/what-we-broker?q=${encodeURIComponent(q)}`); }}>
        <label htmlFor="s">Search the desks. Try land, cocoa, insurance, hotel, carbon.</label>
        <div className="row"><input id="s" value={q} onChange={e => setQ(e.target.value)} placeholder="What are you buying, selling or placing?"/><button className="btn">Search</button></div>
      </form></div></div>
      <aside className="hero-r"><div className="inner"><h2>Five practice clusters</h2>
        <ul>{clusters.map(c => <li key={c.slug}><Link to={`/what-we-broker?cluster=${c.slug}`}>{c.name}</Link><span>{c.desk_count}</span></li>)}</ul></div></aside>
    </section>
    <section className="section wrap narrow"><h2>What we stand for</h2><p className="lede">{vision}</p>
      <p><Link className="btn ghost" to="/about">Read our values and standards</Link></p></section>
  </main>);
}
