import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  Clock,
  Star,
  Video,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Stat from "../../components/common/Stat";
import Badge from "../../components/common/Badge";
import InterviewerCard from "../../components/interviewer/InterviewerCard";

import { interviewers } from "../../data/interviewers";

export default function CandidateDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Good morning, Faizan 👋"
        sub="Prepare smarter with verified senior engineers and genuine interview feedback."
        action={
          <button className="primary" onClick={() => navigate("/interviewers")}>
            Find an interviewer
            <ArrowRight size={15} />
          </button>
        }
      />

      <div className="stats">
        <Stat
          label="Interviews completed"
          value="8"
          meta="+2 this month"
          icon={Video}
        />

        <Stat label="Average score" value="82%" meta="Top 24%" icon={Star} />

        <Stat
          label="Next interview"
          value="23 Aug"
          meta="Amazon · 10 AM"
          icon={CalendarDays}
        />

        <Stat
          label="Prep streak"
          value="18 days"
          meta="Keep going"
          icon={BarChart3}
        />
      </div>

      <div className="cols">
        <div className="panel">
          <div className="row">
            <div>
              <h2>Upcoming interview</h2>

              <p>Join when the session starts.</p>
            </div>

            <Badge tone="info">Tomorrow</Badge>
          </div>

          <div className="upcoming">
            <div className="date">
              <b>23</b>
              <small>AUG</small>
            </div>

            <div>
              <h3>Java + Spring Boot — Senior</h3>

              <p>
                <Building2 size={13} />
                Amazon · SDE-3
              </p>

              <p>
                <Clock size={13} />
                10:00 AM · 60 minutes
              </p>
            </div>

            <button className="secondary" onClick={() => navigate("/room")}>
              Interview room
            </button>
          </div>
        </div>

        <div className="panel center">
          <h2>Latest feedback</h2>

          <p>Last mock interview</p>

          <div className="score">
            78
            <small>/100</small>
          </div>

          <div className="metrics">
            <span>
              Technical
              <b>76%</b>
            </span>

            <span>
              Communication
              <b>82%</b>
            </span>

            <span>
              Problem solving
              <b>79%</b>
            </span>
          </div>

          <Link to="/feedback">View report</Link>
        </div>
      </div>

      <div className="panel">
        <div className="row">
          <div>
            <h2>Recommended interviewers</h2>

            <p>Based on Java + Spring Boot.</p>
          </div>

          <Link to="/interviewers">Explore all</Link>
        </div>

        <div className="grid">
          {interviewers.slice(0, 3).map((interviewer) => (
            <InterviewerCard
              key={interviewer.id}
              interviewer={interviewer}
              onBook={() => navigate(`/book/${interviewer.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
