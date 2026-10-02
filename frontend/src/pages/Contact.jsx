import { useEffect, useState } from "react"; import { get, post } from "../api.js";
export default function Contact() {
  const [desks, setDesks] = useState([]); const [f, setF] = useState({ name:"", contact:"", desk:"", message:"", website:"" });
  const [state, setState] = useState("idle"); const [errs, setErrs] = useState({});
  useEffect(() => { get("/desks/").then(setDesks).catch(() => {}); }, []);
  const on = k => e => setF({ ...f, [k]: e.target.value });
  const submit = async e => { e.preventDefault(); setState("sending"); setErrs({});
    try { await post("/enquiries/", { ...f, desk: f.desk || null }); setState("done"); }
    catch (x) { setErrs(x.data || {}); setState(x.status === 429 ? "throttled" : "error"); } };
  return (<main className="section dark"><div className="wrap contact">
    <div><h1>Tell us what you are moving</h1><p className="lede">A first conversation costs nothing and usually settles whether we are the right firm for the job. If we are not, we will say so.</p>
      <p><b>Kumasi office</b><br/>Near Liberation Christian Centre<br/>Bomso, Kumasi<br/>Ashanti Region, Ghana<br/>P. O. Box UP 629, KNUST, Kumasi</p>
      <p><a href="tel:+233243555882">+233 (0) 243 555 882</a><br/><a href="tel:+233243257214">+233 (0) 243 257 214</a></p></div>
    {state === "done" ? <div className="ok" role="status"><h2>Enquiry received</h2><p>We will reply to the contact detail you gave us.</p></div> :
    <form onSubmit={submit} noValidate>
      <label>Your name<input value={f.name} onChange={on("name")} required/></label>{errs.name && <p className="err">{errs.name}</p>}
      <label>Email or phone<input value={f.contact} onChange={on("contact")} required/></label>{errs.contact && <p className="err">{errs.contact}</p>}
      <label>Which desk<select value={f.desk} onChange={on("desk")}><option value="">Not sure yet</option>{desks.map(d => <option key={d.code} value={d.code}>{d.name} ({d.code})</option>)}</select></label>
      <label>What are you buying, selling, raising or placing?<textarea rows="5" value={f.message} onChange={on("message")} required/></label>{errs.message && <p className="err">{errs.message}</p>}
      <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.website} onChange={on("website")}/>
      {state === "throttled" && <p className="err">Too many enquiries from this connection. Please call us instead.</p>}
      {state === "error" && !Object.keys(errs).length && <p className="err">We could not send that. Please call +233 (0) 243 555 882.</p>}
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending" : "Send enquiry"}</button></form>}
  </div></main>); }
