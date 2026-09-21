import Header from "../../components/common/Header";

export default function ManageCandidates() {
  return (
    <>
      <Header
        title="Manage candidates"
        sub="Search, review and manage candidate accounts."
      />
      <div className="notice">
        <span>
          Not built yet — there's no backend endpoint to list all candidates.
          See Admin Dashboard for aggregate counts.
        </span>
      </div>
      <div className="panel table">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Registered</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}>Candidate list endpoint not built yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
