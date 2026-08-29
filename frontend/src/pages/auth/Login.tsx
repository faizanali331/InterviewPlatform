import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/common/Logo";

import type { Role } from "../../types/auth";

type LoginProps = {
  setRole: (role: Role) => void;
};

export default function Login({ setRole }: LoginProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setRole("candidate");
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <div className="loginbox">
        <Logo variant="dark" />

        <h1>Welcome back</h1>

        <p>Sign in to your interview workspace.</p>

        <input placeholder="Username / email" />

        <input type="password" placeholder="Password" />

        <button className="primary full" onClick={handleLogin}>
          Sign in
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
