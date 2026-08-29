import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import { interviewers } from "../../data/interviewers";

export default function ManageInterviewers() {
  return (
    <>
      <Header
        title="Manage interviewers"
        sub="Review, verify and manage registered interviewers."
      />

      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Domain</th>
              <th>Experience</th>
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

                <td>{interviewer.experience} years</td>

                <td>
                  <Badge tone="success">Verified</Badge>
                </td>

                <td>
                  <button className="text">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
