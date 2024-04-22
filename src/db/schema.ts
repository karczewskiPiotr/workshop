import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: text("id").primaryKey(), // Not UUID due to lucia constraints
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(), // Not UUID due to lucia constraints
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const emailVerificationCodes = pgTable("email_verification_code", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const garages = pgTable("garage", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  owner: text("owner")
    .references(() => users.id)
    .notNull(),
});

export const employees = pgTable("employee", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  garageId: uuid("garage_id")
    .references(() => garages.id)
    .notNull(),
  status: text("status", { enum: ["pending", "active"] })
    .notNull()
    .default("pending"),
});

export const clients = pgTable("client", {
  id: uuid("id").primaryKey().defaultRandom(),
  garageId: uuid("garage_id")
    .references(() => garages.id)
    .notNull(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
});

export type User = typeof users.$inferSelect;
export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  name: (schema) =>
    schema.name.min(2, {
      message: "Username must contain at least 2 characters",
    }),
  surname: (schema) =>
    schema.name.min(2, {
      message: "Surname must contain at least 2 characters",
    }),
  password: (schema) =>
    schema.password.min(4, {
      message: "Password must contain at least 4 characters",
    }),
});
export const selectUserSchema = createSelectSchema(users);

export type EmailVerificationCode = typeof emailVerificationCodes.$inferSelect;
export const insertEmailVerificationCodeSchema = createInsertSchema(
  emailVerificationCodes,
  {
    email: (schema) => schema.email.email(),
  }
);

export type Garage = typeof garages.$inferSelect;
export const insertGarageSchema = createInsertSchema(garages, {
  name: (schema) =>
    schema.name.min(2, {
      message: "Garage name must contain at least 2 characters",
    }),
});

export type Employee = typeof employees.$inferSelect;
export const insertEmployeeSchema = createInsertSchema(employees);

export type Clinet = typeof clients.$inferSelect;
export const insertClientSchema = createInsertSchema(clients, {
  name: (schema) =>
    schema.name.min(2, {
      message: "Client name must contain at least 2 characters",
    }),
  surname: (schema) =>
    schema.name.min(2, {
      message: "Client surname must contain at least 2 characters",
    }),
  email: (schema) => schema.email.email().nullable(),
});
