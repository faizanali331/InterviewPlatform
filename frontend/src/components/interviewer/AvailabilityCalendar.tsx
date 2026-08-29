type AvailabilityCalendarProps = {
  month?: string;
  days?: number;
};

export default function AvailabilityCalendar({
  month = "August 2026",
  days = 31,
}: AvailabilityCalendarProps) {
  return (
    <div className="panel calendar">
      <h2>{month}</h2>

      <div className="calendar-grid">
        {Array.from({ length: days }, (_, index) => {
          const day = index + 1;

          const hasSlots = index % 4 === 0;

          return (
            <div className={hasSlots ? "cal active" : "cal"} key={day}>
              {day}

              {hasSlots && <small>2 slots</small>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
