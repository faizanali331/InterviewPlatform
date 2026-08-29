import {
  LayoutDashboard,
  Search,
  CalendarDays,
  BarChart3,
  Users,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import type { Role } from "../../types/auth";

type SidebarProps = {
  role: Role;
  setRole: (role: Role) => void;
};

export default function Sidebar({ role, setRole }: SidebarProps) {
  const location = useLocation();

  const candidateNav = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/interviewers",
      name: "Find Interviewer",
      icon: Search,
    },
    {
      path: "/bookings",
      name: "My Interviews",
      icon: CalendarDays,
    },
    {
      path: "/feedback",
      name: "Feedback",
      icon: BarChart3,
    },
  ];

  const interviewerNav = [
    {
      path: "/interviewer",
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/availability",
      name: "Availability",
      icon: CalendarDays,
    },
    {
      path: "/interviewer/interviews",
      name: "Interviews",
      icon: Users,
    },
    {
      path: "/interviewer/feedback",
      name: "Feedback",
      icon: BarChart3,
    },
  ];

  const adminNav = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/admin/interviewers",
      name: "Interviewers",
      icon: Users,
    },
    {
      path: "/admin/interviews",
      name: "Interviews",
      icon: CalendarDays,
    },
    {
      path: "/admin/payments",
      name: "Payments",
      icon: Wallet,
    },
  ];

  const nav =
    role === "candidate"
      ? candidateNav
      : role === "interviewer"
        ? interviewerNav
        : adminNav;

  return (
    <aside>
      <div className="brand">
        <b>IP</b> InterviewPro
      </div>

      <div className="switch">
        <span>{role}</span>

        <select
          value={role}
          onChange={(event) => setRole(event.target.value as Role)}
        >
          <option value="candidate">Candidate</option>

          <option value="interviewer">Interviewer</option>

          <option value="admin">Admin</option>
        </select>
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

        <button onClick={() => alert("Mock logout")}>
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
