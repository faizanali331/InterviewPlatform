import { useState } from "react";

import AppRoutes from "./routes/AppRoutes";

import type { Role } from "./types/auth";

export default function App() {
  const [role, setRole] = useState<Role>("candidate");

  return <AppRoutes role={role} setRole={setRole} />;
}
