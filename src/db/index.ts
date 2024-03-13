import { env } from "@/env";
import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.DATABASE_URL) as NeonQueryFunction<boolean, boolean>;
export const db = drizzle(sql);
