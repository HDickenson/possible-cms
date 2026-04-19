-- 0001_core_tenancy.sql
-- ADR-002 core tenancy tables.
-- Phase A: single-workspace seed; tables shaped for multi-workspace (Phase B).

CREATE TABLE workspace (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  plan TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE project (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workspace_id INTEGER NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (workspace_id, slug)
);

CREATE TABLE site (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  domain TEXT,
  block_whitelist TEXT, -- JSON array; NULL = all registered blocks
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (project_id, slug)
);

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  github_id TEXT UNIQUE,
  email TEXT UNIQUE,
  name TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE membership (
  user_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  workspace_id INTEGER NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'owner' | 'editor' | 'developer' | 'viewer' (Phase B)
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (user_id, workspace_id)
);

CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_type TEXT NOT NULL, -- 'user' | 'agent'
  actor_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  workspace_id INTEGER,
  project_id INTEGER,
  site_id INTEGER,
  diff_json TEXT, -- JSON { before, after }
  trace_id TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX idx_audit_log_actor ON audit_log(actor_type, actor_id);
CREATE INDEX idx_audit_log_site ON audit_log(site_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Seed default workspace for Phase A single-workspace mode.
INSERT INTO workspace (id, name) VALUES (1, 'default');
