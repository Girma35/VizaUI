#!/usr/bin/env bash
# Deploy VizaUI to the server: rsync only (no git pull). Sync files, then run server-update.sh.
# Run from project root: ./scripts/deploy.sh
# Requires: rsync, ssh with access to host "viza" (see ~/.ssh/config)

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SSH_HOST="${DEPLOY_SSH_HOST:-viza}"
REMOTE_DIR="${DEPLOY_REMOTE_DIR:-~/VizaUI}"

cd "$PROJECT_ROOT"
echo "[deploy] Syncing to $SSH_HOST:$REMOTE_DIR ..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '*.db' \
  --exclude '*.db-journal' \
  "$PROJECT_ROOT/" "$SSH_HOST:$REMOTE_DIR/"

echo "[deploy] Running server update..."
ssh "$SSH_HOST" "cd $REMOTE_DIR && bash -s" < "$SCRIPT_DIR/server-update.sh"

echo "[deploy] Deploy finished."
