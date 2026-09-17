import { useEffect, useState } from "react";

import Header from "../../components/common/Header";
import { getCompanies, getDesignations } from "../../api/catalogApi";
import { setCandidateProfile } from "../../api/candidateApi";
import { ApiClientError } from "../../api/apiClient";
import { Company, Designation } from "../../types/catalog";

type Props = {
  onSet: () => void;
};

export default function SetCandidateLevel({ onSet }: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);

  const [companyId, setCompanyId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch(() => setCompanies([]));
  }, []);

  useEffect(() => {
    const id = companyId ? Number(companyId) : undefined;
    getDesignations(id)
      .then(setDesignations)
      .catch(() => setDesignations([]));
    setDesignationId("");
  }, [companyId]);

  const handleSubmit = async () => {
    setError(null);
    if (!designationId) {
      setError("Please select your current designation.");
      return;
    }

    setSubmitting(true);
    try {
      await setCandidateProfile({ designationId: Number(designationId) });
      onSet();
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header
        title="What's your current level?"
        sub="We use this to show you interviewers senior enough to give you a meaningful mock interview."
      />

      {error && <div className="error">{error}</div>}

      <div className="panel">
        <label>Current company (optional)</label>
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        >
          <option value="">Not listed / prefer not to say</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Current designation</label>
        <select
          value={designationId}
          onChange={(e) => setDesignationId(e.target.value)}
        >
          <option value="">Select designation</option>
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title} ({d.levelName})
            </option>
          ))}
        </select>

        <button
          className="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Continue"}
        </button>
      </div>
    </>
  );
}
