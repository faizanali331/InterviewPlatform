import Header from "../../components/common/Header";
import Stat from "../../components/common/Stat";
import { Wallet, TrendingUp, Clock } from "lucide-react";

export default function Earnings() {
  return (
    <>
      <Header
        title="Earnings"
        sub="Track your interview earnings and payouts."
      />
      <div className="notice">
        <span>
          Demo data — revenue split and payouts aren't built on the backend yet.
        </span>
      </div>

      <div className="stats">
        <Stat
          label="Total earned"
          value="₹0"
          meta="No payout system yet"
          icon={Wallet}
        />
        <Stat
          label="This month"
          value="₹0"
          meta="Placeholder"
          icon={TrendingUp}
        />
        <Stat
          label="Pending payout"
          value="₹0"
          meta="Placeholder"
          icon={Clock}
        />
      </div>

      <div className="panel">
        <h3>Bank details</h3>
        <p className="hint">
          Not connected — payout collection isn't built yet.
        </p>
        <input placeholder="Account holder name" disabled />
        <input placeholder="Account number" disabled />
        <input placeholder="IFSC code" disabled />
      </div>
    </>
  );
}
