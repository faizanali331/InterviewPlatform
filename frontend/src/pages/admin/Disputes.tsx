import Header from "../../components/common/Header";

export default function Disputes() {
  return (
    <>
      <Header
        title="Disputes"
        sub="Review and resolve candidate/interviewer disputes."
      />
      <div className="notice">
        <span>Not built yet — no dispute backend exists.</span>
      </div>
      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>No disputes system built yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
