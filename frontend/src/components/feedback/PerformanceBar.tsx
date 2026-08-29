type PerformanceBarProps = {
  label: string;
  value: number;
};

export default function PerformanceBar({ label, value }: PerformanceBarProps) {
  return (
    <div className="bar">
      <span>{label}</span>

      <div>
        <i
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <b>{value}%</b>
    </div>
  );
}
