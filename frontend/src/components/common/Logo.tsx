type LogoProps = {
  variant?: "light" | "dark";
};

export default function Logo({ variant = "light" }: LogoProps) {
  return (
    <div className={`brand ${variant}`}>
      <b>IP</b> InterviewPro
    </div>
  );
}
