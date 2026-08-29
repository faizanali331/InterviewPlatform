import { ArrowRight, CheckCircle2, Star } from "lucide-react";

import Badge from "../common/Badge";

import type { Interviewer } from "../../types/interviewer";

type InterviewerCardProps = {
  interviewer: Interviewer;
  onBook: () => void;
};

export default function InterviewerCard({
  interviewer,
  onBook,
}: InterviewerCardProps) {
  return (
    <div className="card">
      <div className="row">
        <div className="logo">{interviewer.company[0]}</div>

        <Badge tone="success">
          <CheckCircle2 size={11} />
          Verified
        </Badge>
      </div>

      <h3>Senior {interviewer.domain} Interviewer</h3>

      <p>
        {interviewer.company} · {interviewer.designation} ·{" "}
        {interviewer.experience}+ years
      </p>

      <div className="row">
        <strong>{interviewer.company}</strong>

        <span className="rating">
          <Star size={13} fill="currentColor" />

          {interviewer.rating}
        </span>
      </div>

      <div className="tags">
        {interviewer.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <hr />

      <div className="row">
        <div>
          <small>Interview fee</small>

          <b>₹{interviewer.price.toLocaleString()}</b>
        </div>

        <button className="primary" onClick={onBook}>
          View slots
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
