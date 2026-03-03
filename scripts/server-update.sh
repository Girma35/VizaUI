#!/usr/bin/env bash
# Run on the server after code is rsync'd (no git pull). deploy.sh runs this via SSH.
# Edit this file to change server deploy steps; re-run deploy and it will use the new steps.

set -e
cd ~/VizaUI || exit 1

echo "[deploy] Installing dependencies..."
npm install

echo "[deploy] Generating Prisma client..."
npx prisma generate 2>/dev/null || true

echo "[deploy] Building..."
npm run build

echo "[deploy] Restarting app..."
pm2 restart viza 2>/dev/null || pm2 start npm --name "viza" -- start

echo "[deploy] Done."
