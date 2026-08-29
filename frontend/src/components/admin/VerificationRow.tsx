import Badge from "../common/Badge";

import type { Interviewer } from "../../types/interviewer";

type VerificationRowProps = {
  interviewer: Interviewer;
  onReview?: () => void;
};

export default function VerificationRow({
  interviewer,
  onReview,
}: VerificationRowProps) {
  return (
    <div className="adminrow">
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

      {onReview && (
        <button className="text" onClick={onReview}>
          Review
        </button>
      )}
    </div>
  );
}
