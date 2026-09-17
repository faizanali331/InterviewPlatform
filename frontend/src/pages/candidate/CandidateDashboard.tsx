import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Stat from "../../components/common/Stat";
import Badge from "../../components/common/Badge";
import InterviewerProfileCard from "../../components/interviewer/InterviewerProfileCard";

import { getMyBookingsAsCandidate } from "../../api/bookingApi";
import { searchInterviewers } from "../../api/interviewerApi";
import { useAuth } from "../../context/AuthContext";
import { Booking } from "../../types/booking";
import { InterviewerProfile } from "../../types/interviewer";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [recommended, setRecommended] = useState<InterviewerProfile[]>([]);

  useEffect(() => {
    getMyBookingsAsCandidate()
      .then(setBookings)
      .catch(() => setBookings([]));
    searchInterviewers()
      .then((list) => setRecommended(list.slice(0, 3)))
      .catch(() => setRecommended([]));
  }, []);

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const nextInterview = [...confirmed].sort((a, b) =>
    a.slotDate.localeCompare(b.slotDate),
  )[0];

  return (
    <>
      <Header
        title={`Welcome, ${user?.email ?? "Candidate"} 👋`}
        sub="Prepare smarter with verified senior engineers."
        action={
          <button className="primary" onClick={() => navigate("/interviewers")}>
            Find an interviewer
            <ArrowRight size={15} />
          </button>
        }
      />

      <div className="stats">
        <Stat
          label="Total bookings"
          value={String(bookings.length)}
          meta="All time"
          icon={Video}
        />
        <Stat
          label="Upcoming (confirmed)"
          value={String(confirmed.length)}
          meta="Ready to attend"
          icon={CalendarDays}
        />
      </div>

      <div className="cols">
        <div className="panel">
          <div className="row">
            <div>
              <h2>Upcoming interview</h2>
              <p>
                {nextInterview
                  ? "Join when the session starts."
                  : "Nothing scheduled yet."}
              </p>
            </div>
            {nextInterview && <Badge tone="info">Confirmed</Badge>}
          </div>

          {nextInterview ? (
            <div className="upcoming">
              <div className="date">
                <b>{nextInterview.slotDate.slice(8, 10)}</b>
                <small>{nextInterview.slotDate.slice(5, 7)}</small>
              </div>
              <div>
                <h3>
                  {nextInterview.domainName} —{" "}
                  {nextInterview.interviewerDesignationTitle}
                </h3>
                <p>
                  <Building2 size={13} />
                  {nextInterview.interviewerCompanyName}
                </p>
                <p>
                  <Clock size={13} />
                  {nextInterview.startTime.slice(0, 5)}
                </p>
              </div>
              <button className="secondary" disabled>
                Interview room (not built yet)
              </button>
            </div>
          ) : (
            <p>Book your first mock interview to see it here.</p>
          )}
        </div>

        <div className="panel center">
          <h2>Feedback</h2>
          <p>
            Feedback reports aren't available yet — this feature is still being
            built.
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="row">
          <div>
            <h2>Interviewers you're eligible for</h2>
            <p>Based on your current level.</p>
          </div>
          <Link to="/interviewers">Explore all</Link>
        </div>

        <div className="grid">
          {recommended.map((interviewer) => (
            <InterviewerProfileCard
              key={interviewer.id}
              interviewer={interviewer}
              onBook={() => navigate(`/book/${interviewer.id}`)}
            />
          ))}
          {recommended.length === 0 && (
            <p>Set your current level to see eligible interviewers here.</p>
          )}
        </div>
      </div>
    </>
  );
}
