import Header from "../../components/common/Header";
import AvailabilityCalendar from "../../components/interviewer/AvailabilityCalendar";

export default function Availability() {
  return (
    <>
      <Header title="Availability" sub="Create slots candidates can book." />

      <div className="panel calendar">
        <h2>August 2026</h2>

        <AvailabilityCalendar />
      </div>
    </>
  );
}
