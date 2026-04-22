-- Query 1: Get all events (sorted by date)
SELECT * FROM event ORDER BY event_date ASC;

-- Query 2: Get a specific event by ID (Example using ID 1)
SELECT * FROM event WHERE id = 1;

-- ==========================================
-- SPRINT 2: ADVANCED QUERIES
-- ==========================================

-- 1. Paginated item listing (LIMIT, sorting)
-- This fetches the first 2 upcoming events (Page 1)
SELECT id, title, event_date, price 
FROM event 
ORDER BY event_date ASC 
LIMIT 2 OFFSET 0;

-- 2. Cart subtotal calculation
-- This joins the cart_item with the event table to calculate Jane's total (2x Festival + 1x Comedy)
SELECT 
    ci.cart_id,
    SUM(ci.quantity * e.price) AS cart_subtotal
FROM cart_item ci
JOIN event e ON ci.event_id = e.id
WHERE ci.cart_id = 1
GROUP BY ci.cart_id;

-- 3. Order totals snapshot logic
-- This proves we are using the 'price_at_purchase' (the snapshot) rather than the current event price
SELECT 
    co.id AS order_id,
    co.user_id,
    oi.event_id,
    oi.quantity,
    oi.price_at_purchase,
    (oi.quantity * oi.price_at_purchase) AS line_total
FROM customer_order co
JOIN order_item oi ON co.id = oi.order_id
WHERE co.id = 1;