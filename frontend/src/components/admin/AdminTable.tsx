import Badge from "../common/Badge";

import type { Interviewer } from "../../types/interviewer";

type AdminTableProps = {
  interviewers: Interviewer[];
  onReview?: (interviewer: Interviewer) => void;
};

export default function AdminTable({
  interviewers,
  onReview,
}: AdminTableProps) {
  return (
    <div className="panel table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Domain</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {interviewers.map((interviewer, index) => (
            <tr key={interviewer.id}>
              <td>INT-{100 + index}</td>

              <td>{interviewer.company}</td>

              <td>{interviewer.designation}</td>

              <td>{interviewer.domain}</td>

              <td>
                <Badge tone="success">Verified</Badge>
              </td>

              <td>
                <button
                  className="text"
                  onClick={() => onReview?.(interviewer)}
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
