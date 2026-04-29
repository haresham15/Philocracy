-- Run this in your Supabase SQL Editor to add tracking columns
-- These columns store the Shippo label data so you can reprint labels
-- and never accidentally double-purchase postage.

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_number text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS label_url text;
