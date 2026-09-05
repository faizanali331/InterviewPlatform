import { useEffect, useState } from "react";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";

import {
  listInterviewers,
  approveInterviewer,
  rejectInterviewer,
} from "../../api/interviewerApi";
import {
  InterviewerProfile,
  VerificationStatus,
} from "../../types/interviewer";

const TABS: VerificationStatus[] = ["PENDING", "APPROVED", "REJECTED"];

const BADGE_TONE: Record<VerificationStatus, "success" | "warning" | "danger"> =
  {
    APPROVED: "success",
    PENDING: "warning",
    REJECTED: "danger",
  };

export default function ManageInterviewers() {
  const [activeTab, setActiveTab] = useState<VerificationStatus>("PENDING");
  const [interviewers, setInterviewers] = useState<InterviewerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const load = (status: VerificationStatus) => {
    setLoading(true);
    listInterviewers(status)
      .then(setInterviewers)
      .catch(() => setInterviewers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(activeTab);
  }, [activeTab]);

  const handleApprove = async (id: number) => {
    await approveInterviewer(id);
    load(activeTab);
  };

  const handleReject = async (id: number) => {
    const reason = window.prompt("Reason for rejection:");
    if (!reason) return;
    await rejectInterviewer(id, reason);
    load(activeTab);
  };

  return (
    <>
      <Header
        title="Manage interviewers"
        sub="Review, verify and manage registered interviewers."
      />

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="panel table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Company</th>
                <th>Designation</th>
                <th>Domains</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewers.map((interviewer) => (
                <tr key={interviewer.id}>
                  <td>{interviewer.email}</td>
                  <td>{interviewer.companyName ?? "—"}</td>
                  <td>{interviewer.designationTitle}</td>
                  <td>{interviewer.domains.map((d) => d.name).join(", ")}</td>
                  <td>{interviewer.yearsOfExperience} years</td>
                  <td>
                    <Badge tone={BADGE_TONE[interviewer.verificationStatus]}>
                      {interviewer.verificationStatus}
                    </Badge>
                  </td>
                  <td>
                    {interviewer.verificationStatus === "PENDING" && (
                      <>
                        <button
                          className="text"
                          onClick={() => handleApprove(interviewer.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="text"
                          onClick={() => handleReject(interviewer.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {interviewers.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    No {activeTab.toLowerCase()} interviewers.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
