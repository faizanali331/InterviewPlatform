import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import {
  getCompanies,
  getDesignations,
  getDomains,
} from "../../api/catalogApi";
import { submitInterviewerProfile } from "../../api/interviewerApi";
import { ApiClientError } from "../../api/apiClient";
import { Company, Designation, Domain } from "../../types/catalog";

type Props = {
  onSubmitted: () => void;
  rejectionReason?: string | null;
};

export default function CompleteProfile({
  onSubmitted,
  rejectionReason,
}: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);

  const [companyId, setCompanyId] = useState<string>("");
  const [designationId, setDesignationId] = useState<string>("");
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("");
  const [selectedDomainIds, setSelectedDomainIds] = useState<number[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch(() => setCompanies([]));
    getDomains()
      .then(setDomains)
      .catch(() => setDomains([]));
  }, []);

  useEffect(() => {
    const id = companyId ? Number(companyId) : undefined;
    getDesignations(id)
      .then(setDesignations)
      .catch(() => setDesignations([]));
    setDesignationId(""); // reset choice when company changes
  }, [companyId]);

  const toggleDomain = (id: number) => {
    setSelectedDomainIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    setError(null);

    if (!designationId) {
      setError("Please select a designation.");
      return;
    }
    if (!yearsOfExperience || Number(yearsOfExperience) < 0) {
      setError("Please enter valid years of experience.");
      return;
    }
    if (selectedDomainIds.length === 0) {
      setError("Please select at least one domain.");
      return;
    }

    setSubmitting(true);
    try {
      await submitInterviewerProfile({
        companyId: companyId ? Number(companyId) : null,
        designationId: Number(designationId),
        yearsOfExperience: Number(yearsOfExperience),
        domainIds: selectedDomainIds,
      });
      onSubmitted();
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
        title="Complete your interviewer profile"
        sub="This information is reviewed by our team before you're listed to candidates."
      />

      {rejectionReason && (
        <div className="error">
          Your last submission was rejected: {rejectionReason}. Please review
          and resubmit.
        </div>
      )}
      {error && <div className="error">{error}</div>}

      <div className="panel">
        <label>Company (optional)</label>
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

        <label>Designation</label>
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

        <label>Years of experience</label>
        <input
          type="number"
          min={0}
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
        />

        <label>Domains you can interview in</label>
        <div className="checkbox-grid">
          {domains.map((d) => (
            <label key={d.id} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedDomainIds.includes(d.id)}
                onChange={() => toggleDomain(d.id)}
              />
              {d.name}
            </label>
          ))}
        </div>

        <button
          className="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit for review"}
        </button>
      </div>
    </>
  );
}
