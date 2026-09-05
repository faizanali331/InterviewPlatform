// import { useState } from "react";

// import AppRoutes from "./routes/AppRoutes";

// import type { Role } from "./types/auth";

// export default function App() {
//   const [role, setRole] = useState<Role>("candidate");

//   return <AppRoutes role={role} setRole={setRole} />;
// }
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
