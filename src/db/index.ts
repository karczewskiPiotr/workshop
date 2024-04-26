import { env } from "../env";
import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Use local db wtih posthres-js adapter in development
import { drizzle as drizzleDev } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use Neon serverless db in production
const sql = neon(env.DATABASE_URL) as NeonQueryFunction<boolean, boolean>;
const sqlDev = postgres(env.DATABASE_URL, { idle_timeout: 300 });

export const db =
  env.NODE_ENV === "production" ? drizzle(sql) : drizzleDev(sqlDev);
