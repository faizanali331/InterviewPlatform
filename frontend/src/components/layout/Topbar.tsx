import { Bell } from "lucide-react";

import type { Role } from "../../types/auth";

type TopbarProps = {
  role: Role;
};

export default function Topbar({ role }: TopbarProps) {
  return (
    <header>
      <span>Workspace / {role}</span>

      <div>
        <Bell size={18} />
        <i>MF</i>
      </div>
    </header>
  );
}
