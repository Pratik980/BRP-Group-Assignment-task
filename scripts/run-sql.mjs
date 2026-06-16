/**
 * Run a SQL migration file against the linked Supabase project.
 *
 * Option A (recommended): set SUPABASE_ACCESS_TOKEN in .env
 *   Create at https://supabase.com/dashboard/account/tokens
 *
 * Option B: set DATABASE_URL in .env (Postgres connection string from Supabase → Settings → Database)
 *
 * Usage:
 *   node scripts/run-sql.mjs supabase/migrations/20260612100000_admin_authenticated_write.sql
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  if (!existsSync(envPath)) return {};
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

async function runViaManagementApi(projectRef, token, sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Management API ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function runViaPg(databaseUrl, sql) {
  const { default: pg } = await import("pg");
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(sql);
  } finally {
    await client.end();
  }
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    console.error("Usage: node scripts/run-sql.mjs <path-to.sql>");
    process.exit(1);
  }

  const sqlPath = resolve(root, fileArg);
  const sql = readFileSync(sqlPath, "utf8");
  const env = { ...loadEnv(), ...process.env };

  const projectRef =
    env.VITE_SUPABASE_PROJECT_ID ||
    env.SUPABASE_PROJECT_REF ||
    (env.VITE_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? "");

  if (!projectRef) {
    console.error("Could not detect project ref. Set VITE_SUPABASE_PROJECT_ID in .env");
    process.exit(1);
  }

  console.log(`Running ${fileArg} on project ${projectRef}…`);

  if (env.SUPABASE_ACCESS_TOKEN) {
    const result = await runViaManagementApi(projectRef, env.SUPABASE_ACCESS_TOKEN, sql);
    console.log("Done (Management API).", result ?? "");
    return;
  }

  if (env.DATABASE_URL) {
    await runViaPg(env.DATABASE_URL, sql);
    console.log("Done (direct Postgres).");
    return;
  }

  console.error(`
Cannot run migration — missing credentials in .env.

Add ONE of these:

  SUPABASE_ACCESS_TOKEN=your_personal_access_token
  (create at https://supabase.com/dashboard/account/tokens)

  — or —

  DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
  (from Supabase → Project Settings → Database → Connection string)
`);
  process.exit(1);
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
