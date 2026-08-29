import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success">
      <div>
        <CheckCircle2 size={46} />
      </div>

      <h1>Interview booked successfully</h1>

      <p>Payment was successful and your interview slot is confirmed.</p>

      <div className="successbox">
        <b>23 August 2026</b>
        <b>10:00 AM</b>
        <b>Java + Spring Boot</b>
      </div>

      <button className="primary" onClick={() => navigate("/bookings")}>
        View my interviews
      </button>
    </div>
  );
}
