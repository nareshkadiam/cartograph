import "server-only";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function createDatabaseClient() {
  const { userId, orgId, getToken } = await auth();
  if (!userId || !orgId) throw new Error("A signed-in organization is required for database access");
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    // Clerk owns sessions; Supabase only receives its current organization token.
    accessToken: async () => {
      const token = await getToken();
      if (!token) throw new Error("Clerk did not provide a session token");
      return token;
    },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
