// import { Bell } from "lucide-react";

// import type { Role } from "../../types/auth";

// type TopbarProps = {
//   role: Role;
// };

// export default function Topbar({ role }: TopbarProps) {
//   return (
//     <header>
//       <span>Workspace / {role}</span>

//       <div>
//         <Bell size={18} />
//         <i>MF</i>
//       </div>
//     </header>
//   );
// }

import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header>
      <span>Workspace / {user?.role}</span>
      <div>
        <Bell size={18} />
        <i>MF</i>
      </div>
    </header>
  );
}
