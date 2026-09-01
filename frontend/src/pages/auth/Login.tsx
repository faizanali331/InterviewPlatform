// import { ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import Logo from "../../components/common/Logo";

// import type { Role } from "../../types/auth";

// type LoginProps = {
//   setRole: (role: Role) => void;
// };

// export default function Login({ setRole }: LoginProps) {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setRole("candidate");
//     navigate("/dashboard");
//   };

//   return (
//     <div className="login">
//       <div className="loginbox">
//         <Logo variant="dark" />

//         <h1>Welcome back</h1>

//         <p>Sign in to your interview workspace.</p>

//         <input placeholder="Username / email" />

//         <input type="password" placeholder="Password" />

//         <button className="primary full" onClick={handleLogin}>
//           Sign in
//           <ArrowRight size={15} />
//         </button>

//         <div className="demo">
//           <b>Mock accounts</b>

//           <span>Candidate: faizan@example.com</span>

//           <span>Interviewer: interviewer@company.com</span>

//           <span>Admin: admin@interviewpro.com</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/common/Logo";
import type { Role } from "../../types/auth";
import { loginUser } from "../../api/authApi";

type LoginProps = {
  setRole: (role: Role) => void;
};

export default function Login({ setRole }: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", response.accessToken);

      const role = response.role.replace("ROLE_", "").toLowerCase() as Role;
      setRole(role);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="loginbox">
        <Logo variant="dark" />

        <h1>Welcome back</h1>

        <p>Sign in to your interview workspace.</p>

        <input
          type="email"
          placeholder="Username / email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <p style={{ color: "tomato", marginTop: "8px" }}>{error}</p>}

        <button
          className="primary full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
          <ArrowRight size={15} />
        </button>

        <div className="demo">
          <b>Mock accounts</b>
          <span>Candidate: faizan@example.com</span>
          <span>Interviewer: interviewer@company.com</span>
          <span>Admin: admin@interviewpro.com</span>
        </div>
      </div>
    </div>
  );
}
