import { ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import InterviewerCard from "../../components/interviewer/InterviewerCard";

import { interviewers } from "../../data/interviewers";
import { getCompanies, getDomains } from "../../api/catalogApi";
import { Company, Domain } from "../../types/catalog";

export default function FindInterviewer() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("All");
  const [domain, setDomain] = useState("All");
  const [query, setQuery] = useState("");

  const [companyOptions, setCompanyOptions] = useState<Company[]>([]);
  const [domainOptions, setDomainOptions] = useState<Domain[]>([]);

  useEffect(() => {
    getCompanies()
      .then(setCompanyOptions)
      .catch(() => setCompanyOptions([]));
    getDomains()
      .then(setDomainOptions)
      .catch(() => setDomainOptions([]));
  }, []);

  const companies = useMemo(
    () => ["All", ...companyOptions.map((c) => c.name)],
    [companyOptions],
  );

  const domains = useMemo(
    () => ["All", ...domainOptions.map((d) => d.name)],
    [domainOptions],
  );

  const filteredInterviewers = interviewers.filter((interviewer) => {
    const matchesCompany = company === "All" || interviewer.company === company;

    const matchesDomain = domain === "All" || interviewer.domain === domain;

    const searchText = `
        ${interviewer.company}
        ${interviewer.domain}
        ${interviewer.designation}
        ${interviewer.skills.join(" ")}
      `.toLowerCase();

    const matchesSearch = searchText.includes(query.toLowerCase());

    return matchesCompany && matchesDomain && matchesSearch;
  });

  return (
    <>
      <Header
        title="Find your interviewer"
        sub="Choose by company, seniority and technical domain. Interviewers are always senior to the candidate."
      />

      <div className="filters">
        <input
          placeholder="Search company, skill or role..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        >
          {companies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
        >
          {domains.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

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

      <div className="grid">
        {filteredInterviewers.map((interviewer) => (
          <InterviewerCard
            key={interviewer.id}
            interviewer={interviewer}
            onBook={() => navigate(`/book/${interviewer.id}`)}
          />
        ))}
      </div>

      {filteredInterviewers.length === 0 && (
        <div className="panel center">
          <h3>No interviewers found</h3>

          <p>Try changing your search or filters.</p>
        </div>
      )}
    </>
  );
}
