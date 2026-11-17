"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Asterisk, Check, Code2, Dribbble, Github, Globe2, Linkedin, Mail, Menu, MoveUpRight, Sparkles, X } from "lucide-react";
import { expertise, process, profile, projects, services } from "@/data/portfolio";

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .65, ease: "easeOut" } } };

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ["All", "Full-stack", "E-commerce", "Business", "Creative"];
  const visibleProjects = useMemo(() => projects.filter(p => filter === "All" || (filter === "Full-stack" && p.tags.includes("Full-stack")) || (filter === "E-commerce" && p.category.includes("E-commerce")) || (filter === "Business" && p.category.includes("Business")) || (filter === "Creative" && p.category.includes("Creative"))), [filter]);

  return <main>
    <header className="nav-wrap"><a className="brand" href="#home"><span className="brand-mark">P.</span><span>PARSA RAHMANI<small>DEVELOPER / CREATIVE</small></span></a>
      <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>{[["Work","#work"],["Expertise","#expertise"],["Pricing","#pricing"],["About","#about"]].map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15}/></a></nav>
    </header>

    <section className="hero section-shell" id="home">
      <div className="hero-top"><span className="eyebrow"><i/> {profile.availability}</span><span className="hero-location"><Globe2 size={14}/> {profile.location}</span></div>
      <motion.div initial="hidden" animate="show" variants={reveal}>
        <p className="hero-kicker">INDEPENDENT DEVELOPER · DIGITAL CRAFT</p>
        <h1>Building digital<br/><em>things that</em> matter<span className="green-dot">.</span></h1>
        <div className="hero-bottom"><p className="hero-copy">{profile.description}</p><a href="#work" className="round-link">Explore selected work <ArrowDownRight size={19}/></a></div>
      </motion.div>
      <div className="hero-stamp"><Asterisk/><span>DESIGN<br/>MEETS<br/>FUNCTION</span></div>
      <div className="hero-rule"><span>01 / 04</span><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span></div>
    </section>

    <section className="intro-band"><div className="section-shell intro-inner"><span className="eyebrow">A LITTLE INTRO</span><p>I partner with people and teams to turn complex ideas into <em>useful, beautiful and reliable</em> digital products.</p><span className="intro-index">[ 2026 — NOW ]</span></div></section>

    <section className="section-shell section-block" id="work"><div className="section-heading"><div><span className="eyebrow">01 — SELECTED PROJECTS</span><h2>Things I’ve <em>made.</em></h2></div><span className="section-note">A selection of real-world work<br/>and experiments.</span></div>
      <div className="filters">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?"active":""}>{c}</button>)}</div>
      <div className="project-grid">{visibleProjects.map((p,i)=><motion.a variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.12}} href={p.href} target="_blank" rel="noreferrer" className={p.featured?"project-card featured":"project-card"} key={p.id}>
        <div className="project-image"><Image src={p.image} alt={p.name+" project preview"} fill sizes="(max-width: 700px) 100vw, 50vw" priority={i===0}/><span className="project-open"><ArrowUpRight/></span><span className="project-number">0{i+1}</span></div>
        <div className="project-meta"><div><span className="project-category">{p.category} / {p.year}</span><h3>{p.name}</h3><p>{p.description}</p><div className="tag-list">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div><ArrowUpRight className="project-arrow"/></div>
      </motion.a>)}</div>
      <p className="disclaimer">Project descriptions are summaries. Replace preview imagery with original screenshots and verify each live URL before publishing.</p>
    </section>

    <section className="expertise-section" id="expertise"><div className="section-shell section-block"><div className="section-heading"><div><span className="eyebrow">02 — WHAT I DO</span><h2>My <em>expertise.</em></h2></div><p className="section-note">From first idea to the final<br/>line of code.</p></div><div className="expertise-list">{expertise.map(x=><article className="expertise-row" key={x.number}><span className="expertise-number">{x.number}</span><div><h3>{x.title}</h3><p>{x.detail}</p><span className="tools">{x.tools}</span></div><ArrowUpRight/></article>)}</div></div></section>

    <section className="section-shell section-block pricing" id="pricing"><div className="section-heading"><div><span className="eyebrow">03 — INVESTMENT</span><h2>Clear scope.<br/><em>Fair pricing.</em></h2></div><p className="section-note">Every project is different.<br/>These are starting points.</p></div><div className="price-grid">{services.map((s,i)=><article className={i===1?"price-card highlighted":"price-card"} key={s.name}><span className="price-index">0{i+1} / SERVICE</span><h3>{s.name}</h3><p>{s.detail}</p><strong>{s.from}</strong><ul>{s.items.map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul><a href="#contact">Discuss your project <ArrowUpRight size={15}/></a></article>)}</div><p className="pricing-note">Final quotes depend on scope, content, integrations and delivery timeline. Hosting, domains, paid services and ongoing maintenance are quoted separately.</p></section>

    <section className="about-section" id="about"><div className="section-shell about-grid"><div><span className="eyebrow">04 — A BIT ABOUT ME</span><h2>Curious by nature.<br/><em>Builder by choice.</em></h2></div><div className="about-copy"><p>I’m Parsa, a computer engineering graduate and independent developer. I enjoy working across the stack — combining thoughtful interfaces with dependable systems behind the scenes.</p><p>My toolkit includes modern JavaScript frameworks, backend development, databases and the technical foundations that make websites discoverable and fast.</p><div className="about-facts"><span><b>01</b> End-to-end thinking</span><span><b>02</b> Detail-oriented craft</span><span><b>03</b> Continuous learning</span></div></div></div></section>

    <section className="section-shell section-block process"><div className="section-heading"><div><span className="eyebrow">HOW WE WORK</span><h2>From idea to <em>impact.</em></h2></div></div><div className="process-grid">{process.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

    <section className="contact-section" id="contact"><div className="section-shell contact-inner"><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s make<br/><em>something good.</em></h2><a className="contact-button" href={"mailto:"+profile.email}>Start a conversation <ArrowUpRight/></a><div className="contact-bottom"><a href={"mailto:"+profile.email}><Mail size={15}/>{profile.email}</a><div>{profile.socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}<ArrowUpRight size={13}/></a>)}</div></div></div></section>

    <footer className="footer"><span>© {new Date().getFullYear()} PARSA RAHMANI</span><span>DESIGNED & BUILT WITH INTENTION <Sparkles size={13}/></span><a href="#home">BACK TO TOP ↑</a></footer>
  </main>;
}