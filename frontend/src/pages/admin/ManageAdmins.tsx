import { useState } from "react";
import Header from "../../components/common/Header";
import { createAdmin } from "../../api/adminApi";
import { ApiClientError } from "../../api/apiClient";

export default function ManageAdmins() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleCreate = async () => {
    setError(null);
    try {
      await createAdmin(form);
      setSuccess(true);
      setForm({ email: "", password: "", firstName: "", lastName: "" });
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Failed to create admin.",
      );
    }
  };

  return (
    <>
      <Header
        title="Manage admins"
        sub="Create new admin accounts. Only visible to Super Admin."
      />
      {error && <div className="error">{error}</div>}
      {success && (
        <div className="notice">
          <span>Admin created successfully.</span>
        </div>
      )}

      <div className="panel">
        <h3>Create admin</h3>
        <input
          placeholder="First name"
          value={form.firstName}
          onChange={update("firstName")}
        />
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
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={update("password")}
        />
        <button className="primary" onClick={handleCreate}>
          Create admin
        </button>
      </div>

      <div className="panel">
        <h3>Existing admins</h3>
        <p className="hint">
          Listing isn't built yet — no GET endpoint exists for admin accounts.
        </p>
      </div>
    </>
  );
}
