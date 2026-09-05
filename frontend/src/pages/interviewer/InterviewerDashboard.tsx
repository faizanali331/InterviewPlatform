import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  ShieldCheck,
  Star,
  Video,
  Wallet,
} from "lucide-react";

import Header from "../../components/common/Header";
import Badge from "../../components/common/Badge";
import Stat from "../../components/common/Stat";
import CompleteProfile from "./CompleteProfile";

import { getMyInterviewerProfile } from "../../api/interviewerApi";
import { ApiClientError } from "../../api/apiClient";
import { InterviewerProfile } from "../../types/interviewer";

export default function InterviewerDashboard() {
  const [profile, setProfile] = useState<InterviewerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const loadProfile = () => {
    setLoading(true);
    getMyInterviewerProfile()
      .then((p) => {
        setProfile(p);
        setNotFound(false);
      })
      .catch((err) => {
        if (err instanceof ApiClientError && err.status === 404) {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) return <p>Loading your profile...</p>;

  // No profile submitted yet at all
  if (notFound) {
    return <CompleteProfile onSubmitted={loadProfile} />;
  }

  if (!profile) return null; // unreachable, but keeps TypeScript happy

  // Rejected: show the reason and let them resubmit through the same form
  if (profile.verificationStatus === "REJECTED") {
    return (
      <CompleteProfile
        onSubmitted={loadProfile}
        rejectionReason={profile.rejectionReason}
      />
    );
  }

  // Pending: submitted, but not reviewed yet - nothing to do but wait
  if (profile.verificationStatus === "PENDING") {
    return (
      <>
        <Header
          title="Verification pending"
          sub="Your profile has been submitted and is awaiting admin review."
        />
        <div className="panel">
          <div className="verify">
            <ShieldCheck />
            <div>
              <b>
                {profile.companyName ?? "Independent"} ·{" "}
                {profile.designationTitle}
              </b>
              <p>
                {profile.yearsOfExperience} years ·{" "}
                {profile.domains.map((d) => d.name).join(", ")}
              </p>
              <small>
                You'll be able to log in and take interviews once approved.
              </small>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Approved: the real dashboard. Interview/earnings stats are still
  // placeholders - those come from the booking module, which doesn't exist yet.
  return (
    <>
      <Header
        title="Interviewer dashboard"
        sub="Manage your verified profile, availability and mock interviews."
      />

      <div className="stats">
        <Stat
          label="Upcoming"
          value="—"
          meta="Booking module not built yet"
          icon={CalendarDays}
        />
        <Stat
          label="Completed"
          value="—"
          meta="Booking module not built yet"
          icon={Video}
        />
        <Stat label="Rating" value="—" meta="No interviews yet" icon={Star} />
        <Stat
          label="Earnings"
          value="—"
          meta="Booking module not built yet"
          icon={Wallet}
        />
      </div>

      <div className="cols">
        <div className="panel">
          <div className="row">
            <div>
              <h2>Verification</h2>
              <p>Your profile has been approved.</p>
            </div>
            <Badge tone="success">Verified</Badge>
          </div>

          <div className="verify">
            <ShieldCheck />
            <div>
              <b>
                {profile.companyName ?? "Independent"} ·{" "}
                {profile.designationTitle}
              </b>
              <p>
                {profile.yearsOfExperience} years ·{" "}
                {profile.domains.map((d) => d.name).join(", ")}
              </p>
              <small>Verified through company-domain email</small>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Next interview</h2>
          <p>Nothing scheduled yet — the booking module isn't built.</p>
        </div>
      </div>
    </>
  );
}
