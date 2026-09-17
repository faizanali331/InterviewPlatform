import { ArrowRight, CheckCircle2 } from "lucide-react";

import Badge from "../common/Badge";
import type { InterviewerProfile } from "../../types/interviewer";

type InterviewerProfileCardProps = {
  interviewer: InterviewerProfile;
  onBook: () => void;
};

export default function InterviewerProfileCard({
  interviewer,
  onBook,
}: InterviewerProfileCardProps) {
  const displayCompany = interviewer.companyName ?? "Independent";

  return (
    <div className="card">
      <div className="row">
        <div className="logo">{displayCompany[0]}</div>

        <Badge tone="success">
          <CheckCircle2 size={11} />
          Verified
        </Badge>
      </div>

      <h3>{interviewer.designationTitle}</h3>

      <p>
        {displayCompany} · {interviewer.levelName} ·{" "}
        {interviewer.yearsOfExperience}+ years
      </p>

      <div className="tags">
        {interviewer.domains.map((domain) => (
          <span key={domain.id}>{domain.name}</span>
        ))}
      </div>

      <hr />

      <div className="row">
        <div>
          <small>Interview fee</small>
          <b>Pricing coming soon</b>
        </div>

        <button className="primary" onClick={onBook}>
          View profile
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
