"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";

export async function inviteMember(_previous: string, form: FormData): Promise<string> {
  const { userId, orgId, orgRole } = await auth();
  if (!userId || !orgId || orgRole !== "org:admin") return "Only team admins can send invitations.";
  const email = form.get("email");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
  const origin = (await headers()).get("origin");
  if (!origin) throw new Error("Invitation request has no origin");
  try {
    const client = await clerkClient();
    await client.organizations.createOrganizationInvitation({
      organizationId: orgId, inviterUserId: userId, emailAddress: email.trim(), role: "org:member",
      redirectUrl: new URL("/sign-in", origin).href,
    });
    return "Invitation sent.";
  } catch (error) {
    console.error("Clerk organization invitation failed", error);
    return "Invitation could not be sent. Check the address and try again.";
  }
}
