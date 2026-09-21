import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/Header";

const CATEGORIES = [
  "Professionalism",
  "Interview Quality",
  "Technical Relevance",
  "Communication",
  "Platform Experience",
];

export default function RateInterview() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="panel center">
        <h2>Thanks for your feedback</h2>
        <button className="primary" onClick={() => navigate("/bookings")}>
          Back to my interviews
        </button>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Rate your interview"
        sub="Your rating never reveals your identity to the interviewer."
      />
      <div className="notice">
        <span>Demo only — ratings aren't saved to the backend yet.</span>
      </div>

      <div className="panel">
        {CATEGORIES.map((cat) => (
          <div className="line" key={cat}>
            <span>{cat}</span>
            <div>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={ratings[cat] === n ? "selected" : ""}
                  onClick={() => setRatings((r) => ({ ...r, [cat]: n }))}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="primary full" onClick={() => setSubmitted(true)}>
          Submit rating
        </button>
      </div>
    </>
  );
}
