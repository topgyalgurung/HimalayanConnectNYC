/**
 * NextAuth API route handler
 * Handles all /api/auth/* routes (signin, callback, signout, session, etc.)
 */

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
