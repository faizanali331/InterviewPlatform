import { useNavigate, Link } from "react-router-dom";

import Badge from "../common/Badge";

import type { Interview } from "../../types/interview";

type InterviewTableProps = {
  interviews: Interview[];
};

export default function InterviewTable({ interviews }: InterviewTableProps) {
  const navigate = useNavigate();

  return (
    <div className="panel table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Interview</th>
            <th>Company</th>
            <th>Date</th>
            <th>Status</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id}>
              <td>{interview.id}</td>

              <td>
                <b>{interview.domain}</b>

                <small>{interview.role}</small>
              </td>

              <td>{interview.company}</td>

              <td>
                {interview.date}

                <small>{interview.time}</small>
              </td>

              <td>
                <Badge
                  tone={
                    interview.status === "Upcoming"
                      ? "info"
                      : interview.status === "Cancelled"
                        ? "danger"
                        : "success"
                  }
                >
                  {interview.status}
                </Badge>
              </td>

              <td>{interview.score ?? "—"}</td>

              <td>
                {interview.status === "Upcoming" ? (
                  <button
                    className="secondary"
                    onClick={() => navigate("/room")}
                  >
                    Join
                  </button>
                ) : (
                  <Link to="/feedback">Feedback</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
