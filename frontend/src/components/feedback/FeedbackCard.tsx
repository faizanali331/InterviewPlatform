import { AlertTriangle, CheckCircle2 } from "lucide-react";

import Badge from "../common/Badge";
import PerformanceBar from "./PerformanceBar";

import type { Feedback } from "../../types/feedback";

type FeedbackCardProps = {
  feedback: Feedback;
};

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="panel">
      <div className="row">
        <div>
          <Badge tone="info">{feedback.domain}</Badge>

          <p>{feedback.date}</p>
        </div>

        <strong className="bigscore">{feedback.score}/100</strong>
      </div>

      <h3>Performance</h3>

      <PerformanceBar label="Technical" value={feedback.technical} />

      <PerformanceBar label="Communication" value={feedback.communication} />

      <PerformanceBar label="Problem solving" value={feedback.problem} />

      <hr />

      <h3>Strengths</h3>

      {feedback.strengths.map((strength) => (
        <p key={strength}>
          <CheckCircle2 size={14} />
          {strength}
        </p>
      ))}

      <h3>Focus next</h3>

      {feedback.focus.map((item) => (
        <p key={item}>
          <AlertTriangle size={14} />
          {item}
        </p>
      ))}
    </div>
  );
}
