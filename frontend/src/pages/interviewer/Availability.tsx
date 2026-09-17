// import Header from "../../components/common/Header";
// import AvailabilityCalendar from "../../components/interviewer/AvailabilityCalendar";

// export default function Availability() {
//   return (
//     <>
//       <Header title="Availability" sub="Create slots candidates can book." />

//       <div className="panel calendar">
//         <h2>August 2026</h2>

//         <AvailabilityCalendar />
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import Header from "../../components/common/Header";
import { createSlot, getMySlots, deleteSlot } from "../../api/availabilityApi";
import { ApiClientError } from "../../api/apiClient";
import { AvailabilitySlot } from "../../types/booking";

export default function Availability() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    getMySlots()
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    setError(null);
    if (!slotDate || !startTime || !endTime) {
      setError("Please fill in date, start time and end time.");
      return;
    }

    setSubmitting(true);
    try {
      await createSlot({
        slotDate,
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
      });
      setSlotDate("");
      setStartTime("");
      setEndTime("");
      load();
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSlot(id);
      load();
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Could not delete slot.",
      );
    }
  };

  return (
    <>
      <Header title="Availability" sub="Create slots candidates can book." />

      {error && <div className="error">{error}</div>}

      <div className="panel">
        <h3>Add a slot</h3>
        <div className="row">
          <input
            type="date"
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button className="primary" onClick={handleAdd} disabled={submitting}>
            {submitting ? "Adding..." : "Add slot"}
          </button>
        </div>
      </div>

      <div className="panel table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.slotDate}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>{slot.booked ? "Booked" : "Open"}</td>
                  <td>
                    {!slot.booked && (
                      <button
                        className="text"
                        onClick={() => handleDelete(slot.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {slots.length === 0 && (
                <tr>
                  <td colSpan={5}>No slots yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
