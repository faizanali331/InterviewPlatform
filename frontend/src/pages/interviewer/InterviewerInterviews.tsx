import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import { interviews } from "../../data/interviews";

export default function InterviewerInterviews() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="My interviews"
        sub="Manage upcoming and completed candidate interviews."
      />

      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Interview</th>
              <th>Date</th>
              <th>Status</th>
              <th>Score</th>
              <th>Action</th>
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

                <td>
                  {interview.date}

                  <small>{interview.time}</small>
                </td>

                <td>
                  <Badge
                    tone={interview.status === "Upcoming" ? "info" : "success"}
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
                    <button
                      className="text"
                      onClick={() => navigate("/interviewer/feedback")}
                    >
                      Feedback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
