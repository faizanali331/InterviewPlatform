import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InterviewerProfileCard from "../../components/interviewer/InterviewerProfileCard";
import Header from "../../components/common/Header";
import InterviewerCard from "../../components/interviewer/InterviewerCard";
import SetCandidateLevel from "./SetCandidateLevel";

import { getCompanies, getDomains } from "../../api/catalogApi";
import { searchInterviewers } from "../../api/interviewerApi";
import { getMyCandidateProfile } from "../../api/candidateApi";
import { ApiClientError } from "../../api/apiClient";
import { Company, Domain } from "../../types/catalog";
import { InterviewerProfile } from "../../types/interviewer";

export default function FindInterviewer() {
  const navigate = useNavigate();

  const [checkingProfile, setCheckingProfile] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState("");
  const [domainId, setDomainId] = useState("");

  const [companyOptions, setCompanyOptions] = useState<Company[]>([]);
  const [domainOptions, setDomainOptions] = useState<Domain[]>([]);
  const [interviewers, setInterviewers] = useState<InterviewerProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyCandidateProfile()
      .then(() => setNeedsProfile(false))
      .catch((err) => {
        if (err instanceof ApiClientError && err.status === 404) {
          setNeedsProfile(true);
        }
      })
      .finally(() => setCheckingProfile(false));

    getCompanies()
      .then(setCompanyOptions)
      .catch(() => setCompanyOptions([]));
    getDomains()
      .then(setDomainOptions)
      .catch(() => setDomainOptions([]));
  }, []);

  const runSearch = () => {
    setLoading(true);
    setSearchError(null);
    searchInterviewers(
      companyId ? Number(companyId) : undefined,
      domainId ? Number(domainId) : undefined,
    )
      .then(setInterviewers)
      .catch((err) => {
        setInterviewers([]);
        setSearchError(
          err instanceof ApiClientError ? err.message : "Search failed.",
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!needsProfile && !checkingProfile) {
      runSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsProfile, checkingProfile, companyId, domainId]);

  if (checkingProfile) return <p>Loading...</p>;

  if (needsProfile) {
    return <SetCandidateLevel onSet={() => setNeedsProfile(false)} />;
  }

  return (
    <>
      <Header
        title="Find your interviewer"
        sub="Choose by company and technical domain. Interviewers are always senior to you — this is enforced automatically."
      />

      <div className="filters">
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        >
          <option value="">All companies</option>
          {companyOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select value={domainId} onChange={(e) => setDomainId(e.target.value)}>
          <option value="">All domains</option>
          {domainOptions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      {searchError && <div className="error">{searchError}</div>}
      <div className="notice">
        <ShieldCheck />
        <div>
          <b>Verified & confidential</b>
          <span>
            Interviewers are verified through company-domain email. Personal
            identity remains hidden from candidates.
          </span>
        </div>
      </div>

      {loading ? (
        <p>Loading interviewers...</p>
      ) : (
        <>
          <div className="grid">
            {interviewers.map((interviewer) => (
              <InterviewerProfileCard
                key={interviewer.id}
                interviewer={interviewer}
                onBook={() => navigate(`/book/${interviewer.id}`)}
              />
            ))}
          </div>

          {interviewers.length === 0 && (
            <div className="panel center">
              <h3>No eligible interviewers found</h3>
              <p>
                Try different filters, or check back later as more interviewers
                get verified.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
