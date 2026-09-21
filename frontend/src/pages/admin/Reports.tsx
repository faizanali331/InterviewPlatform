import Header from "../../components/common/Header";

const KPIS = [
  "Interview Completion Rate",
  "No-Show Rate",
  "Cancellation Rate",
  "Refund Rate",
  "Candidate Improvement",
];

export default function Reports() {
  return (
    <>
      <Header title="Reports" sub="Platform-wide KPIs." />
      <div className="notice">
        <span>
          Demo data — these KPIs (white paper section 40) aren't tracked by the
          backend yet.
        </span>
      </div>
      <div className="panel">
        {KPIS.map((k) => (
          <div className="line" key={k}>
            <span>{k}</span>
            <b>—</b>
          </div>
        ))}
      </div>
    </>
  );
}
