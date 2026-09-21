import Header from "../../components/common/Header";
import PerformanceBar from "../../components/feedback/PerformanceBar";

// Mock: no scoring/feedback backend exists yet. Structure matches white
// paper section 29's example (Java 5→8, System Design 4→7, etc.) so this
// slots in cleanly once real feedback scores exist.
const progress = [
  { label: "Java", from: 5, to: 8 },
  { label: "Spring Boot", from: 6, to: 8 },
  { label: "System Design", from: 4, to: 7 },
  { label: "Communication", from: 5, to: 7 },
  { label: "Problem Solving", from: 6, to: 8 },
];

export default function Progress() {
  return (
    <>
      <Header
        title="Your progress"
        sub="Improvement across your mock interviews."
      />
      <div className="notice">
        <span>
          Demo data — real progress tracking needs the feedback module, which
          isn't built yet.
        </span>
      </div>

      <div className="panel">
        {progress.map((p) => (
          <div key={p.label}>
            <PerformanceBar label={`${p.label} (start)`} value={p.from * 10} />
            <PerformanceBar label={`${p.label} (now)`} value={p.to * 10} />
          </div>
        ))}
      </div>
    </>
  );
}
