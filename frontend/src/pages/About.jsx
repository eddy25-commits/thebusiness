import { useEffect, useState } from "react"; import { get } from "../api.js"; import S from "../data/static.json";
import { vision, mission, values } from "../content.js"; import { PersonCard } from "./Network.jsx";
export default function About() {
  const [dirs, setDirs] = useState([]); useEffect(() => { get("/people/?kind=director").then(setDirs).catch(() => {}); }, []);
  return (<main>
  <section className="section wrap"><h1>What we stand for</h1>
    <p className="lede">These are not decoration. They are the standards our clients are entitled to hold us to, and the terms on which we ask to be judged.</p>
    <div className="split"><div><h2>Our vision</h2><p>{vision}</p></div><div><h2>Our mission</h2><p>{mission}</p></div></div></section>
  <section className="section alt"><div className="wrap"><h2 id="values">Our values</h2>
    <p className="lede">Five commitments govern how we work. They are worded plainly because they are meant to be enforceable, not admired.</p>
    <div className="grid">{values.map(([t, d]) => <article className="desk" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
  <section className="section wrap"><h2 id="philosophy">Our philosophy</h2>
    <p className="lede">Four convictions sit underneath the way this firm operates. The method they produce is set out on the How we work page.</p>
    <ol className="stages">{S.philosophy.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol></section>
  <section className="section alt"><div className="wrap"><h2 id="standards">Our standards</h2><p className="lede">{S.standards_lede}</p>
    <ul className="rules">{S.standards.map(s => <li key={s}>{s}</li>)}</ul></div></section>
  <section className="section wrap" id="people"><h2>Who we are</h2><p className="lede">{S.people_lede}</p>
    <div className="people-split"><div className="bench one">{dirs.map(p => <PersonCard key={p.name} p={p}/>)}</div>
      <aside className="facts"><h3>Registered particulars</h3><ul>{Object.entries(S.particulars).map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}</ul></aside></div></section></main>); }
