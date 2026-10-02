import { useEffect, useState } from "react"; import { get } from "../api.js"; import S from "../data/static.json";
export const PersonCard = ({ p }) => (<article className="card">
  {p.photo && <img src={p.photo} alt="" width="96" height="96" loading="lazy"/>}
  <div><h3>{p.name}</h3>{p.qualifications && <p className="quals">{p.qualifications}</p>}
    <p className="port">{p.portfolio || p.role}</p><p>{p.profile}</p></div></article>);
export default function Network() {
  const [people, setPeople] = useState([]); const [err, setErr] = useState(false);
  useEffect(() => { get("/people/?kind=adviser").then(setPeople).catch(() => setErr(true)); }, []);
  return (<main>
    <section className="section wrap"><h1>Our professional network</h1><p className="lede">{S.network_lede}</p>
      {err && <p className="empty">The advisers could not be loaded. Please refresh the page.</p>}
      <div className="bench">{people.map(p => <PersonCard key={p.name} p={p}/>)}</div></section>
    <section className="section alt"><div className="wrap"><h2 id="associates">Associates we call on</h2><p className="lede">{S.associates_lede}</p>
      <ul className="tags">{S.associates.map(a => <li key={a}>{a}</li>)}</ul><p className="lede">{S.associates_cta}</p></div></section></main>);
}
