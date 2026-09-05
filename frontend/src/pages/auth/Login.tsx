import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/common/Logo";
import { loginUser } from "../../api/authApi";
import { ApiClientError } from "../../api/apiClient";
import { mapBackendRole } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { homeRouteForRole } from "../../routes/roleHome";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setSubmitting(true);

    try {
      const response = await loginUser({ email, password });
      const role = mapBackendRole(response.role);

      login({ email: response.email, role, token: response.token });
      navigate(homeRouteForRole(role));
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="loginbox">
        <Logo variant="dark" />

        <h1>Welcome back</h1>
        <p>Sign in to your interview workspace.</p>

        {error && <div className="error">{error}</div>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="primary full"
          onClick={handleLogin}
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}
          <ArrowRight size={15} />
        </button>

        <div className="demo">
          <span>
            New candidate? <a href="/register">Create an account</a>
          </span>
          <span>
            Want to interview others?{" "}
            <a href="/register/interviewer">Apply as interviewer</a>
          </span>
        </div>
      </div>
    </div>
  );
}
