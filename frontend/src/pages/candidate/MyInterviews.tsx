import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import { getMyBookingsAsCandidate, cancelBooking } from "../../api/bookingApi";
import { Booking } from "../../types/booking";

export default function MyInterviews() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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
                <tr key={b.id}>
                  <td>{b.interviewerCompanyName}</td>
                  <td>{b.interviewerDesignationTitle}</td>
                  <td>{b.domainName}</td>
                  <td>
                    {b.slotDate}
                    <small>{b.startTime.slice(0, 5)}</small>
                  </td>
                  <td>
                    <Badge tone={b.status === "CONFIRMED" ? "info" : "danger"}>
                      {b.status}
                    </Badge>
                  </td>
                  <td>
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
