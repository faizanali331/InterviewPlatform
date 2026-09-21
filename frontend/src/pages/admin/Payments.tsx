import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import { getAdminPayments } from "../../api/adminApi";
import { AdminPayment } from "../../types/admin";

const STATUS_TONE: Record<
  AdminPayment["status"],
  "success" | "warning" | "danger"
> = {
  SUCCESS: "success",
  PENDING: "warning",
  FAILED: "danger",
};

export default function Payments() {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPayments()
      .then(setPayments)
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  const successfulPayments = payments.filter((p) => p.status === "SUCCESS");
  const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);

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
          <small>Successful payments only</small>
        </div>

        <div className="stat">
          <span>Successful payments</span>
          <b>{successfulPayments.length}</b>
          <small>Of {payments.length} total</small>
        </div>

        <div className="stat">
          <span>Failed payments</span>
          <b>{payments.filter((p) => p.status === "FAILED").length}</b>
          <small>Candidate can retry</small>
        </div>

        <div className="stat">
          <span>Pending payments</span>
          <b>{payments.filter((p) => p.status === "PENDING").length}</b>
          <small>Order created, not yet confirmed</small>
        </div>
      </div>

      <div className="panel table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Candidate</th>
                <th>Interviewer</th>
                <th>Domain</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>TXN-{p.id}</td>
                  <td>
                    <b>{p.candidateName}</b>
                    <small>{p.candidateEmail}</small>
                  </td>
                  <td>
                    {p.interviewerCompanyName} · {p.interviewerDesignationTitle}
                  </td>
                  <td>{p.domainName}</td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                  <td>₹{p.amount.toLocaleString()}</td>
                  <td>
                    <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={7}>No payments yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
