import { cookies } from "next/headers";

const COOKIE_NAME = "dailyzap_admin";
const COOKIE_VALUE = "authenticated_admin_session_v1";

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session?.value === COOKIE_VALUE;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "supersecret123";
  return password === expected;
}
