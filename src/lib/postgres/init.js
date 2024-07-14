import "dotenv/config"
import postgres from "postgres"

// const result = await sql.file('query.sql', ['Murray', 68])

let pg = postgres(process.env.SUPABASE_DB_URL)
let init = await pg.file("./src/lib/postgres/init.sql")

console.log(init)

