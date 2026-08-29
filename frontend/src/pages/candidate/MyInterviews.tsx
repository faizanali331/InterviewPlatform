import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import { interviews } from "../../data/interviews";

export default function MyInterviews() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="My interviews"
        sub="Track upcoming sessions and review completed outcomes."
      />

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
                      onClick={() => navigate("/feedback")}
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
