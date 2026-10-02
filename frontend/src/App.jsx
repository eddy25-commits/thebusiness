import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { nav } from "./content.js";
import Home from "./pages/Home.jsx"; import Desks from "./pages/Desks.jsx"; import About from "./pages/About.jsx";
import How from "./pages/How.jsx"; import Network from "./pages/Network.jsx"; import Initiatives from "./pages/Initiatives.jsx"; import Contact from "./pages/Contact.jsx";

const Soon = ({ title }) => <main className="wrap section"><h1>{title}</h1><p className="lede">This page is next in the build.</p></main>;

export default function App() {
  const [open, setOpen] = useState(false); const loc = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);
  return (<>
    <header className="mast"><div className="wrap bar">
      <Link to="/" className="brand"><img src="/logo.png" alt="" width="42" height="42"/><span>Top <b>Business Brokers</b></span></Link>
      <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>Menu</button>
      <nav id="nav" aria-label="Main" className={open ? "open" : ""}>
        {nav.map(n => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
      </nav></div></header>
    <Routes>
      <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/>
      <Route path="/what-we-broker" element={<Desks/>}/><Route path="/how-we-work" element={<How/>}/>
      <Route path="/network" element={<Network/>}/>
      <Route path="/initiatives" element={<Initiatives/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="*" element={<Soon title="Page not found"/>}/>
    </Routes>
    <footer className="foot"><div className="wrap"><p>Top Business Brokers Consult Limited. Registered in Ghana, CS054812019.</p>
      <p><a href="tel:+233243555882">+233 (0) 243 555 882</a> · P. O. Box UP 629, KNUST, Kumasi · <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>Back to top</a></p></div></footer>
  </>);
}
