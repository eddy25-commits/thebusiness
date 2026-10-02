import { conditions, stages } from "../content.js";
export default function How() { return (<main>
  <section className="section dark"><div className="wrap"><h1>How we work</h1>
    <p className="lede">Most brokers work at one point in a transaction. They introduce, take a commission and move on, which is why deals collapse in diligence and valuations fail to hold. We think brokerage value is created along a chain, and the chain breaks wherever a link is missing.</p>
    {conditions.map(([t, d]) => <div className="band" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></section>
  <section className="section wrap"><h2>What happens after you appoint us</h2>
    <p className="lede">Every mandate moves through the same five stages. The depth of each varies with the size of the deal. The sequence does not.</p>
    <ol className="stages">{stages.map(([t, d, r]) => <li key={t}><h3>{t}</h3><p>{d}</p><p className="get"><b>You receive:</b> {r}</p></li>)}</ol></section></main>); }
