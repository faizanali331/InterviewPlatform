import type { LucideIcon } from "lucide-react";

type StatProps = {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
};

export default function Stat({ label, value, meta, icon: Icon }: StatProps) {
  return (
    <div className="stat">
      <Icon />

      <span>{label}</span>

      <b>{value}</b>

      <small>{meta}</small>
    </div>
  );
}
