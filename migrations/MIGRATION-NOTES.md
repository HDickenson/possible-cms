# Migration Notes

Every migration file under `migrations/` has a corresponding entry here describing intent, breaking changes, and operator notes.

## 0001_core_tenancy.sql (pending)

- Creates `workspace`, `project`, `site`, `user`, `membership`, `audit_log`.
- Seeds `workspace(id=1, name='default')` for Phase A single-workspace mode.
- Forward-only. Rollback requires manual D1 reset.
