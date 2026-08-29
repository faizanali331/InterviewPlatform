import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <Logo />

        <div className="landing-actions">
          <button className="secondary" onClick={() => navigate("/login")}>
            Sign in
          </button>

          <button className="primary" onClick={() => navigate("/register")}>
            Get started
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <ShieldCheck size={15} />
              Verified industry professionals
            </div>

            <h1>
              Practice interviews
              <br />
              with people who
              <br />
              <span>actually hire.</span>
            </h1>

            <p>
              InterviewPro connects candidates with verified industry
              professionals for realistic, structured mock interviews.
            </p>

            <div className="hero-buttons">
              <button
                className="primary large"
                onClick={() => navigate("/register")}
              >
                Start practicing
                <ArrowRight size={17} />
              </button>

              <button
                className="secondary large"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </div>

            <div className="hero-trust">
              <span>
                <CheckCircle2 size={15} />
                Verified interviewers
              </span>

              <span>
                <CheckCircle2 size={15} />
                Real interview experience
              </span>

              <span>
                <CheckCircle2 size={15} />
                Structured feedback
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <span>Next generation interview prep</span>
                <h3>Real people. Real interviews.</h3>
              </div>

              <div className="hero-icon">
                <Video size={22} />
              </div>
            </div>

            <div className="hero-stats">
              <div>
                <Users size={18} />
                <strong>500+</strong>
                <span>Verified professionals</span>
              </div>

              <div>
                <Video size={18} />
                <strong>2,000+</strong>
                <span>Mock interviews</span>
              </div>
            </div>

            <div className="interview-preview">
              <div className="preview-dot" />

              <div>
                <strong>Senior Software Engineer</strong>
                <span>Java · Spring Boot · System Design</span>
              </div>

              <span className="preview-badge">Verified</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="landing-features">
          <div>
            <ShieldCheck size={20} />
            <h3>Verified professionals</h3>
            <p>
              Interview with professionals whose industry experience has been
              verified.
            </p>
          </div>

          <div>
            <Video size={20} />
            <h3>Real interview environment</h3>
            <p>Conduct your mock interview directly inside InterviewPro.</p>
          </div>

          <div>
            <CheckCircle2 size={20} />
            <h3>Actionable feedback</h3>
            <p>
              Get structured feedback on technical skills, communication, and
              problem solving.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <Logo />

        <span>
          © {new Date().getFullYear()} InterviewPro. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
