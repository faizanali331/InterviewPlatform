import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// import React, { useState } from "react";
// import { createRoot } from "react-dom/client";
// import {
//   BrowserRouter,
//   useNavigate,
//   useLocation,
//   Routes,
//   Route,
//   Link,
// } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Search,
//   CalendarDays,
//   BarChart3,
//   Users,
//   ShieldCheck,
//   Wallet,
//   Video,
//   Settings,
//   LogOut,
//   Bell,
//   ArrowRight,
//   Star,
//   CheckCircle2,
//   Clock,
//   LockKeyhole,
//   CreditCard,
//   MessageSquare,
//   AlertTriangle,
//   Building2,
// } from "lucide-react";
// import "./styles.css";

// type Role = "candidate" | "interviewer" | "admin";
// type Interviewer = {
//   id: string;
//   company: string;
//   designation: string;
//   experience: number;
//   domain: string;
//   skills: string[];
//   rating: number;
//   price: number;
//   slots: string[];
// };
// const interviewers: Interviewer[] = [
//   {
//     id: "1",
//     company: "Amazon",
//     designation: "SDE-3",
//     experience: 9,
//     domain: "Java + Spring Boot",
//     skills: ["Java", "Spring Boot", "Microservices", "AWS", "System Design"],
//     rating: 4.9,
//     price: 2499,
//     slots: ["23 Aug · 10:00 AM", "23 Aug · 2:00 PM", "24 Aug · 11:00 AM"],
//   },
//   {
//     id: "2",
//     company: "Google",
//     designation: "Software Engineer III",
//     experience: 8,
//     domain: "Java + System Design",
//     skills: ["Java", "DSA", "System Design", "Distributed Systems"],
//     rating: 4.8,
//     price: 2999,
//     slots: ["23 Aug · 11:00 AM", "25 Aug · 4:00 PM"],
//   },
//   {
//     id: "3",
//     company: "Microsoft",
//     designation: "Senior Software Engineer",
//     experience: 10,
//     domain: "Backend + Azure",
//     skills: ["Java", "Spring", "Azure", "APIs", "Architecture"],
//     rating: 4.9,
//     price: 2799,
//     slots: ["24 Aug · 3:00 PM", "26 Aug · 11:00 AM"],
//   },
//   {
//     id: "4",
//     company: "Cognizant",
//     designation: "Technical Lead",
//     experience: 11,
//     domain: "Java + Spring Boot",
//     skills: ["Java", "Spring Boot", "SQL", "Microservices"],
//     rating: 4.7,
//     price: 1999,
//     slots: ["23 Aug · 5:00 PM", "24 Aug · 10:00 AM"],
//   },
//   {
//     id: "5",
//     company: "Flipkart",
//     designation: "SDE-3",
//     experience: 8,
//     domain: "React + Node.js",
//     skills: ["React", "TypeScript", "Node.js", "REST"],
//     rating: 4.8,
//     price: 2299,
//     slots: ["25 Aug · 10:00 AM", "26 Aug · 3:00 PM"],
//   },
//   {
//     id: "6",
//     company: "Coinbase",
//     designation: "Senior Blockchain Engineer",
//     experience: 7,
//     domain: "Blockchain + Solidity",
//     skills: ["Solidity", "Ethereum", "DeFi", "Security"],
//     rating: 5,
//     price: 3499,
//     slots: ["24 Aug · 6:00 PM", "28 Aug · 11:00 AM"],
//   },
// ];
// const interviews = [
//   {
//     id: "MI-1042",
//     company: "Amazon",
//     domain: "Java + Spring Boot",
//     role: "SDE-3",
//     date: "23 Aug 2026",
//     time: "10:00 AM",
//     status: "Upcoming",
//     score: null,
//     amount: 2499,
//   },
//   {
//     id: "MI-1031",
//     company: "Cognizant",
//     domain: "Java + Spring Boot",
//     role: "Technical Lead",
//     date: "12 Aug 2026",
//     time: "4:00 PM",
//     status: "Completed",
//     score: 78,
//     amount: 1999,
//   },
//   {
//     id: "MI-0991",
//     company: "Coinbase",
//     domain: "Blockchain + Solidity",
//     role: "Senior Blockchain Engineer",
//     date: "28 Jul 2026",
//     time: "6:00 PM",
//     status: "Completed",
//     score: 86,
//     amount: 3499,
//   },
// ];
// const feedback = [
//   {
//     domain: "Java + Spring Boot",
//     date: "12 Aug 2026",
//     score: 78,
//     technical: 76,
//     communication: 82,
//     problem: 79,
//     strengths: [
//       "Good Spring Boot fundamentals",
//       "Clear API design thinking",
//       "Good communication",
//     ],
//     focus: [
//       "Practice concurrency",
//       "Go deeper into database indexing",
//       "Improve system-design trade-offs",
//     ],
//   },
//   {
//     domain: "Blockchain + Solidity",
//     date: "28 Jul 2026",
//     score: 86,
//     technical: 84,
//     communication: 88,
//     problem: 86,
//     strengths: [
//       "Strong Solidity basics",
//       "Understands ERC standards",
//       "Good security awareness",
//     ],
//     focus: [
//       "Practice advanced DeFi architecture",
//       "Explain gas optimization in more depth",
//     ],
//   },
// ];
// function Badge({
//   children,
//   tone = "neutral",
// }: {
//   children: React.ReactNode;
//   tone?: string;
// }) {
//   return <span className={"badge " + tone}>{children}</span>;
// }
// function Layout({
//   role,
//   setRole,
//   children,
// }: {
//   role: Role;
//   setRole: (r: Role) => void;
//   children: React.ReactNode;
// }) {
//   const loc = useLocation();
//   const nav =
//     role === "candidate"
//       ? [
//           ["/dashboard", "Dashboard", LayoutDashboard],
//           ["/interviewers", "Find Interviewer", Search],
//           ["/bookings", "My Interviews", CalendarDays],
//           ["/feedback", "Feedback", BarChart3],
//         ]
//       : role === "interviewer"
//         ? [
//             ["/interviewer", "Dashboard", LayoutDashboard],
//             ["/availability", "Availability", CalendarDays],
//             ["/interviewer/interviews", "Interviews", Users],
//             ["/interviewer/feedback", "Feedback", BarChart3],
//           ]
//         : [
//             ["/admin", "Dashboard", LayoutDashboard],
//             ["/admin/interviewers", "Interviewers", Users],
//             ["/admin/interviews", "Interviews", CalendarDays],
//             ["/admin/payments", "Payments", Wallet],
//           ];
//   return (
//     <div className="shell">
//       <aside>
//         <div className="brand">
//           <b>IP</b> InterviewPro
//         </div>
//         <div className="switch">
//           <span>{role}</span>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value as Role)}
//           >
//             <option value="candidate">Candidate</option>
//             <option value="interviewer">Interviewer</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <nav>
//           {nav.map(([p, n, I]: any) => (
//             <Link className={loc.pathname === p ? "active" : ""} to={p} key={p}>
//               <I size={17} />
//               {n}
//             </Link>
//           ))}
//         </nav>
//         <div className="bottom">
//           <Link to="/settings">
//             <Settings size={17} />
//             Settings
//           </Link>
//           <button onClick={() => alert("Mock logout")}>
//             <LogOut size={17} />
//             Logout
//           </button>
//         </div>
//       </aside>
//       <main>
//         <header>
//           <span>Workspace / {role}</span>
//           <div>
//             <Bell size={18} />
//             <i>MF</i>
//           </div>
//         </header>
//         <section>{children}</section>
//       </main>
//     </div>
//   );
// }
// function Header({
//   title,
//   sub,
//   action,
// }: {
//   title: string;
//   sub?: string;
//   action?: React.ReactNode;
// }) {
//   return (
//     <div className="header">
//       <div>
//         <small>INTERVIEWPRO</small>
//         <h1>{title}</h1>
//         {sub && <p>{sub}</p>}
//       </div>
//       {action}
//     </div>
//   );
// }
// function Stat({ label, value, meta, icon: I }: any) {
//   return (
//     <div className="stat">
//       <I />
//       <span>{label}</span>
//       <b>{value}</b>
//       <small>{meta}</small>
//     </div>
//   );
// }
// function Card({ i, onBook }: { i: Interviewer; onBook: () => void }) {
//   return (
//     <div className="card">
//       <div className="row">
//         <div className="logo">{i.company[0]}</div>
//         <Badge tone="success">
//           <CheckCircle2 size={11} /> Verified
//         </Badge>
//       </div>
//       <h3>Senior {i.domain} Interviewer</h3>
//       <p>
//         {i.company} · {i.designation} · {i.experience}+ years
//       </p>
//       <div className="row">
//         <strong>{i.company}</strong>
//         <span className="rating">
//           <Star size={13} fill="currentColor" /> {i.rating}
//         </span>
//       </div>
//       <div className="tags">
//         {i.skills.map((s) => (
//           <span key={s}>{s}</span>
//         ))}
//       </div>
//       <hr />
//       <div className="row">
//         <div>
//           <small>Interview fee</small>
//           <b>₹{i.price.toLocaleString()}</b>
//         </div>
//         <button className="primary" onClick={onBook}>
//           View slots <ArrowRight size={14} />
//         </button>
//       </div>
//     </div>
//   );
// }
// function Candidate() {
//   const go = useNavigate();
//   return (
//     <>
//       <Header
//         title="Good morning, Faizan 👋"
//         sub="Prepare smarter with verified senior engineers and genuine interview feedback."
//         action={
//           <button className="primary" onClick={() => go("/interviewers")}>
//             Find an interviewer <ArrowRight size={15} />
//           </button>
//         }
//       />
//       <div className="stats">
//         <Stat
//           label="Interviews completed"
//           value="8"
//           meta="+2 this month"
//           icon={Video}
//         />
//         <Stat label="Average score" value="82%" meta="Top 24%" icon={Star} />
//         <Stat
//           label="Next interview"
//           value="23 Aug"
//           meta="Amazon · 10 AM"
//           icon={CalendarDays}
//         />
//         <Stat
//           label="Prep streak"
//           value="18 days"
//           meta="Keep going"
//           icon={BarChart3}
//         />
//       </div>
//       <div className="cols">
//         <div className="panel">
//           <div className="row">
//             <div>
//               <h2>Upcoming interview</h2>
//               <p>Join when the session starts.</p>
//             </div>
//             <Badge tone="info">Tomorrow</Badge>
//           </div>
//           <div className="upcoming">
//             <div className="date">
//               <b>23</b>
//               <small>AUG</small>
//             </div>
//             <div>
//               <h3>Java + Spring Boot — Senior</h3>
//               <p>
//                 <Building2 size={13} /> Amazon · SDE-3
//               </p>
//               <p>
//                 <Clock size={13} /> 10:00 AM · 60 minutes
//               </p>
//             </div>
//             <button className="secondary" onClick={() => go("/room")}>
//               Interview room
//             </button>
//           </div>
//         </div>
//         <div className="panel center">
//           <h2>Latest feedback</h2>
//           <p>Last mock interview</p>
//           <div className="score">
//             78<small>/100</small>
//           </div>
//           <div className="metrics">
//             <span>
//               Technical <b>76%</b>
//             </span>
//             <span>
//               Communication <b>82%</b>
//             </span>
//             <span>
//               Problem solving <b>79%</b>
//             </span>
//           </div>
//           <Link to="/feedback">View report</Link>
//         </div>
//       </div>
//       <div className="panel">
//         <div className="row">
//           <div>
//             <h2>Recommended interviewers</h2>
//             <p>Based on Java + Spring Boot.</p>
//           </div>
//           <Link to="/interviewers">Explore all</Link>
//         </div>
//         <div className="grid">
//           {interviewers.slice(0, 3).map((i) => (
//             <Card i={i} onBook={() => go("/book/" + i.id)} key={i.id} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
// function Find() {
//   const go = useNavigate();
//   const [c, setC] = useState("All");
//   const [d, setD] = useState("All");
//   const [q, setQ] = useState("");
//   const cs = [
//     "All",
//     ...Array.from(new Set(interviewers.map((i) => i.company))),
//   ];
//   const ds = ["All", ...Array.from(new Set(interviewers.map((i) => i.domain)))];
//   const list = interviewers.filter(
//     (i) =>
//       (c === "All" || i.company === c) &&
//       (d === "All" || i.domain === d) &&
//       `${i.company} ${i.domain} ${i.designation}`
//         .toLowerCase()
//         .includes(q.toLowerCase()),
//   );
//   return (
//     <>
//       <Header
//         title="Find your interviewer"
//         sub="Choose by company, seniority and technical domain. Interviewers are always senior to the candidate."
//       />
//       <div className="filters">
//         <input
//           placeholder="Search company, skill or role..."
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//         />
//         <select value={c} onChange={(e) => setC(e.target.value)}>
//           {cs.map((x) => (
//             <option key={x}>{x}</option>
//           ))}
//         </select>
//         <select value={d} onChange={(e) => setD(e.target.value)}>
//           {ds.map((x) => (
//             <option key={x}>{x}</option>
//           ))}
//         </select>
//       </div>
//       <div className="notice">
//         <ShieldCheck />
//         <div>
//           <b>Verified & confidential</b>
//           <span>
//             Interviewers are verified through company-domain email. Personal
//             identity remains hidden from candidates.
//           </span>
//         </div>
//       </div>
//       <div className="grid">
//         {list.map((i) => (
//           <Card i={i} onBook={() => go("/book/" + i.id)} key={i.id} />
//         ))}
//       </div>
//     </>
//   );
// }
// function Book({ id }: { id: string }) {
//   const go = useNavigate();
//   const i = interviewers.find((x) => x.id === id)!;
//   const [slot, setSlot] = useState(i.slots[0]);
//   return (
//     <>
//       <Header
//         title="Reserve your interview"
//         sub="Select a time slot and complete the mock payment."
//       />
//       <div className="bookgrid">
//         <div className="panel">
//           <div className="profile">
//             <div className="logo big">{i.company[0]}</div>
//             <div>
//               <Badge tone="success">Verified</Badge>
//               <h2>Senior {i.domain} Interviewer</h2>
//               <p>
//                 {i.company} · {i.designation} · {i.experience}+ years
//               </p>
//             </div>
//           </div>
//           <div className="conf">
//             <LockKeyhole size={15} /> Interviewer identity is confidential and
//             protected.
//           </div>
//           <h3>Choose a time slot</h3>
//           <div className="slots">
//             {i.slots.map((s) => (
//               <button
//                 className={slot === s ? "selected" : ""}
//                 onClick={() => setSlot(s)}
//                 key={s}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//           <h3>Interview format</h3>
//           <div className="format">
//             <Video />
//             <div>
//               <b>InterviewPro secure room</b>
//               <p>Video, screen sharing, chat and recording.</p>
//             </div>
//             <Badge tone="info">60 min</Badge>
//           </div>
//         </div>
//         <div className="panel summary">
//           <h3>Order summary</h3>
//           <div className="line">
//             <span>Interview</span>
//             <b>₹{i.price.toLocaleString()}</b>
//           </div>
//           <div className="line">
//             <span>Platform fee</span>
//             <b>₹0</b>
//           </div>
//           <hr />
//           <div className="line">
//             <b>Total</b>
//             <b>₹{i.price.toLocaleString()}</b>
//           </div>
//           <button
//             className="primary full"
//             onClick={() => go("/payment/" + i.id)}
//           >
//             Continue to payment
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
// function Payment({ id }: { id: string }) {
//   const go = useNavigate();
//   const i = interviewers.find((x) => x.id === id)!;
//   return (
//     <>
//       <Header
//         title="Confirm payment"
//         sub="Mock checkout — no real money will be charged."
//       />
//       <div className="bookgrid">
//         <div className="panel">
//           <h2>Payment method</h2>
//           <div className="pay">
//             <CreditCard />
//             <div>
//               <b>Card ending 4242</b>
//               <p>Mock payment method</p>
//             </div>
//             <Badge tone="success">Selected</Badge>
//           </div>
//           <div className="pay">
//             <Wallet />
//             <div>
//               <b>UPI</b>
//               <p>Google Pay · PhonePe</p>
//             </div>
//           </div>
//           <button className="primary full" onClick={() => go("/success")}>
//             Pay ₹{i.price.toLocaleString()} <ShieldCheck size={15} />
//           </button>
//         </div>
//         <div className="panel">
//           <h2>Interview summary</h2>
//           <div className="line">
//             <span>Company</span>
//             <b>{i.company}</b>
//           </div>
//           <div className="line">
//             <span>Designation</span>
//             <b>{i.designation}</b>
//           </div>
//           <div className="line">
//             <span>Domain</span>
//             <b>{i.domain}</b>
//           </div>
//           <div className="line">
//             <span>Duration</span>
//             <b>60 minutes</b>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// function Success() {
//   const go = useNavigate();
//   return (
//     <div className="success">
//       <div>
//         <CheckCircle2 size={46} />
//       </div>
//       <h1>Interview booked successfully</h1>
//       <p>Payment was successful and your interview slot is confirmed.</p>
//       <div className="successbox">
//         <b>23 August 2026</b>
//         <b>10:00 AM</b>
//         <b>Java + Spring Boot</b>
//       </div>
//       <button className="primary" onClick={() => go("/bookings")}>
//         View my interviews
//       </button>
//     </div>
//   );
// }
// function Bookings() {
//   const go = useNavigate();
//   return (
//     <>
//       <Header
//         title="My interviews"
//         sub="Track upcoming sessions and review completed outcomes."
//       />
//       <div className="panel table">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Interview</th>
//               <th>Company</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Score</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {interviews.map((x) => (
//               <tr key={x.id}>
//                 <td>{x.id}</td>
//                 <td>
//                   <b>{x.domain}</b>
//                   <small>{x.role}</small>
//                 </td>
//                 <td>{x.company}</td>
//                 <td>
//                   {x.date}
//                   <small>{x.time}</small>
//                 </td>
//                 <td>
//                   <Badge tone={x.status === "Upcoming" ? "info" : "success"}>
//                     {x.status}
//                   </Badge>
//                 </td>
//                 <td>{x.score || "—"}</td>
//                 <td>
//                   {x.status === "Upcoming" ? (
//                     <button className="secondary" onClick={() => go("/room")}>
//                       Join
//                     </button>
//                   ) : (
//                     <Link to="/feedback">Feedback</Link>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
// function Feedback() {
//   return (
//     <>
//       <Header
//         title="Your feedback"
//         sub="Actionable reports from your mock interviews, retained for long-term preparation."
//       />
//       <div className="feedbackgrid">
//         {feedback.map((f) => (
//           <div className="panel" key={f.date}>
//             <div className="row">
//               <div>
//                 <Badge tone="info">{f.domain}</Badge>
//                 <p>{f.date}</p>
//               </div>
//               <strong className="bigscore">{f.score}/100</strong>
//             </div>
//             <h3>Performance</h3>
//             {[
//               ["Technical", f.technical],
//               ["Communication", f.communication],
//               ["Problem solving", f.problem],
//             ].map(([n, v]) => (
//               <div className="bar" key={n as string}>
//                 <span>{n}</span>
//                 <div>
//                   <i style={{ width: `${v}%` }} />
//                 </div>
//                 <b>{v}%</b>
//               </div>
//             ))}
//             <hr />
//             <h3>Strengths</h3>
//             {f.strengths.map((x) => (
//               <p key={x}>
//                 <CheckCircle2 size={14} /> {x}
//               </p>
//             ))}
//             <h3>Focus next</h3>
//             {f.focus.map((x) => (
//               <p key={x}>
//                 <AlertTriangle size={14} /> {x}
//               </p>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
// function Room() {
//   return (
//     <div className="room">
//       <div className="roomtop">
//         <div className="brand">
//           <b>IP</b> InterviewPro
//         </div>
//         <Badge tone="danger">● REC 00:38:42</Badge>
//       </div>
//       <div className="videos">
//         <div className="video">
//           <span>Interviewer · Amazon SDE-3</span>
//           <strong>AI</strong>
//         </div>
//         <div className="video smallvideo">
//           <span>You</span>
//           <strong>MF</strong>
//         </div>
//       </div>
//       <div className="roomfooter">
//         <div>
//           <h2>Java + Spring Boot Mock Interview</h2>
//           <p>
//             Secure room · interviewer identity is protected · platform recording
//             enabled.
//           </p>
//         </div>
//         <div>
//           <button>Mute</button>
//           <button>Camera</button>
//           <button>Share screen</button>
//           <button className="leave">Leave</button>
//         </div>
//       </div>
//       <div className="chat">
//         <MessageSquare size={17} /> Interview chat · Mock chat area
//       </div>
//     </div>
//   );
// }
// function Interviewer() {
//   return (
//     <>
//       <Header
//         title="Interviewer dashboard"
//         sub="Manage your verified profile, availability and mock interviews."
//       />
//       <div className="stats">
//         <Stat
//           label="Upcoming"
//           value="6"
//           meta="Next today 4 PM"
//           icon={CalendarDays}
//         />
//         <Stat
//           label="Completed"
//           value="184"
//           meta="+17 this month"
//           icon={Video}
//         />
//         <Stat label="Rating" value="4.9" meta="184 reviews" icon={Star} />
//         <Stat
//           label="Earnings"
//           value="₹46,280"
//           meta="This month"
//           icon={Wallet}
//         />
//       </div>
//       <div className="cols">
//         <div className="panel">
//           <div className="row">
//             <div>
//               <h2>Verification</h2>
//               <p>Company identity verified.</p>
//             </div>
//             <Badge tone="success">Verified</Badge>
//           </div>
//           <div className="verify">
//             <ShieldCheck />
//             <div>
//               <b>Amazon · SDE-3</b>
//               <p>9 years · Java + Spring Boot</p>
//               <small>Verified through company domain email</small>
//             </div>
//           </div>
//         </div>
//         <div className="panel">
//           <h2>Next interview</h2>
//           <p>Candidate identity is shown only inside the secure room.</p>
//           <div className="upcoming">
//             <div className="date">
//               <b>21</b>
//               <small>AUG</small>
//             </div>
//             <div>
//               <b>Java Backend Interview</b>
//               <p>
//                 <Clock size={13} /> 4:00 PM · 60 minutes
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// function Admin() {
//   return (
//     <>
//       <Header
//         title="Platform overview"
//         sub="Manage verification, interviews, payments and platform operations."
//       />
//       <div className="stats">
//         <Stat
//           label="Candidates"
//           value="12,482"
//           meta="+8.2% this month"
//           icon={Users}
//         />
//         <Stat
//           label="Verified interviewers"
//           value="384"
//           meta="27 pending"
//           icon={ShieldCheck}
//         />
//         <Stat
//           label="Interviews"
//           value="2,841"
//           meta="91% completed"
//           icon={Video}
//         />
//         <Stat label="Revenue" value="₹68.4L" meta="August 2026" icon={Wallet} />
//       </div>
//       <div className="cols">
//         <div className="panel">
//           <h2>Verification queue</h2>
//           <p>Interviewers awaiting review.</p>
//           {interviewers.slice(0, 4).map((i) => (
//             <div className="adminrow" key={i.id}>
//               <div className="logo">{i.company[0]}</div>
//               <div>
//                 <b>
//                   {i.company} · {i.designation}
//                 </b>
//                 <small>
//                   {i.domain} · {i.experience} years
//                 </small>
//               </div>
//               <Badge tone="warning">Review</Badge>
//             </div>
//           ))}
//         </div>
//         <div className="panel">
//           <h2>Revenue by domain</h2>
//           {[
//             ["Java / Spring Boot", "₹28.4L"],
//             ["Frontend", "₹14.2L"],
//             ["Blockchain", "₹11.8L"],
//             ["AI / ML", "₹9.6L"],
//           ].map((x) => (
//             <div className="line" key={x[0]}>
//               <span>{x[0]}</span>
//               <b>{x[1]}</b>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
// function AdminTable() {
//   return (
//     <>
//       <Header title="Management" sub="Mock administration table." />
//       <div className="panel table">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Company</th>
//               <th>Designation</th>
//               <th>Domain</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {interviewers.map((i, n) => (
//               <tr key={i.id}>
//                 <td>INT-{100 + n}</td>
//                 <td>{i.company}</td>
//                 <td>{i.designation}</td>
//                 <td>{i.domain}</td>
//                 <td>
//                   <Badge tone="success">Verified</Badge>
//                 </td>
//                 <td>
//                   <button className="text">Review</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
// function Login({ setRole }: { setRole: (r: Role) => void }) {
//   const go = useNavigate();
//   return (
//     <div className="login">
//       <div className="loginbox">
//         <div className="brand dark">
//           <b>IP</b> InterviewPro
//         </div>
//         <h1>Welcome back</h1>
//         <p>Sign in to your interview workspace.</p>
//         <input placeholder="Username / email" />
//         <input type="password" placeholder="Password" />
//         <button
//           className="primary full"
//           onClick={() => {
//             setRole("candidate");
//             go("/dashboard");
//           }}
//         >
//           Sign in <ArrowRight size={15} />
//         </button>
//         <div className="demo">
//           <b>Mock accounts</b>
//           <span>Candidate: faizan@example.com</span>
//           <span>Interviewer: interviewer@company.com</span>
//           <span>Admin: admin@interviewpro.com</span>
//         </div>
//       </div>
//     </div>
//   );
// }
// function App() {
//   const [role, setRole] = useState<Role>("candidate");
//   return (
//     <Routes>
//       <Route path="/login" element={<Login setRole={setRole} />} />
//       <Route
//         path="/"
//         element={
//           <Layout role={role} setRole={setRole}>
//             <Candidate />
//           </Layout>
//         }
//       />
//       <Route
//         path="*"
//         element={
//           <Layout role={role} setRole={setRole}>
//             <PageRoutes />
//           </Layout>
//         }
//       />
//     </Routes>
//   );
// }
// function PageRoutes() {
//   const loc = useLocation();
//   const path = loc.pathname;
//   if (path === "/dashboard") return <Candidate />;
//   if (path === "/interviewers") return <Find />;
//   if (path.startsWith("/book/")) return <Book id={path.split("/")[2]} />;
//   if (path.startsWith("/payment/")) return <Payment id={path.split("/")[2]} />;
//   if (path === "/success") return <Success />;
//   if (path === "/bookings") return <Bookings />;
//   if (path === "/feedback") return <Feedback />;
//   if (path === "/room") return <Room />;
//   if (path === "/interviewer") return <Interviewer />;
//   if (path === "/availability")
//     return (
//       <>
//         <Header title="Availability" sub="Create slots candidates can book." />
//         <div className="panel calendar">
//           <h2>August 2026</h2>
//           {Array.from({ length: 31 }, (_, n) => (
//             <div className={n % 4 === 0 ? "cal active" : "cal"} key={n}>
//               {n + 1}
//               {n % 4 === 0 && <small>2 slots</small>}
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   if (path === "/interviewer/interviews") return <Bookings />;
//   if (path === "/interviewer/feedback") return <Feedback />;
//   if (path === "/admin") return <Admin />;
//   if (path.startsWith("/admin/")) return <AdminTable />;
//   return <Header title="Settings" sub="Mock settings page." />;
// }
// createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );
