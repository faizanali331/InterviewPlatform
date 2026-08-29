import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

// Auth
import Login from "../pages/auth/Login";
import Landing from "../pages/landing/Landing";
import Register from "../pages/auth/Register";

// Candidate
import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import FindInterviewer from "../pages/candidate/FindInterviewer";
import BookInterview from "../pages/candidate/BookInterview";
import Payment from "../pages/candidate/Payment";
import BookingSuccess from "../pages/candidate/BookingSuccess";
import MyInterviews from "../pages/candidate/MyInterviews";
import Feedback from "../pages/candidate/Feedback";

// Interviewer
import InterviewerDashboard from "../pages/interviewer/InterviewerDashboard";
import Availability from "../pages/interviewer/Availability";
import InterviewerInterviews from "../pages/interviewer/InterviewerInterviews";
import InterviewerFeedback from "../pages/interviewer/InterviewerFeedback";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageInterviewers from "../pages/admin/ManageInterviewers";
import ManageInterviews from "../pages/admin/ManageInterviews";
import Payments from "../pages/admin/Payments";

// Interview
import InterviewRoom from "../pages/interview/InterviewRoom";

import type { Role } from "../types/auth";

type AppRoutesProps = {
  role: Role;
  setRole: (role: Role) => void;
};

export default function AppRoutes({ role, setRole }: AppRoutesProps) {
  return (
    <Routes>
      {/* =========================
          AUTH
      ========================== */}

      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/register" element={<Register />} />

      {/* =========================
          CANDIDATE
      ========================== */}

      <Route
        path="/dashboard"
        element={
          <Layout role={role} setRole={setRole}>
            <CandidateDashboard />
          </Layout>
        }
      />

      <Route
        path="/interviewers"
        element={
          <Layout role={role} setRole={setRole}>
            <FindInterviewer />
          </Layout>
        }
      />

      <Route
        path="/book/:id"
        element={
          <Layout role={role} setRole={setRole}>
            <BookInterview />
          </Layout>
        }
      />

      <Route
        path="/payment/:id"
        element={
          <Layout role={role} setRole={setRole}>
            <Payment />
          </Layout>
        }
      />

      <Route
        path="/success"
        element={
          <Layout role={role} setRole={setRole}>
            <BookingSuccess />
          </Layout>
        }
      />

      <Route
        path="/bookings"
        element={
          <Layout role={role} setRole={setRole}>
            <MyInterviews />
          </Layout>
        }
      />

      <Route
        path="/feedback"
        element={
          <Layout role={role} setRole={setRole}>
            <Feedback />
          </Layout>
        }
      />

      {/* =========================
          INTERVIEW ROOM
      ========================== */}

      <Route path="/room" element={<InterviewRoom />} />

      {/* =========================
          INTERVIEWER
      ========================== */}

      <Route
        path="/interviewer"
        element={
          <Layout role={role} setRole={setRole}>
            <InterviewerDashboard />
          </Layout>
        }
      />

      <Route
        path="/availability"
        element={
          <Layout role={role} setRole={setRole}>
            <Availability />
          </Layout>
        }
      />

      <Route
        path="/interviewer/interviews"
        element={
          <Layout role={role} setRole={setRole}>
            <InterviewerInterviews />
          </Layout>
        }
      />

      <Route
        path="/interviewer/feedback"
        element={
          <Layout role={role} setRole={setRole}>
            <InterviewerFeedback />
          </Layout>
        }
      />

      {/* =========================
          ADMIN
      ========================== */}

      <Route
        path="/admin"
        element={
          <Layout role={role} setRole={setRole}>
            <AdminDashboard />
          </Layout>
        }
      />

      <Route
        path="/admin/interviewers"
        element={
          <Layout role={role} setRole={setRole}>
            <ManageInterviewers />
          </Layout>
        }
      />

      <Route
        path="/admin/interviews"
        element={
          <Layout role={role} setRole={setRole}>
            <ManageInterviews />
          </Layout>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <Layout role={role} setRole={setRole}>
            <Payments />
          </Layout>
        }
      />

      {/* =========================
          ROOT
      ========================== */}

      <Route path="/" element={<Landing />} />

      {/* =========================
          FALLBACK
      ========================== */}

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
