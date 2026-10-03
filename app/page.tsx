import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ThemeControl } from "./theme-control";
import { InviteForm } from "./invite-form";

export default async function Workspace() {
  const { userId, orgId, orgRole } = await auth();
  if (!userId) redirect("/sign-in");
  if (!orgId) throw new Error("No active organization. Enable Clerk membership required and automatic organization creation.");
  return (
    <div className="workspace">
      <header className="topbar">
        <strong>Cartograph</strong>
        <OrganizationSwitcher hidePersonal afterSelectOrganizationUrl="/" afterCreateOrganizationUrl="/" />
        <div className="account-controls">{orgRole === "org:admin" && <InviteForm />}<ThemeControl /><UserButton /></div>
      </header>
      <div className="panels">
        <aside className="panel repositories" aria-label="Repositories"><h2>Repositories</h2><p>No repository mapped yet.</p></aside>
        <main className="map-panel">
          <div className="panel-heading"><h1>Workspace</h1><span className="organization-id">{orgId}</span></div>
          <div className="empty-map"><h2>Your team&apos;s dependency map</h2><p>Repository mapping is not available yet.</p></div>
        </main>
        <aside className="panel details" aria-label="File details"><h2>File details</h2><p>No file selected.</p></aside>
      </div>
    </div>
  );
}
