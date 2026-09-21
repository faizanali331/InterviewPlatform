import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/Header";

const SKILL_SCORES = [
  "Technical Knowledge",
  "Problem Solving",
  "Coding",
  "Communication",
  "System Design",
];
const READINESS = [
  "Not Ready",
  "Needs Improvement",
  "Almost Ready",
  "Interview Ready",
  "Strong",
];

export default function GiveFeedback() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [scores, setScores] = useState<Record<string, number>>({});
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [summary, setSummary] = useState("");
  const [readiness, setReadiness] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="panel center">
        <h2>Feedback submitted</h2>
        <button
          className="primary"
          onClick={() => navigate("/interviewer/interviews")}
        >
          Back to interviews
        </button>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Interview feedback"
        sub="This is shared with the candidate through their dashboard."
      />
      <div className="notice">
        <span>
          Demo only — the feedback module isn't built on the backend yet, so
          nothing here is saved.
        </span>
      </div>

      <div className="panel">
        <h3>Scores (out of 10)</h3>
        {SKILL_SCORES.map((skill) => (
          <div className="line" key={skill}>
            <span>{skill}</span>
            <input
              type="number"
              min={0}
              max={10}
              style={{ width: 60 }}
              value={scores[skill] ?? ""}
              onChange={(e) =>
                setScores((s) => ({ ...s, [skill]: Number(e.target.value) }))
              }
            />
          </div>
        ))}

        <h3>Strengths</h3>
        <textarea
          value={strengths}
          onChange={(e) => setStrengths(e.target.value)}
          placeholder="What the candidate performed well"
        />

        <h3>Weaknesses</h3>
        <textarea
          value={weaknesses}
          onChange={(e) => setWeaknesses(e.target.value)}
          placeholder="What the candidate needs to improve"
        />

        <h3>Recommendations</h3>
        <textarea
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
          placeholder="What the candidate should study"
        />

        <h3>Interview summary</h3>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Overall assessment"
        />

        <h3>Hiring readiness</h3>
        <select
          value={readiness}
          onChange={(e) => setReadiness(e.target.value)}
        >
          <option value="">Select</option>
          {READINESS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button className="primary full" onClick={() => setSubmitted(true)}>
          Submit feedback
        </button>
      </div>
    </>
  );
}
