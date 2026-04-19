#!/usr/bin/env bash
# Grep-gate: forbids project-specific literals (aiia, barbuda, kanousei, sunstone, lrg)
# in apps/ and packages/. Consumer-specific code belongs in examples/<project>/ only.
# Enforces PRD "built-for-Harold" risk mitigation.

set -euo pipefail

FORBIDDEN_PATTERNS=(aiia barbuda kanousei sunstone lrg)
SEARCH_DIRS=(apps packages)

VIOLATIONS_FOUND=0

for dir in "${SEARCH_DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    continue
  fi
  for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
    # Case-insensitive, word-boundary-ish match, excluding .d.ts comments + build artefacts.
    matches=$(grep -r -i -n -E "\\b${pattern}\\b" "$dir" \
      --exclude-dir=node_modules \
      --exclude-dir=.next \
      --exclude-dir=dist \
      --exclude-dir=.turbo \
      2>/dev/null || true)

    if [ -n "$matches" ]; then
      echo "❌ Forbidden literal '${pattern}' found in ${dir}/:"
      echo "$matches"
      echo ""
      VIOLATIONS_FOUND=1
    fi
  done
done

if [ "$VIOLATIONS_FOUND" -eq 1 ]; then
  echo ""
  echo "💡 Project-specific code (AIIA, Barbuda, etc.) belongs in examples/<project>/, not apps/ or packages/."
  echo "See CONTRIBUTING.md and PRD §Scope Boundaries for the rule."
  exit 1
fi

echo "✅ Grep-gate passed: no forbidden project-specific literals in apps/ or packages/."
