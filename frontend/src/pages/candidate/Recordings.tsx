import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { getMyBookingsAsCandidate } from "../../api/bookingApi";
import { Booking } from "../../types/booking";

export default function Recordings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getMyBookingsAsCandidate()
      .then(setBookings)
      .catch(() => setBookings([]));
  }, []);

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");

  return (
    <>
      <Header
        title="Recordings"
        sub="Access recordings of your completed interviews."
      />
      <div className="notice">
        <span>
          Recording storage isn't built yet — this lists your real confirmed
          interviews.
        </span>
      </div>

      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Domain</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {confirmed.map((b) => (
              <tr key={b.id}>
                <td>{b.interviewerCompanyName}</td>
                <td>{b.domainName}</td>
                <td>{b.slotDate}</td>
                <td>
                  <button className="text" disabled title="Not built yet">
                    Watch recording
                  </button>
                </td>
              </tr>
            ))}
            {confirmed.length === 0 && (
              <tr>
                <td colSpan={4}>No confirmed interviews yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
