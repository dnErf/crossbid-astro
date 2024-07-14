import postgres from "postgres"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "@/lib/drizzle/schema"

let database: PostgresJsDatabase<typeof schema>
let pg: ReturnType<typeof postgres>

pg = postgres(import.meta.env.SUPABASE_DB_URL)
database = drizzle(pg, { schema })

export { database, pg }
