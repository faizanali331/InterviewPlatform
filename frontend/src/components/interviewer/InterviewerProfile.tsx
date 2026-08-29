import { LockKeyhole } from "lucide-react";

import Badge from "../common/Badge";

import type { Interviewer } from "../../types/interviewer";

type InterviewerProfileProps = {
  interviewer: Interviewer;
};

export default function InterviewerProfile({
  interviewer,
}: InterviewerProfileProps) {
  return (
    <>
      <div className="profile">
        <div className="logo big">{interviewer.company[0]}</div>

        <div>
          <Badge tone="success">Verified</Badge>

          <h2>Senior {interviewer.domain} Interviewer</h2>

          <p>
            {interviewer.company} · {interviewer.designation} ·{" "}
            {interviewer.experience}+ years
          </p>
        </div>
      </div>

      <div className="conf">
        <LockKeyhole size={15} />

        <span>Interviewer identity is confidential and protected.</span>
      </div>
    </>
  );
}
