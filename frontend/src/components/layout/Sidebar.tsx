import {
  LayoutDashboard,
  Search,
  CalendarDays,
  BarChart3,
  Users,
  Wallet,
  Settings,
  LogOut,
  TrendingUp,
  Video,
  Building2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

import type { Role } from "../../types/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type SidebarProps = {
  role: Role;
  setRole: (role: Role) => void;
};

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = user?.role;

  const candidateNav = [
    { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/interviewers", name: "Find Interviewer", icon: Search },
    { path: "/bookings", name: "My Interviews", icon: CalendarDays },
    { path: "/feedback", name: "Feedback", icon: BarChart3 },
    { path: "/progress", name: "Progress", icon: TrendingUp },
    { path: "/recordings", name: "Recordings", icon: Video },
  ];

  const interviewerNav = [
    { path: "/interviewer", name: "Dashboard", icon: LayoutDashboard },
    { path: "/availability", name: "Availability", icon: CalendarDays },
    { path: "/interviewer/interviews", name: "Interviews", icon: Users },
    { path: "/interviewer/feedback", name: "Feedback", icon: BarChart3 },
    { path: "/earnings", name: "Earnings", icon: Wallet },
  ];

  const adminNav = [
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/interviewers", name: "Interviewers", icon: Users },
    { path: "/admin/candidates", name: "Candidates", icon: Users },
    { path: "/admin/catalog", name: "Catalog", icon: Building2 },
    { path: "/admin/interviews", name: "Interviews", icon: CalendarDays },
    { path: "/admin/payments", name: "Payments", icon: Wallet },
    { path: "/admin/reports", name: "Reports", icon: BarChart3 },
    { path: "/admin/disputes", name: "Disputes", icon: AlertTriangle },
  ];
  const superAdminNav = [
    ...adminNav,
    { path: "/admin/manage-admins", name: "Manage Admins", icon: ShieldCheck },
    { path: "/admin/settings", name: "Platform Settings", icon: Settings },
  ];
  const nav =
    role === "candidate"
      ? candidateNav
      : role === "interviewer"
        ? interviewerNav
        : role === "super_admin"
          ? superAdminNav
          : adminNav;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside>
      <div className="brand">
        <b>IP</b> InterviewPro
      </div>

      <div className="switch">
        <span>{role}</span>
      </div>

      <nav>
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Icon size={17} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="bottom">
        <Link to="/settings">
          <Settings size={17} />
          Settings
        </Link>
        <button onClick={handleLogout}>
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
