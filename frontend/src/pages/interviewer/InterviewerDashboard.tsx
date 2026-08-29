import {
  CalendarDays,
  Clock,
  ShieldCheck,
  Star,
  Video,
  Wallet,
} from "lucide-react";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import Stat from "../../components/common/Stat";

export default function InterviewerDashboard() {
  return (
    <>
      <Header
        title="Interviewer dashboard"
        sub="Manage your verified profile, availability and mock interviews."
      />

      <div className="stats">
        <Stat
          label="Upcoming"
          value="6"
          meta="Next today 4 PM"
          icon={CalendarDays}
        />

        <Stat
          label="Completed"
          value="184"
          meta="+17 this month"
          icon={Video}
        />

        <Stat label="Rating" value="4.9" meta="184 reviews" icon={Star} />

        <Stat
          label="Earnings"
          value="₹46,280"
          meta="This month"
          icon={Wallet}
        />
      </div>

      <div className="cols">
        <div className="panel">
          <div className="row">
            <div>
              <h2>Verification</h2>

              <p>Company identity verified.</p>
            </div>

            <Badge tone="success">Verified</Badge>
          </div>

          <div className="verify">
            <ShieldCheck />

            <div>
              <b>Amazon · SDE-3</b>

              <p>9 years · Java + Spring Boot</p>

              <small>Verified through company domain email</small>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Next interview</h2>

          <p>Candidate identity is shown only inside the secure room.</p>

          <div className="upcoming">
            <div className="date">
              <b>21</b>
              <small>AUG</small>
            </div>

            <div>
              <b>Java Backend Interview</b>

              <p>
                <Clock size={13} />
                4:00 PM · 60 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
