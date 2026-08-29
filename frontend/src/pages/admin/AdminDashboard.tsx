import { ShieldCheck, Users, Video, Wallet } from "lucide-react";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import Stat from "../../components/common/Stat";

import { interviewers } from "../../data/interviewers";

export default function AdminDashboard() {
  return (
    <>
      <Header
        title="Platform overview"
        sub="Manage verification, interviews, payments and platform operations."
      />

      <div className="stats">
        <Stat
          label="Candidates"
          value="12,482"
          meta="+8.2% this month"
          icon={Users}
        />

        <Stat
          label="Verified interviewers"
          value="384"
          meta="27 pending"
          icon={ShieldCheck}
        />

        <Stat
          label="Interviews"
          value="2,841"
          meta="91% completed"
          icon={Video}
        />

        <Stat label="Revenue" value="₹68.4L" meta="August 2026" icon={Wallet} />
      </div>

      <div className="cols">
        <div className="panel">
          <h2>Verification queue</h2>

          <p>Interviewers awaiting review.</p>

          {interviewers.slice(0, 4).map((interviewer) => (
            <div className="adminrow" key={interviewer.id}>
              <div className="logo">{interviewer.company[0]}</div>

              <div>
                <b>
                  {interviewer.company} · {interviewer.designation}
                </b>

                <small>
                  {interviewer.domain} · {interviewer.experience} years
                </small>
              </div>

              <Badge tone="warning">Review</Badge>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>Revenue by domain</h2>

          {[
            ["Java / Spring Boot", "₹28.4L"],
            ["Frontend", "₹14.2L"],
            ["Blockchain", "₹11.8L"],
            ["AI / ML", "₹9.6L"],
          ].map(([domain, revenue]) => (
            <div className="line" key={domain}>
              <span>{domain}</span>
              <b>{revenue}</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
