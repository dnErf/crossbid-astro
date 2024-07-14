CREATE TABLE IF NOT EXISTS "public"."crossbid_users" (
  "id" uuid references auth.users,
  "name" text,
  "email" text,
  "main_image_url" text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "public"."crossbid_auctions" (
  "id" uuid DEFAULT gen_random_uuid(),
  "user_id" uuid,
  "name" text,
  "image_url" text,
  "cents_current_bid" numeric,
  "cents_starting_price" numeric,
  "cents_bid_interval" numeric,
  "end_at" timestamp DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "public"."crossbid_bids" (
  "id" serial,
  "auction_id" uuid,
  "user_id" uuid,
  "cents_amount" numeric,
  "date_at" timestamp DEFAULT now(),
  PRIMARY KEY (id)
);
