import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <main>
        <Topbar />
        <section>{children}</section>
      </main>
    </div>
  );
}
