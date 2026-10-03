function required(name: string, value: string | undefined): string {
  if (!value?.trim()) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
export function validateEnvironment() {
  required("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  required("CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY);
  const url = required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (!URL.canParse(url) || !["https:", "http:"].includes(new URL(url).protocol)) throw new Error("NEXT_PUBLIC_SUPABASE_URL must be an HTTP(S) URL");
  required("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
