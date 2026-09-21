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
import Settings from "../pages/candidate/Settings";
import Progress from "../pages/candidate/Progress";
import RateInterview from "../pages/candidate/RateInterview";
import Recordings from "../pages/candidate/Recordings";
import Earnings from "../pages/interviewer/Earnings";
import GiveFeedback from "../pages/interviewer/GiveFeedback";
import ManageCandidates from "../pages/admin/ManageCandidates";
import CatalogManagement from "../pages/admin/CatalogManagement";
import Reports from "../pages/admin/Reports";
import Disputes from "../pages/admin/Disputes";
import ManageAdmins from "../pages/admin/ManageAdmins";
import PlatformSettings from "../pages/admin/PlatformSettings";

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
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <Progress />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rate/:bookingId"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <RateInterview />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/recordings"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Layout>
              <Recordings />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/earnings"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <Layout>
              <Earnings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer/feedback/give/:bookingId"
        element={
          <ProtectedRoute allowedRoles={["interviewer"]}>
            <Layout>
              <GiveFeedback />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/candidates"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <ManageCandidates />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/catalog"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <CatalogManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/disputes"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <Layout>
              <Disputes />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-admins"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Layout>
              <ManageAdmins />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Layout>
              <PlatformSettings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={rootRedirect} replace />} />
      <Route path="*" element={<Navigate to={rootRedirect} replace />} />
    </Routes>
  );
}
