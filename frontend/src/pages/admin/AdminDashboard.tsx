import { useEffect, useState } from "react";
import { ShieldCheck, Users, Video, Wallet } from "lucide-react";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import Stat from "../../components/common/Stat";

import { getAdminStats } from "../../api/adminApi";
import { listInterviewers } from "../../api/interviewerApi";
import { AdminStats } from "../../types/admin";
import { InterviewerProfile } from "../../types/interviewer";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pending, setPending] = useState<InterviewerProfile[]>([]);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => setStats(null));
    listInterviewers("PENDING")
      .then(setPending)
      .catch(() => setPending([]));
  }, []);

  return (
    <>
      <Header
        title="Platform overview"
        sub="Manage verification, interviews, payments and platform operations."
      />

      <div className="stats">
        <Stat
          label="Candidates"
          value={stats ? String(stats.totalCandidates) : "—"}
          meta={`${stats?.totalInterviewers ?? 0} interviewers`}
          icon={Users}
        />

        <Stat
          label="Verified interviewers"
          value={stats ? String(stats.verifiedInterviewers) : "—"}
          meta={`${stats?.pendingInterviewers ?? 0} pending`}
          icon={ShieldCheck}
        />

        <Stat
          label="Bookings"
          value={stats ? String(stats.totalBookings) : "—"}
          meta={stats ? `${stats.confirmedBookings} confirmed` : ""}
          icon={Video}
        />

        <Stat
          label="Revenue"
          value={stats ? `₹${stats.totalRevenue.toLocaleString()}` : "—"}
          meta="Successful payments"
          icon={Wallet}
        />
      </div>

      <div className="cols">
        <div className="panel">
          <h2>Verification queue</h2>
          <p>Interviewers awaiting review.</p>

          {pending.slice(0, 4).map((interviewer) => (
            <div className="adminrow" key={interviewer.id}>
              <div className="logo">{(interviewer.companyName ?? "I")[0]}</div>
              <div>
                <b>
                  {interviewer.companyName ?? "Independent"} ·{" "}
                  {interviewer.designationTitle}
                </b>
                <small>
                  {interviewer.domains.map((d) => d.name).join(", ")} ·{" "}
                  {interviewer.yearsOfExperience} years
                </small>
              </div>
              <Badge tone="warning">Review</Badge>
            </div>
          ))}

          {pending.length === 0 && <p>No interviewers awaiting review.</p>}
        </div>

        <div className="panel">
          <h2>Revenue by domain</h2>

          {stats?.revenueByDomain.map((d) => (
            <div className="line" key={d.domainName}>
              <span>{d.domainName}</span>
              <b>₹{d.amount.toLocaleString()}</b>
            </div>
          ))}

          {(!stats || stats.revenueByDomain.length === 0) && (
            <p>No revenue yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
