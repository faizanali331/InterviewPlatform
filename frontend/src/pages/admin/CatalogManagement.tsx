import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  getCompanies,
  getDomains,
  getDesignations,
  getLevels,
  createCompany,
  createDomain,
  createDesignation,
} from "../../api/catalogApi";
import { ApiClientError } from "../../api/apiClient";
import { Company, Domain, Designation, Level } from "../../types/catalog";

export default function CatalogManagement() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [domainCategory, setDomainCategory] = useState("");
  const [designationTitle, setDesignationTitle] = useState("");
  const [designationLevel, setDesignationLevel] = useState("");

  const loadAll = () => {
    getCompanies()
      .then(setCompanies)
      .catch(() => {});
    getDomains()
      .then(setDomains)
      .catch(() => {});
    getDesignations()
      .then(setDesignations)
      .catch(() => {});
    getLevels()
      .then(setLevels)
      .catch(() => {});
  };

  useEffect(loadAll, []);

  const handle = async (fn: () => Promise<unknown>, reset: () => void) => {
    setError(null);
    try {
      await fn();
      reset();
      loadAll();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed.");
    }
  };

  return (
    <>
      <Header
        title="Catalog management"
        sub="Manage companies, domains and designations candidates and interviewers select from."
      />
      {error && <div className="error">{error}</div>}

      <div className="cols">
        <div className="panel">
          <h3>Add company</h3>
          <input
            placeholder="Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <button
            className="primary"
            onClick={() =>
              handle(
                () => createCompany(companyName),
                () => setCompanyName(""),
              )
            }
          >
            Add
          </button>
          <hr />
          {companies.map((c) => (
            <div className="line" key={c.id}>
              <span>{c.name}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>Add domain</h3>
          <input
            placeholder="Name"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
          />
          <input
            placeholder="Category"
            value={domainCategory}
            onChange={(e) => setDomainCategory(e.target.value)}
          />
          <button
            className="primary"
            onClick={() =>
              handle(
                () => createDomain(domainName, domainCategory),
                () => {
                  setDomainName("");
                  setDomainCategory("");
                },
              )
            }
          >
            Add
          </button>
          <hr />
          {domains.map((d) => (
            <div className="line" key={d.id}>
              <span>{d.name}</span>
              <small>{d.category}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>Add designation</h3>
        <input
          placeholder="Title (e.g. SDE-3)"
          value={designationTitle}
          onChange={(e) => setDesignationTitle(e.target.value)}
        />
        <select
          value={designationLevel}
          onChange={(e) => setDesignationLevel(e.target.value)}
        >
          <option value="">Select level</option>
          {levels.map((l) => (
            <option key={l.id} value={l.levelNumber}>
              {l.levelName}
            </option>
          ))}
        </select>
        <button
          className="primary"
          onClick={() =>
            handle(
              () =>
                createDesignation(designationTitle, Number(designationLevel)),
              () => {
                setDesignationTitle("");
                setDesignationLevel("");
              },
            )
          }
        >
          Add
        </button>
        <hr />
        {designations.map((d) => (
          <div className="line" key={d.id}>
            <span>{d.title}</span>
            <small>
              {d.companyName ?? "Generic"} · {d.levelName}
            </small>
          </div>
        ))}
      </div>
    </>
  );
}
