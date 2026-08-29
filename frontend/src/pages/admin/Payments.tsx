import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import { interviews } from "../../data/interviews";

export default function Payments() {
  const totalRevenue = interviews.reduce(
    (total, interview) => total + interview.amount,
    0,
  );

  return (
    <>
      <Header
        title="Payments"
        sub="Monitor interview payments and platform revenue."
      />

      <div className="stats">
        <div className="stat">
          <span>Total revenue</span>

          <b>₹{totalRevenue.toLocaleString()}</b>

          <small>From current mock data</small>
        </div>

        <div className="stat">
          <span>Successful payments</span>

          <b>{interviews.length}</b>

          <small>All transactions</small>
        </div>

        <div className="stat">
          <span>Platform fee</span>

          <b>₹0</b>

          <small>Mock platform</small>
        </div>

        <div className="stat">
          <span>Refunds</span>

          <b>₹0</b>

          <small>No refunds</small>
        </div>
      </div>

      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Interview</th>
              <th>Company</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td>TXN-{interview.id}</td>

                <td>
                  <b>{interview.domain}</b>

                  <small>{interview.id}</small>
                </td>

                <td>{interview.company}</td>

                <td>
                  {interview.date}

                  <small>{interview.time}</small>
                </td>

                <td>₹{interview.amount.toLocaleString()}</td>

                <td>
                  <Badge tone="success">Paid</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
