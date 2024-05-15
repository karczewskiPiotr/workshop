import { env } from "../env";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

// Use local db wtih posthres-js adapter in development
import { drizzle as drizzleDev } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use Neon serverless db in production
const pool = new Pool({ connectionString: env.DATABASE_URL });
const sql = postgres(env.DATABASE_URL, { idle_timeout: 300 });

export const db =
  env.NODE_ENV === "production" ? drizzle(pool) : drizzleDev(sql);
