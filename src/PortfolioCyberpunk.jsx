import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function PortfolioCyberpunk() {
  const projects = [
    { title: "Daily Task CLI", desc: "Python CLI app for tasks.", tech: ["Python"], link: "#" },
    { title: "Portfolio Website", desc: "This neon site (React + Tailwind).", tech: ["React", "Tailwind"], link: "#" },
    { title: "Code Snippets Library", desc: "Algorithms & mini-projects.", tech: ["C++", "Java", "Python"], link: "#" },
    { title: "ByteLoop (Prototype)", desc: "Automation agent prototype.", tech: ["Node.js", "Python", "GitHub Actions"], link: "#" },
  ];

  const neon = { purple: "#8b5cf6", pink: "#ff3da3", cyan: "#00ffc6", red: "#ff0066", green: "#00ff88" };
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140 } } };

  const bgCanvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const petalsContainerRef = useRef(null);
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    const canvas = bgCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let w = (canvas.width = window.innerWidth); let h = (canvas.height = window.innerHeight);
    let stars = [];
    function initStars() { stars = []; const count = Math.round((w * h) / 7000); for (let i = 0; i < count; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2 }); }
    function draw() { ctx.clearRect(0,0,w,h); const g = ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'rgba(11,2,26,0.7)'); g.addColorStop(1,'rgba(0,0,0,0.7)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h); for(const s of stars){ s.x+=s.vx; s.y+=s.vy; if(s.x<0) s.x=w; if(s.x>w) s.x=0; if(s.y<0) s.y=h; if(s.y>h) s.y=0; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${0.5+Math.random()*0.5})`; ctx.fill(); }}
    initStars(); let raf = requestAnimationFrame(function f(){ draw(); raf=requestAnimationFrame(f); });
    window.addEventListener('resize', ()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; initStars(); });

    const m = matrixCanvasRef.current; const mctx = m.getContext('2d'); let mw = (m.width = window.innerWidth); let mh = (m.height = window.innerHeight);
    const cols = Math.floor(mw/12); const drops = Array.from({length:cols},()=>Math.floor(Math.random()*mh));
    const mid = setInterval(()=>{ mctx.fillStyle='rgba(0,0,0,0.05)'; mctx.fillRect(0,0,mw,mh); mctx.fillStyle='rgba(0,255,140,0.12)'; mctx.font='13pt monospace'; for(let i=0;i<drops.length;i++){ const txt=String.fromCharCode(0x30a0+Math.random()*96); mctx.fillText(txt,i*12,drops[i]*14); if(drops[i]*14>mh && Math.random()>0.98) drops[i]=0; drops[i]++; } },50);

    const pr = petalsContainerRef.current; const petEls=[]; function make(){ const d=document.createElement('div'); d.className='petal'; const s=10+Math.random()*28; d.style.width=s+'px'; d.style.height=s+'px'; d.style.left=Math.random()*100+'%'; d.style.opacity=(0.35+Math.random()*0.6)+''; pr.appendChild(d); petEls.push(d); setTimeout(()=>d.remove(),16000+Math.random()*8000); }
    for(let i=0;i<Math.max(10,Math.floor(window.innerWidth/120));i++) setTimeout(make,i*400+Math.random()*800); const petI=setInterval(make,1100);

    return ()=>{ cancelAnimationFrame(raf); clearInterval(mid); clearInterval(petI); petEls.forEach(e=>e.remove()); };
  },[]);

  // livelier testimonials
  const testimonials = [
    { from: "Mentor", text: "🚀 Aryan ships insane polish — fast, focused and reliable!" },
    { from: "Peer", text: "🔥 Clean code AND mad creativity. Always excited to collab." },
    { from: "Client", text: "🌟 Delivered above expectations — automation that actually saves time!" }
  ];

  // helper to normalize project link (avoid '#' dead links)
  const safeLink = (href) => {
    if (!href) return "https://github.com/aryan-devv";
    if (href === "#" || href.trim() === "") return "https://github.com/aryan-devv";
    return href;
  };

  // Avatar source: default to GitHub avatar (quick & automatic)
  const avatarSrc = "https://github.com/aryan-devv.png";

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-[#050014] to-[#050018] text-white antialiased overflow-hidden">
      <canvas ref={bgCanvasRef} className="pointer-events-none fixed inset-0 z-0" />
      <canvas ref={matrixCanvasRef} className="pointer-events-none fixed inset-0 z-10 mix-blend-screen" />
      <div ref={petalsContainerRef} className="pointer-events-none fixed inset-0 z-20" />

      <header className="relative z-30">
        <img src="https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0" alt="Akihabara neon" className="w-full h-72 md:h-96 object-cover opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-lg bg-gradient-to-r from-[rgba(139,92,246,0.04)] to-[rgba(255,61,163,0.04)] backdrop-blur-sm border border-[rgba(139,92,246,0.18)] max-w-5xl w-full mx-4">
            <div className="flex items-center gap-4 md:gap-8 justify-center md:justify-start md:pl-6">
              {/* Avatar - now bigger and visible on all sizes */}
              <div className="avatar-wrap block">
                <img
                  src={avatarSrc}
                  alt="Aryan avatar"
                  className="w-24 h-24 md:w-36 md:h-36 rounded-full ring-4 ring-[rgba(139,92,246,0.14)] shadow-2xl neon-avatar"
                />
              </div>

              <div className="text-center md:text-left flex-1">
                <motion.h1 initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{delay:0.18}} className="text-center md:text-left text-3xl md:text-5xl font-extrabold tracking-tight">
                  <span style={{color:neon.purple}}>✨ AI Crafter ✨</span>
                  <span className="mx-2 hidden md:inline">|</span>
                  <span style={{color:neon.pink}} className="ml-2 md:ml-4">🌸 Aryan — Future Tokyo Tech Dev</span>
                  <span className="mx-2 hidden md:inline">|</span>
                  <span style={{color:neon.cyan}} className="ml-2 md:ml-4">🚀 Tech Oriented</span>
                </motion.h1>

                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="mt-2 text-center md:text-left text-sm md:text-base text-gray-200 max-w-2xl mx-auto md:mx-0">
                  Hi, I'm <strong>Aryan</strong> — crafting AI agents, automation & full-stack systems with Neo-Tokyo vibes. ✨
                </motion.p>

                <div className="mt-4 flex justify-center md:justify-start gap-3 socials-container">
                  <a href="https://github.com/aryan-devv" target="_blank" rel="noopener noreferrer" className="social-btn floating hover-neon click-pulse px-4 py-2 rounded-md border border-[rgba(139,92,246,0.28)] bg-[rgba(139,92,246,0.06)] hover:scale-105 transition-transform flex items-center gap-2"><Github size={18}/> <span>GitHub</span></a>
                  <a href="https://www.linkedin.com/in/aryan-devv" target="_blank" rel="noopener noreferrer" className="social-btn floating hover-neon click-pulse px-4 py-2 rounded-md border border-[rgba(255,61,163,0.18)] bg-[rgba(255,61,163,0.04)] hover:scale-105 transition-transform flex items-center gap-2"><Linkedin size={18}/> <span>LinkedIn</span></a>
                  <a href="https://instagram.com/aryan_sannn" target="_blank" rel="noopener noreferrer" className="social-btn floating hover-neon click-pulse px-4 py-2 rounded-md border border-[rgba(255,200,200,0.18)] bg-[rgba(255,200,200,0.02)] hover:scale-105 transition-transform flex items-center gap-2"><Instagram size={18}/> <span>Instagram</span></a>
                  <a href="mailto:yadavaryan.jp@gmail.com" target="_blank" rel="noopener noreferrer" className="social-btn floating hover-neon click-pulse px-4 py-2 rounded-md border border-[rgba(0,255,198,0.18)] bg-[rgba(0,255,198,0.03)] hover:scale-105 transition-transform flex items-center gap-2"><Mail size={18}/> <span>Email</span></a>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
              <img src="https://img.shields.io/badge/AI%20Crafter-🤖-ff00ff?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/Tokyo%20Dream--8b5cf6?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/ByteLoop-Founder-⚡-00ffc6?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/Open%20to%20Collaborate-🤝-ff0066?style=for-the-badge&labelColor=000000" alt="badge" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-40 max-w-7xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <motion.div className="md:col-span-2 p-6 rounded-2xl border border-[rgba(139,92,246,0.08)] bg-gradient-to-b from-[rgba(139,92,246,0.02)] to-[rgba(0,0,0,0.06)] shadow-2xl neon-section" variants={container} initial="hidden" animate="show">
            <motion.h2 variants={item} className={`text-2xl font-bold mb-2 ${glitch? 'glitch':''}`}>Aryan's Portfolio 🤖</motion.h2>
            <motion.p variants={item} className="text-gray-300 leading-relaxed">I'm <strong>Aryan</strong> — pushing boundaries between AI, automation and full-stack engineering. I prototype fast, iterate faster, and ship with polish. </motion.p>

            <motion.div variants={item} className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
              {/* expanded tech icons with labels + emojis */}
              {[
                ['html','📄','HTML'],['css','🎨','CSS'],['python','🐍','Python'],['cpp','💠','C++'],['c','🔧','C'],['java','☕','Java'],
                ['js','⚡','JavaScript'],['typescript','🔷','TypeScript'],['react','⚛️','React'],['nodejs','🟢','Node.js'],['express','🚀','Express'],['vscode','🖥️','VSCode'],
                ['mysql','🗄️','MySQL'],['mongodb','🧱','MongoDB'],['firebase','☁️','Firebase'],['docker','🐳','Docker'],['kubernetes','☸️','Kubernetes'],['aws','☁️','AWS']
              ].map(([icon,emoji,label])=> (
                <div key={label} className="p-3 rounded-md border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)] text-center neon-border">
                  <img src={`https://skillicons.dev/icons?i=${icon}`} alt={label} className="inline-block" />
                  <div className="text-xs mt-2">{emoji} {label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <h4 className="font-semibold">Experience ✨</h4>
              <div className="mt-3 space-y-3">
                <div className="p-3 rounded-md bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] neon-border">
                  <div className="text-xs text-gray-400">2024 📅</div>
                  <div className="font-medium">Intern — Automation</div>
                  <div className="text-sm text-gray-300">Built automated test suites and pipelines.</div>
                </div>
                <div className="p-3 rounded-md bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] neon-border">
                  <div className="text-xs text-gray-400">2025 📅</div>
                  <div className="font-medium">Open-source contributor</div>
                  <div className="text-sm text-gray-300">Contributed to automation libs.</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside className="p-6 rounded-2xl border border-[rgba(0,255,198,0.06)] bg-[rgba(0,0,0,0.5)] neon-border" variants={container}>
            <motion.h3 variants={item} className="text-lg font-semibold mb-4">Tools & Setup 🧰</motion.h3>
            <motion.ul variants={item} className="space-y-3 text-sm text-gray-300">
              <li>VS Code 💻 • PowerShell ⚙️ • Windows Terminal 🖥️</li>
              <li>Postman 🧪 • GitHub Actions ⚙️ • Node.js • Express</li>
              <li>Python 🐍 • TensorFlow 🤖 • PyTorch 🔥 • OpenCV 📷</li>
              <li>MySQL 🐬 • MongoDB 🍃 • Firebase 🔥 • Redis ⚡</li>
              <li>Docker 🐳 • Git • GitHub • CI/CD</li>
            </motion.ul>

            <div className="mt-6 flex gap-2 flex-wrap">
              <img src="https://img.shields.io/badge/AI%20Crafter-🤖-ff00ff?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/Automation-%E2%9A%99%EF%B8%8F-00ffc6?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/Tokyo%20Dream--8b5cf6?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/Neon%20Dev-%E2%9C%A8-8b5cf6?style=for-the-badge&labelColor=000000" alt="badge" />
              <img src="https://img.shields.io/badge/404-Not%20Found-ff0066?style=for-the-badge&labelColor=000000" alt="bytel" />
            </div>
          </motion.aside>
        </section>

        <section className="mt-12">
          <motion.h2 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-2xl font-bold">Projects 🚀</motion.h2>
          <motion.div variants={container} initial="hidden" animate="show" className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p,i)=> (
              <motion.article key={p.title} variants={item} whileHover={{scale:1.03}} className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.04)] bg-gradient-to-b from-[rgba(139,92,246,0.03)] to-[rgba(0,0,0,0.06)] p-5 shadow-md neon-border">
                <div className="absolute right-4 top-4 text-xs text-gray-400">#{i+1} ✨</div>
                <h3 className="text-lg font-semibold">{p.title} 🚧</h3>
                <p className="mt-2 text-sm text-gray-300">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.tech.map(t=> <span key={t} className="text-xs px-2 py-1 rounded-md border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]">{t}</span>)}</div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={safeLink(p.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-300 hover-neon floating click-pulse"
                  >View 🔗</a>
                  <div className="flex items-center gap-2"><span className="text-xs text-gray-400">Live</span><span className="w-3 h-3 bg-[#00ff88] rounded-full shadow-sm" /></div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div className="lg:col-span-3" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
            <h2 className="text-2xl font-bold mb-4">Automation, AI & Cloud ⚙️🤖☁️</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(139,92,246,0.06)] neon-border">
                <h4 className="font-semibold">Automation 🛠️</h4>
                <p className="text-sm text-gray-300 mt-2">Selenium, Puppeteer, GitHub Actions, Cron workflows, API stitching.</p>
              </div>
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(0,255,198,0.06)] neon-border">
                <h4 className="font-semibold">AI / ML 🤖</h4>
                <p className="text-sm text-gray-300 mt-2">TensorFlow, PyTorch, OpenCV — prototypes in CV and lightweight agents.</p>
              </div>
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,61,163,0.06)] neon-border">
                <h4 className="font-semibold">Cloud ☁️</h4>
                <p className="text-sm text-gray-300 mt-2">AWS / GCP / Azure basics, deployments via Docker and GitHub Actions.</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Timeline 📜</h3>
              <div className="mt-3 space-y-3">
                {[
                  { date: '2025-07', event: 'Started ByteLoop prototype' },
                  { date: '2025-10', event: 'Launched first CLI tools' }
                ].map((t)=> (
                  <div key={t.date} className="p-3 rounded-md bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] neon-border"><div className="text-xs text-gray-400">{t.date} 🕒</div><div className="text-sm">{t.event}</div></div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.aside initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="p-4 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,61,163,0.06)] neon-border">
            <h4 className="font-semibold">Testimonials 🌟</h4>
            <div className="mt-3 space-y-3">
              {testimonials.map((t,i)=> (
                <div key={i} className="p-3 rounded-md bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)]">
                  <div className="text-xs text-gray-400">{t.from}</div>
                  <div className="text-sm">{t.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Contact ✉️</h4>
              <p className="text-sm text-gray-300 mt-2">Email: <strong><a href="mailto:yadavaryan.jp@gmail.com" target="_blank" rel="noopener noreferrer" className="hover-neon">yadavaryan.jp@gmail.com</a></strong></p>
              <p className="text-sm text-gray-300 mt-2">LinkedIn: <a href="https://www.linkedin.com/in/aryan-devv" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover-neon">www.linkedin.com/in/aryan-devv</a></p>
              <p className="text-sm text-gray-300 mt-2">GitHub: <a href="https://github.com/aryan-devv" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover-neon">github.com/aryan-devv</a></p>
              <p className="text-sm text-gray-300 mt-2">Instagram: <a href="https://instagram.com/aryan_sannn" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover-neon">instagram.com/aryan_sannn</a></p>

              {/* 2x2 grid for contact action buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href="https://github.com/aryan-devv" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover-neon floating click-pulse text-center">GitHub 🐙</a>
                <a href="mailto:yadavaryan.jp@gmail.com" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md bg-[rgba(255,61,163,0.04)] border border-[rgba(255,61,163,0.08)] hover-neon floating click-pulse text-center">Hire Me 💼</a>
                <a href="https://www.linkedin.com/in/aryan-devv" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md bg-[rgba(0,255,198,0.04)] border border-[rgba(0,255,198,0.08)] hover-neon floating click-pulse text-center">LinkedIn 🔗</a>
                <a href="https://instagram.com/aryan_sannn" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md bg-[rgba(255,200,200,0.04)] border border-[rgba(255,200,200,0.08)] hover-neon floating click-pulse text-center">Instagram 📸</a>
              </div>
            </div>
          </motion.aside>
        </section>

        <footer className="mt-16 text-center text-sm text-gray-400">
          <div className="mb-3">© {new Date().getFullYear()} Aryan — AI Crafter 🤖</div>
          <div>
            {/* colorful tech quote */}
            <span style={{background: 'linear-gradient(90deg,#8b5cf6,#ff3da3,#00ffc6)', WebkitBackgroundClip:'text', color:'transparent', fontWeight:700}}>
              "Code is the language — automation is the art. Build fast, ship smart."
            </span>
          </div>
        </footer>
      </main>

      <style>{`
        /* PINK BALLS / SAKURA PETALS */
        .petal{position:fixed;top:-10%;pointer-events:none;z-index:20;transform-origin:center;border-radius:50%;background:radial-gradient(circle at 30% 30%, rgba(255,150,200,0.98), rgba(255,80,160,0.85));box-shadow:0 8px 30px rgba(255,60,150,0.18);animation:fall 14s linear forwards}
        @keyframes fall{to{transform:translateY(120vh) rotate(360deg)}}

        /* avatar glow - stronger for the larger avatar */
        .neon-avatar { box-shadow: 0 14px 44px rgba(139,92,246,0.14), 0 0 120px rgba(255,61,163,0.08); border: 3px solid rgba(255,255,255,0.04); }

        /* NEON BORDER base (soft glow) */
        .neon-border{position:relative;border-radius:12px}
        .neon-border::before{content:'';position:absolute;inset:-2px;border-radius:14px;background:linear-gradient(90deg, rgba(139,92,246,0.14), rgba(255,61,163,0.10), rgba(0,255,198,0.08));z-index:-1;filter:blur(8px);opacity:0.95}

        /* TRACING NEON RAY - ring-only trace (masked so center is transparent) */
        .neon-border::after{content:'';display:none;}

        @keyframes neon-rotate{to{transform:rotate(360deg)}}

        /* Add a subtle colored tint behind the ring for RGB feel */
        .neon-border .neon-tint{position:absolute;inset:-6px;border-radius:16px;pointer-events:none;z-index:0;background:linear-gradient(90deg, rgba(139,92,246,0.12), rgba(255,61,163,0.08), rgba(0,255,198,0.06));filter:blur(8px)}

        /* GLITCH heading effect (kept) */
        .glitch{position:relative;color:white}
        .glitch::before,.glitch::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;opacity:0.8}
        .glitch::before{transform:translateX(-2px);color:rgba(255,61,163,0.8);mix-blend-mode:screen}
        .glitch::after{transform:translateX(2px);color:rgba(0,255,198,0.8);mix-blend-mode:screen}

        /* Heading glow */
        h2{text-shadow:0 0 12px rgba(139,92,246,0.9),0 0 28px rgba(255,61,163,0.6)}
        article::after{content:'';position:absolute;inset:0;box-shadow:0 0 40px rgba(139,92,246,0.04) inset;pointer-events:none}

        /* hover intensify the tracing ray */
        .neon-border:hover::after{filter:blur(4px) saturate(180%);animation-duration:2s}

        /* ensure the tracing only appears around sections and not icons */
        .neon-border img{position:relative;z-index:2}

        /* Social button effects: neon glow, float, pulse, icon wiggle */
        .socials-container { display: flex; gap: 0.75rem; flex-wrap:wrap; justify-content:center; }
        .social-btn { position: relative; overflow: visible; cursor: pointer; --neon: 0 0 18px rgba(139,92,246,0.12), 0 0 34px rgba(255,61,163,0.08), 0 0 60px rgba(0,255,198,0.04); transition: transform .18s cubic-bezier(.2,.9,.3,1), box-shadow .18s ease, filter .18s ease; }
        .social-btn svg { transition: transform .35s cubic-bezier(.2,.9,.3,1); }
        .social-btn:hover svg { transform: translateY(-3px) rotate(-8deg); }
        .hover-neon:hover { box-shadow: var(--neon); filter: saturate(140%); }

        /* floating subtle vertical animation */
        @keyframes floaty { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)} }
        .floating { animation: floaty 6s ease-in-out infinite; }
        .socials-container a:nth-child(1) { animation-delay: 0s; }
        .socials-container a:nth-child(2) { animation-delay: 0.4s; }
        .socials-container a:nth-child(3) { animation-delay: 0.8s; }
        .socials-container a:nth-child(4) { animation-delay: 1.2s; }

        /* click pulse */
        .click-pulse:active { transform: scale(0.96) translateY(0); box-shadow: 0 10px 34px rgba(0,0,0,0.45) inset; }

        /* add gentle bounce to icons on load */
        @keyframes icon-bounce { 0%{transform: translateY(0) scale(1)} 30%{transform: translateY(-6px) scale(1.02)} 60%{transform: translateY(0) scale(0.995)} 100%{transform: translateY(0) scale(1)} }
        .social-btn svg { animation: icon-bounce 2.2s ease 0.2s both; }

        /* responsive tweaks */
        @media(max-width:768px){
          .petal{display:none}
          .avatar-wrap{display:block}
          .socials-container{justify-content:center}
        }

      `}</style>
    </div>
  );
}
