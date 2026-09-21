import Header from "../../components/common/Header";

export default function PlatformSettings() {
  return (
    <>
      <Header
        title="Platform settings"
        sub="Global configuration. Only visible to Super Admin."
      />
      <div className="notice">
        <span>None of these are wired to the backend yet — layout only.</span>
      </div>

      <div className="cols">
        <div className="panel">
          <h3>Pricing configuration</h3>
          <input placeholder="Base interview fee (₹)" disabled />
          <input placeholder="Platform commission (%)" disabled />
        </div>
        <div className="panel">
          <h3>Security</h3>
          <label>
            <input type="checkbox" disabled /> Require 2FA for admins
          </label>
          <label>
            <input type="checkbox" disabled /> Force password reset every 90
            days
          </label>
        </div>
      </div>
    </>
  );
}
