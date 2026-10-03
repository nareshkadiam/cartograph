"use client";
import { useActionState } from "react";
import { inviteMember } from "./invite-action";

export function InviteForm() {
  const [message, action, pending] = useActionState(inviteMember, "");
  return <details className="invite-control"><summary>Invite teammate</summary>
    <form action={action}>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <button disabled={pending} type="submit">{pending ? "Sending…" : "Send invitation"}</button>
      <p role="status">{message}</p>
    </form>
  </details>;
}
