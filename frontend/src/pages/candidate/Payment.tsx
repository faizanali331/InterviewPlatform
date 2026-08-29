import { CreditCard, ShieldCheck, Wallet } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import InterviewSummary from "../../components/interview/InterviewSummary";

import { interviewers } from "../../data/interviewers";

export default function Payment() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const interviewer = interviewers.find((item) => item.id === id);

  if (!interviewer) {
    return (
      <div className="panel center">
        <h2>Interviewer not found</h2>

        <button className="primary" onClick={() => navigate("/interviewers")}>
          Back to interviewers
        </button>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Confirm payment"
        sub="Mock checkout — no real money will be charged."
      />

      <div className="bookgrid">
        <div className="panel">
          <h2>Payment method</h2>

          <div className="pay">
            <CreditCard />

            <div>
              <b>Card ending 4242</b>
              <p>Mock payment method</p>
            </div>

            <Badge tone="success">Selected</Badge>
          </div>

          <div className="pay">
            <Wallet />

            <div>
              <b>UPI</b>
              <p>Google Pay · PhonePe</p>
            </div>
          </div>

          <button className="primary full" onClick={() => navigate("/success")}>
            Pay ₹{interviewer.price.toLocaleString()}
            <ShieldCheck size={15} />
          </button>
        </div>

        <InterviewSummary
          interviewer={interviewer}
          selectedSlot={interviewer.slots[0]}
        />
      </div>
    </>
  );
}
