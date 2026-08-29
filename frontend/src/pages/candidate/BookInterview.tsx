import { useState } from "react";
import { Video } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import InterviewerProfile from "../../components/interviewer/InterviewerProfile";
import InterviewSummary from "../../components/interview/InterviewSummary";

import { interviewers } from "../../data/interviewers";

export default function BookInterview() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const interviewer = interviewers.find((item) => item.id === id);

  if (!interviewer) {
    return (
      <div className="panel center">
        <h2>Interviewer not found</h2>

        <p>The interviewer you're looking for doesn't exist.</p>

        <button className="primary" onClick={() => navigate("/interviewers")}>
          Back to interviewers
        </button>
      </div>
    );
  }

  return <BookingContent interviewer={interviewer} />;
}

type BookingContentProps = {
  interviewer: (typeof interviewers)[number];
};

function BookingContent({ interviewer }: BookingContentProps) {
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState(interviewer.slots[0]);

  return (
    <>
      <Header
        title="Reserve your interview"
        sub="Select a time slot and complete the mock payment."
      />

      <div className="bookgrid">
        <div className="panel">
          <InterviewerProfile interviewer={interviewer} />

          <h3>Choose a time slot</h3>

          <div className="slots">
            {interviewer.slots.map((slot) => (
              <button
                key={slot}
                className={selectedSlot === slot ? "selected" : ""}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <h3>Interview format</h3>

          <div className="format">
            <Video />

            <div>
              <b>InterviewPro secure room</b>

              <p>Video, screen sharing, chat and recording.</p>
            </div>

            <Badge tone="info">60 min</Badge>
          </div>
        </div>

        <div>
          <InterviewSummary
            interviewer={interviewer}
            selectedSlot={selectedSlot}
          />

          <button
            className="primary full"
            onClick={() => navigate(`/payment/${interviewer.id}`)}
          >
            Continue to payment
          </button>
        </div>
      </div>
    </>
  );
}
