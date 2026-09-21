import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import PaymentPanel from "../../components/payment/PaymentPanel";
import { getMyBookingsAsCandidate, cancelBooking } from "../../api/bookingApi";
import { Booking } from "../../types/booking";

const STATUS_TONE: Record<Booking["status"], "warning" | "info" | "danger"> = {
  PENDING_PAYMENT: "warning",
  CONFIRMED: "info",
  CANCELLED: "danger",
};

export default function MyInterviews() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getMyBookingsAsCandidate()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id: number) => {
    await cancelBooking(id);
    load();
  };

  return (
    <>
      <Header title="My interviews" sub="Track your booked mock interviews." />

      <div className="panel table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Designation</th>
                <th>Domain</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <>
                  <tr key={b.id}>
                    <td>{b.interviewerCompanyName}</td>
                    <td>{b.interviewerDesignationTitle}</td>
                    <td>{b.domainName}</td>
                    <td>
                      {b.slotDate}
                      <small>{b.startTime.slice(0, 5)}</small>
                    </td>
                    <td>
                      <Badge tone={STATUS_TONE[b.status]}>{b.status}</Badge>
                    </td>
                    <td>
                      {b.status === "PENDING_PAYMENT" && (
                        <button
                          className="text"
                          onClick={() =>
                            setPayingId(payingId === b.id ? null : b.id)
                          }
                        >
                          {payingId === b.id ? "Close" : "Pay now"}
                        </button>
                      )}
                      {b.status === "CONFIRMED" && (
                        <button
                          className="text"
                          onClick={() => handleCancel(b.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                  {payingId === b.id && (
                    <tr key={`${b.id}-pay`}>
                      <td colSpan={6}>
                        <PaymentPanel
                          bookingId={b.id}
                          onPaid={() => {
                            setPayingId(null);
                            load();
                          }}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6}>No interviews booked yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
