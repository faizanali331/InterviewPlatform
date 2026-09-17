import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import { getInterviewerById } from "../../api/interviewerApi";
import { getOpenSlots } from "../../api/availabilityApi";
import { createBooking } from "../../api/bookingApi";
import { ApiClientError } from "../../api/apiClient";
import { InterviewerProfile } from "../../types/interviewer";
import { AvailabilitySlot } from "../../types/booking";

export default function BookInterview() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const interviewerId = Number(id);

  const [interviewer, setInterviewer] = useState<InterviewerProfile | null>(
    null,
  );
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [domainId, setDomainId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      getInterviewerById(interviewerId),
      getOpenSlots(interviewerId),
    ])
      .then(([i, s]) => {
        setInterviewer(i);
        setSlots(s);
        if (i.domains.length > 0) setDomainId(i.domains[0].id);
      })
      .catch(() => setInterviewer(null))
      .finally(() => setLoading(false));
  }, [interviewerId]);

  if (loading) return <p>Loading...</p>;

  if (!interviewer) {
    return (
      <div className="panel center">
        <h2>Interviewer not found</h2>
        <p>This interviewer may no longer be active.</p>
        <button className="primary" onClick={() => navigate("/interviewers")}>
          Back to interviewers
        </button>
      </div>
    );
  }

  const handleConfirm = async () => {
    setError(null);
    if (!selectedSlotId || !domainId) {
      setError("Please select a slot and a domain.");
      return;
    }

    setSubmitting(true);
    try {
      const booking = await createBooking({
        availabilitySlotId: selectedSlotId,
        domainId,
      });
      navigate("/bookings", { state: { justBooked: booking } });
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header
        title="Reserve your interview"
        sub="Select a domain and a time slot."
      />

      {error && <div className="error">{error}</div>}

      <div className="bookgrid">
        <div className="panel">
          <div className="profile">
            <div className="logo big">
              {(interviewer.companyName ?? "I")[0]}
            </div>
            <div>
              <Badge tone="success">Verified</Badge>
              <h2>{interviewer.designationTitle}</h2>
              <p>
                {interviewer.companyName ?? "Independent"} ·{" "}
                {interviewer.levelName} · {interviewer.yearsOfExperience}+ years
              </p>
            </div>
          </div>

          <h3>Domain</h3>
          <select
            value={domainId ?? ""}
            onChange={(e) => setDomainId(Number(e.target.value))}
          >
            {interviewer.domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <h3>Choose a time slot</h3>
          <div className="slots">
            {slots.map((slot) => (
              <button
                key={slot.id}
                className={selectedSlotId === slot.id ? "selected" : ""}
                onClick={() => setSelectedSlotId(slot.id)}
              >
                {slot.slotDate} · {slot.startTime.slice(0, 5)}
              </button>
            ))}
            {slots.length === 0 && <p>No open slots right now.</p>}
          </div>

          <h3>Interview format</h3>
          <div className="format">
            <Video />
            <div>
              <b>InterviewPro secure room</b>
              <p>Video, screen sharing, chat and recording.</p>
            </div>
            <Badge tone="info">Room not built yet</Badge>
          </div>
        </div>

        <div>
          <div className="panel summary">
            <h3>Interview summary</h3>
            <div className="line">
              <span>Company</span>
              <b>{interviewer.companyName ?? "Independent"}</b>
            </div>
            <div className="line">
              <span>Designation</span>
              <b>{interviewer.designationTitle}</b>
            </div>
            <div className="line">
              <span>Fee</span>
              <b>Pricing coming soon</b>
            </div>
          </div>

          <button
            className="primary full"
            onClick={handleConfirm}
            disabled={submitting || slots.length === 0}
          >
            {submitting ? "Booking..." : "Confirm booking"}
          </button>
        </div>
      </div>
    </>
  );
}
