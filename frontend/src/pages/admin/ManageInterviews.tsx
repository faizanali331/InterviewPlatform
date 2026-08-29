import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import { interviews } from "../../data/interviews";

export default function ManageInterviews() {
  return (
    <>
      <Header
        title="Manage interviews"
        sub="Monitor scheduled, completed and cancelled interviews."
      />

      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Candidate</th>
              <th>Company</th>
              <th>Domain</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td>{interview.id}</td>

                <td>
                  <b>Candidate</b>

                  <small>Anonymous</small>
                </td>

                <td>{interview.company}</td>

                <td>{interview.domain}</td>

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

                <td>₹{interview.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
