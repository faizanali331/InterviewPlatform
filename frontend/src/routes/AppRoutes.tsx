import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterInterviewer from "../pages/auth/RegisterInterviewer";

import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import FindInterviewer from "../pages/candidate/FindInterviewer";
import BookInterview from "../pages/candidate/BookInterview";
import Payment from "../pages/candidate/Payment";
import BookingSuccess from "../pages/candidate/BookingSuccess";
import MyInterviews from "../pages/candidate/MyInterviews";
import Feedback from "../pages/candidate/Feedback";

import InterviewerDashboard from "../pages/interviewer/InterviewerDashboard";
import Availability from "../pages/interviewer/Availability";
import InterviewerInterviews from "../pages/interviewer/InterviewerInterviews";
import InterviewerFeedback from "../pages/interviewer/InterviewerFeedback";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageInterviewers from "../pages/admin/ManageInterviewers";
import ManageInterviews from "../pages/admin/ManageInterviews";
import Payments from "../pages/admin/Payments";

import InterviewRoom from "../pages/interview/InterviewRoom";

import { useAuth } from "../context/AuthContext";
import { homeRouteForRole } from "./roleHome";

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  const rootRedirect =
    isAuthenticated && user ? homeRouteForRole(user.role) : "/login";

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/interviewer" element={<RegisterInterviewer />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <CandidateDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewers"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <FindInterviewer />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <BookInterview />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:id"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <Payment />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/success"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <BookingSuccess />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <MyInterviews />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <Feedback />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/room"
        element={
          <ProtectedRoute allowedRoles={["candidate", "interviewer"]}>
            <InterviewRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interviewer"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <Layout>
              <InterviewerDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/availability"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <Layout>
              <Availability />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/interviews"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <Layout>
              <InterviewerInterviews />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/feedback"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <Layout>
              <InterviewerFeedback />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/interviewers"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <ManageInterviewers />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/interviews"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <ManageInterviews />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <Payments />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to={rootRedirect} replace />} />
      <Route path="*" element={<Navigate to={rootRedirect} replace />} />
    </Routes>
  );
}
