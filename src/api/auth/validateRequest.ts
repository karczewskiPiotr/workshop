import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export default cache(async function validateRequest() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const cookie = lucia.createSessionCookie(result.session.id);
      cookies().set(cookie.name, cookie.value, cookie.attributes);
    }
    if (!result.session) {
      const cookie = lucia.createBlankSessionCookie();
      cookies().set(cookie.name, cookie.value, cookie.attributes);
    }
  } catch (error: unknown) {
    console.error(error);
  }

  return result;
});
