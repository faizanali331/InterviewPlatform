import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/common/Logo";
import { registerUser } from "../../api/authApi";
import { ApiClientError } from "../../api/apiClient";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
        setFieldErrors(err.fieldErrors ?? {});
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
        <h1>Create your account</h1>
        <p>Practice with verified industry professionals.</p>

        {error && <div className="error">{error}</div>}

        <input
          placeholder="First name"
          value={form.firstName}
          onChange={update("firstName")}
        />
        {fieldErrors.firstName && (
          <span className="field-error">{fieldErrors.firstName}</span>
        )}

        <input
          placeholder="Last name"
          value={form.lastName}
          onChange={update("lastName")}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={update("email")}
        />
        {fieldErrors.email && (
          <span className="field-error">{fieldErrors.email}</span>
        )}

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={update("phone")}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={update("password")}
        />
        {fieldErrors.password && (
          <span className="field-error">{fieldErrors.password}</span>
        )}

        <button
          className="primary full"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>

        <div className="demo">
          <span>
            Already have an account? <a href="/login">Sign in</a>
          </span>
        </div>
      </div>
    </div>
  );
}
