import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { getCompanies, getDesignations } from "../../api/catalogApi";
import {
  getMyCandidateProfile,
  setCandidateProfile,
} from "../../api/candidateApi";
import { useAuth } from "../../context/AuthContext";
import { Company, Designation } from "../../types/catalog";

export default function Settings() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch(() => setCompanies([]));
    getMyCandidateProfile()
      .then((p) => setDesignationId(String(p.designationId)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getDesignations(companyId ? Number(companyId) : undefined)
      .then(setDesignations)
      .catch(() => setDesignations([]));
  }, [companyId]);

  const handleSave = async () => {
    if (!designationId) return;
    await setCandidateProfile({ designationId: Number(designationId) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Header
        title="Settings"
        sub="Manage your account and candidate profile."
      />

      <div className="panel">
        <h3>Account</h3>
        <div className="line">
          <span>Email</span>
          <b>{user?.email}</b>
        </div>
        <div className="line">
          <span>Role</span>
          <b>Candidate</b>
        </div>
      </div>

      <div className="panel">
        <h3>Current level</h3>
        {saved && (
          <div className="notice">
            <span>Saved.</span>
          </div>
        )}

        <label>Company (optional)</label>
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        >
          <option value="">Not listed</option>
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
          <option value="">Select</option>
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>

        <button className="primary" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="panel">
        <h3>Additional profile details</h3>
        <p className="hint">
          Technical skills, target designation and resume upload aren't
          connected to the backend yet — these fields are shown for reference
          only and won't be saved.
        </p>
        <input placeholder="Technical skills (e.g. Java, React)" disabled />
        <input placeholder="Target designation" disabled />
      </div>
    </>
  );
}
