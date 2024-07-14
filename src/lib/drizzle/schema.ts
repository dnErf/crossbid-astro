import { pgTable, text, timestamp, serial, integer, pgSchema } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

let prefix = "crossbid"

let scheme = pgSchema("crossbid")

export const users = scheme.table(`${prefix}_users`, {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image")
})

export const auctions = scheme.table(`${prefix}_auctions`, {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    pic: text("pic").notNull(),
    currentBid: integer("current_bid").notNull().default(0),
    startingPriceInCents: integer("starting_price_in_cents").notNull().default(0),
    bidInterval: integer("bid_interval").notNull().default(10),
    endDate: timestamp("end_date", { mode: "date" }).notNull()
})

export const bids = scheme.table(`${prefix}_bids`, {
    id: serial("id").primaryKey(),
    amount: integer("amount").notNull(),
    auctionId: serial("auction_id")
      .notNull()
      .references(() => auctions.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
})

export const usersRelations = relations(bids, ({ one }) => ({
    user: one(users, {
        fields: [bids.userId],
        references: [users.id]
    })
}))
