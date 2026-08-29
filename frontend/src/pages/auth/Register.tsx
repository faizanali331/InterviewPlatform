import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo";
import { registerUser } from "../../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await registerUser(formData);

      console.log("Registration successful:", response);

      /*
       * Registration is successful.
       *
       * We don't automatically authenticate the user yet because
       * JWT login will be implemented next.
       */
      navigate("/login");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginbox register-box">
        {/* Logo */}
        <Logo variant="dark" />

        {/* Heading */}
        <h1>Create your account</h1>

        <p>
          Start preparing for your next interview with verified industry
          professionals.
        </p>

        {/* Error */}
        {error && <div className="form-error">{error}</div>}

        {/* Registration form */}
        <form onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="firstName">First name</label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Your Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last name</label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="primary full" disabled={loading}>
            {loading ? (
              "Creating account..."
            ) : (
              <>
                Create account
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Login */}
        <div className="auth-switch">
          <span>Already have an account?</span>

          <Link to="/login">Sign in</Link>
        </div>

        {/* Benefits */}
        <div className="register-benefits">
          <div>
            <CheckCircle2 size={15} />
            <span>Verified industry interviewers</span>
          </div>

          <div>
            <CheckCircle2 size={15} />
            <span>Realistic mock interview sessions</span>
          </div>

          <div>
            <CheckCircle2 size={15} />
            <span>Structured interview feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
}
