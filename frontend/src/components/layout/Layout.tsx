import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import type { Role } from "../../types/auth";

type LayoutProps = {
  role: Role;
  setRole: (role: Role) => void;
  children: ReactNode;
};

export default function Layout({ role, setRole, children }: LayoutProps) {
  return (
    <div className="shell">
      <Sidebar role={role} setRole={setRole} />

      <main>
        <Topbar role={role} />

        <section>{children}</section>
      </main>
    </div>
  );
}
