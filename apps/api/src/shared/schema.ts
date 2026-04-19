// ADR-002 — Drizzle ORM schema matching 0001_core_tenancy.sql.
// These definitions are the single source of truth for type-safe D1 queries.

import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const timestamp = () =>
  text("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`);

// ── Tenant hierarchy ────────────────────────────────────────────────

export const workspace = sqliteTable("workspace", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  plan: text("plan"),
  createdAt: timestamp(),
});

export const project = sqliteTable(
  "project",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    createdAt: timestamp(),
  },
  (table) => ({
    uniqWorkspaceSlug: uniqueIndex("project_workspace_slug").on(
      table.workspaceId,
      table.slug,
    ),
  }),
);

export const site = sqliteTable(
  "site",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    projectId: integer("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    domain: text("domain"),
    blockWhitelist: text("block_whitelist"), // JSON array; NULL = all
    createdAt: timestamp(),
  },
  (table) => ({
    uniqProjectSlug: uniqueIndex("site_project_slug").on(
      table.projectId,
      table.slug,
    ),
  }),
);

// ── Identity ────────────────────────────────────────────────────────

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  githubId: text("github_id").unique(),
  email: text("email").unique(),
  name: text("name"),
  createdAt: timestamp(),
});

export const membership = sqliteTable(
  "membership",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    role: text("role").notNull(), // 'owner' | 'editor' | 'developer' | 'viewer'
    createdAt: timestamp(),
  },
  (table) => ({
    pk: uniqueIndex("membership_pk").on(table.userId, table.workspaceId),
  }),
);

// ── Audit ───────────────────────────────────────────────────────────

export const auditLog = sqliteTable(
  "audit_log",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    actorType: text("actor_type").notNull(), // 'user' | 'agent'
    actorId: integer("actor_id").notNull(),
    action: text("action").notNull(),
    targetType: text("target_type").notNull(),
    targetId: text("target_id").notNull(),
    workspaceId: integer("workspace_id"),
    projectId: integer("project_id"),
    siteId: integer("site_id"),
    diffJson: text("diff_json"), // JSON { before, after }
    traceId: text("trace_id"),
    createdAt: timestamp(),
  },
  (table) => ({
    idxActor: index("idx_audit_log_actor").on(table.actorType, table.actorId),
    idxSite: index("idx_audit_log_site").on(table.siteId),
    idxCreatedAt: index("idx_audit_log_created_at").on(table.createdAt),
  }),
);
