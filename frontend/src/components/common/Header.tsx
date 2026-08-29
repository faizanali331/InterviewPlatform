import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  sub?: string;
  action?: ReactNode;
};

export default function Header({ title, sub, action }: HeaderProps) {
  return (
    <div className="header">
      <div>
        <small>INTERVIEWPRO</small>

        <h1>{title}</h1>

        {sub && <p>{sub}</p>}
      </div>

      {action}
    </div>
  );
}
