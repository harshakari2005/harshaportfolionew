import React, { useState } from "react";
import "./ChatBot.css";

const qaData = [
  {
    keywords: ["name", "who are you"],
    answer: "I'm K Harsha Vardhan Chowdary, a Cybersecurity Engineer and Developer. And also a person who is passionate about taking short films and directing films. My life time goal is to become a succesful director"
  },
  {
    keywords: ["skills", "technologies"],
    answer: "I specialize in Cybersecurity, Python, Web Security, SIEM, IDS, Linux, and Web Development."
  },
  {
    keywords: ["projects", "work" , "experience" , "internships"],
    answer: "I've worked on Memory Forensics, Automated Vulnerability Scanner, Smart Waste Segregation, and DBMS projects."
  },
  {
    keywords: ["contact", "email", "phone"],
    answer: "You can reach me at hvckari@gmail.com or call +91 8019252777."
  },
  {
    keywords: ["college", "education"],
    answer: "I'm pursuing B.Tech in Cyber Security at VNR Vignana Jyothi Institute of Engineering and Technology."
  },
  {
    keywords: ["friends"],
    answer: "His longest friend since schollings days was teja and now additional to teja it is charminar model alias sushanth"
  },
  {
    keywords: ["who is Mounika ?", "who is mounika?" , "mounika" , "Mounika"],
    answer: "Mounika is not just a friend I met during my B.Tech journey; she is someone who slowly became an irreplaceable part of my life. Coming from a lateral entry background, she blended in effortlessly, but what truly stood out was her presence in my life. She has always been my biggest stress buster — the person who can make me laugh even on the heaviest days. No matter how overwhelmed, anxious, or mentally exhausted I feel, just talking to her brings a sense of calm and relief.She is a rare combination of a friend and a sister — someone who cares deeply, understands silently, and supports endlessly. In moments when I feel low, lost, or unsure of myself, she never lets me feel alone. She stands by me, backs me up, and believes in me even when I struggle to believe in myself. Her support is not loud or dramatic; it is steady, genuine, and comforting — the kind that stays with you.What makes our bond even more special is the simplicity of it. Even irritating her, teasing her, or sharing random moments somehow makes me happier. Those little interactions, silly arguments, and laughter-filled conversations turn ordinary days into beautiful memories. She has a way of lifting my mood without even trying, and that is something truly special.Mounika’s presence in my life is a blessing — someone who makes stressful days lighter, sad moments easier, and happy moments even brighter. Having her by my side throughout this journey makes everything feel a little more manageable and a lot more meaningful.."
  },
  {
    keywords: ["who is Prajanya ?" , "Prajanya"],
    answer: "I met her in my first year of B.Tech, and from the very beginning, there was something different about our bond. What started as a simple friendship soon turned into something much deeper — she became a sister to me in the truest sense. Not by blood, but by the way she cared, understood, and stood by me. Over time, our bond grew stronger, gradually and naturally, turning into something that feels permanent and irreplaceable. She taught me many things — not just academically or practically, but about life, patience, and understanding myself better. She corrected me when I was wrong, guided me when I was confused, and never hesitated to be honest with me, even when it was hard to hear. At the same time, she is always hectic, constantly scolding me, torturing me in her own way, and pushing my buttons — yet somehow, even that feels comforting. That “torture” is filled with care, concern, and love, and deep down, I know it comes from a place of wanting the best for me. She may not be my own sister by birth, but she has become family in every sense. Her presence in my life feels natural, like she has always belonged there. Through ups and downs, laughter and arguments, support and corrections, she has remained constant. Having someone like her makes life feel more grounded and meaningful, and I’m truly grateful for the bond we share — a bond that started in college but turned into something far beyond it.. "
  },
  {
    keywords: ["who is sushmitha ?" , "Sushmitha" , "sushmitha"],
    answer: "Sushmitha has been a constant presence in my life since the very first year of B.Tech. Sitting beside me with consecutive roll numbers, she quickly became more than just a classmate — she became a true friend and my trusted partner in crime, especially during lab externals. In those stressful lab exam moments, she was my only saviour, the one person I could rely on without hesitation. Her calmness, clarity, and confidence always brought reassurance when pressure was at its peak. We spent countless hours studying together online for exams, supporting each other through tough subjects, deadlines, and late-night revisions. What made it special was not just studying together, but the understanding and comfort we shared during those times. She has always been a good and genuine friend — honest, dependable, and always willing to help without expecting anything in return. Sushmitha has also been an integral part of all my projects, standing by me as a dedicated team member who brings intelligence, discipline, and consistency to everything she does. I lovingly call her “Topper” — not just because she tops our class academically, but because of the way she excels with dedication and sincerity. She sets an example through her hard work, focus, and determination. Among the many people I have met in this journey, she truly feels like a rare gem — a diamond among many. Having her by my side has made my academic journey smoother, stronger, and more meaningful, and I’m genuinely grateful for the bond we share."
  }
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Ask me anything about Harsha!" }
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (question) => {
    const q = question.toLowerCase();
    
    const match = qaData.find(item =>
      item.keywords.some(k => q.includes(k.toLowerCase())) // <--- ADD .toLowerCase() HERE
    );
    
    return match ? match.answer : "Sorry, I didn’t get that. Try asking about skills, projects, or contact.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getBotReply(input) };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <div className="chatbot-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            Harsha Mind 🤖
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;

