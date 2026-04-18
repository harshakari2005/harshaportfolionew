import React, { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';
import './App.css';
import profilePic from './harsha.jpeg';

const Portfolio = () => {
  const [logs, setLogs] = useState(["[+] Monitoring network..."]);
  const [typedText, setTypedText] = useState("");
  const canvasRef = useRef(null);

  // ✅ NEW STATES (added only)
  const [terminalLines, setTerminalLines] = useState([
    "Welcome to Harsha Terminal",
    "Type 'help' to begin"
  ]);
  const [input, setInput] = useState("");

  const fullText = "root@harsha:~# Cybersecurity Engineer | Ethical Hacker";

  // Typing Effect (UNCHANGED)
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 40);

    return () => clearInterval(typing);
  }, []);

  // Fake Logs (UNCHANGED)
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "[+] Incoming connection detected",
        "[!] SQL Injection blocked",
        "[+] Nmap scan detected",
        "[✓] Firewall active"
      ];
      const random = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => [...prev.slice(-4), random]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // MATRIX (UNCHANGED)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "root@harsha~$ 010101 exploit access granted nmap scan";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff9f";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  // ✅ NEW: Auto Terminal Activity
  useEffect(() => {
    const commands = [
      "Scanning network...",
      "Connecting to server...",
      "Access granted ✔",
      "Launching exploit...",
      "System secured 🔐"
    ];

    let i = 0;

    const interval = setInterval(() => {
      setTerminalLines(prev => [...prev.slice(-6), commands[i]]);
      i++;
      if (i >= commands.length) i = 0;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ✅ NEW: Command Handler
  const handleCommand = (cmd) => {
    let response = "";

    switch (cmd.toLowerCase()) {
      case "help":
        response = "Commands: about, skills, projects, contact, clear";
        break;
      case "about":
        response = "Cybersecurity student passionate about ethical hacking.";
        break;
      case "skills":
        response = "Python, Nmap, Wireshark, SIEM, Linux";
        break;
      case "projects":
        response = "Phishing Detection, DDoS System, Vulnerability Scanner";
        break;
      case "contact":
        response = "Email: hvckari@gmail.com";
        break;
      case "clear":
        setTerminalLines([]);
        return;
      default:
        response = "Command not found";
    }

    setTerminalLines(prev => [...prev, `> ${cmd}`, response]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="portfolio-container">

      <canvas ref={canvasRef} className="matrix-bg"></canvas>

      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <img src={profilePic} alt="profile" className="profile-image" />
          <h1 className="hero-title">K HARSHA VARDHAN CHOWDARY</h1>

          <p className="hero-subtitle">
            {typedText}
            <span className="cursor">|</span>
          </p>

          <div className="hero-tagline">
            <Shield /> Securing Digital Frontiers
          </div>
        </div>
      </section>

      {/* ✅ NEW INTERACTIVE TERMINAL */}
      <section className="section">
        <div className="content-box">
          <h2 className="section-title">Interactive Terminal</h2>

          <div className="terminal-live">
            {terminalLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}

            <div className="terminal-input">
              <span>&gt; </span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* REST OF YOUR CODE (UNCHANGED) */}
      {/* KEEP EVERYTHING BELOW SAME */}

    </div>
  );
};

export default Portfolio;