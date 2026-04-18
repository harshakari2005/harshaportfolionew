import React, { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';
import './App.css';
import profilePic from './harsha.jpeg';

const Portfolio = () => {
  const [cursorParticles, setCursorParticles] = useState([]);
  const [logs, setLogs] = useState(["[+] Monitoring network..."]);
  const canvasRef = useRef(null);
  const particleIdRef = useRef(0);

  // Cursor particles
  const handleMouseMove = (e) => {
    const newParticle = {
      id: particleIdRef.current++,
      x: e.clientX,
      y: e.clientY
    };
    setCursorParticles(prev => [...prev, newParticle].slice(-40));
  };

  // Fake live logs
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

  return (
    <div className="portfolio-container" onMouseMove={handleMouseMove}>
      
      {/* Cursor particles */}
      {cursorParticles.map(p => (
        <div key={p.id} className="cursor-particle" style={{ left: p.x, top: p.y }} />
      ))}

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <img src={profilePic} alt="profile" className="profile-image" />
          <h1 className="hero-title">K HARSHA VARDHAN CHOWDARY</h1>
          <p className="hero-subtitle">
            root@harsha:~# Cybersecurity Engineer | Ethical Hacker
          </p>
          <div className="hero-tagline">
            <Shield /> Securing Digital Frontiers
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="content-box">
          <h2 className="section-title">About Me</h2>

          <p>
            Enthusiastic Cyber Security student skilled in scripting and real-world
            cybersecurity solutions.
          </p>

          <div className="terminal-box">
            <p>$ whoami</p>
            <p>harsha - cybersecurity engineer</p>
            <p>$ skills</p>
            <p>network security | ethical hacking | SIEM | IoT security</p>
          </div>

          <h3>CGPA: 7.21</h3>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section">
        <div className="content-box">
          <h2 className="section-title">Experience</h2>

          <h3>Cyber Security Analyst Intern</h3>
          <p>SSEV SOFTSOLS | 2026</p>

          <p>
            Worked on securing embedded and IoT systems (ESP32, Raspberry Pi,
            NVIDIA Jetson) by performing vulnerability assessments, system hardening,
            and network monitoring using tools like Wireshark and Nmap.
          </p>
        </div>
      </section>

      {/* CYBER DASHBOARD */}
      <section className="section">
        <div className="content-box">
          <h2 className="section-title">Cyber Threat Dashboard</h2>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Threat Level</h3>
              <p className="threat-high">HIGH</p>
            </div>

            <div className="dashboard-card">
              <h3>Active Connections</h3>
              <p>128 Devices</p>
            </div>

            <div className="dashboard-card">
              <h3>Blocked Attacks</h3>
              <p>342</p>
            </div>

            <div className="dashboard-card">
              <h3>Firewall Status</h3>
              <p className="status-active">ACTIVE</p>
            </div>
          </div>

          <div className="terminal-box">
            {logs.map((log, i) => (
              <p key={i}>{log}</p>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;