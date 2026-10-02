import S from "../data/static.json";
const Table = ({ head, rows }) => (<div className="scroll"><table className="tiers"><thead><tr>{head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
  <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>);
export default function Initiatives() { const I = S.institute, M = S.summit; return (<main className="dark">
  <section className="section wrap"><h1>Our initiatives</h1><p className="lede">{S.initiatives_lede}</p>
    <nav className="jump" aria-label="On this page"><a href="#institute">Africa Brokerage Institute</a><a href="#summit">Africa Brokerage Summit</a></nav></section>
  <section className="section wrap" id="institute"><h2>{I.name}</h2><p className="strap">{I.strap}</p>
    {I.paras.map(p => <p className="lede" key={p}>{p}</p>)}
    <div className="grid">{I.offers.map(([t, d]) => <article className="desk inv" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div>
    <h3 className="sub">Membership grades</h3><p className="lede">A graded credential gives a member something to earn and a client something to check.</p>
    <Table head={["Grade", "Letters", "Basis of admission"]} rows={I.grades}/>
    <h3 className="sub">Discipline faculties</h3><p className="lede">{I.faculties_intro}</p>
    <Table head={["Faculty", "Status", "Scope and technical standards"]} rows={I.faculties}/>
    <p className="status">{I.status}</p></section>
  <section className="section wrap" id="summit"><h2>{M.name}</h2><p className="strap">{M.strap}</p><p className="lede">{M.intro}</p>
    <div className="summit"><div><p>{M.body}</p><h3 className="sub">Who should attend</h3><p>{M.who}</p>
      <h3 className="sub">Working themes</h3><ul className="rules light">{M.themes.map(t => <li key={t}>{t}</li>)}</ul></div>
      <dl>{M.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className={v === "To be announced" ? "pending" : ""}>{v}</dd></div>)}</dl></div></section></main>); }
