-- Insert 1 test user
INSERT INTO app_user (first_name, last_name, email, password_hash) 
VALUES ('Jane', 'Doe', 'jane.doe@example.com', 'hashed_password_placeholder');

-- Insert multiple catalog items (events)
INSERT INTO event (title, description, event_date, venue, price) 
VALUES 
('Summer Music Festival', 'A three-day outdoor music event.', '2026-07-15 12:00:00', 'Central Park', 150.00),
('Tech Conference 2026', 'Annual software development conference.', '2026-09-10 09:00:00', 'Convention Center', 299.99),
('Standup Comedy Night', 'An evening of laughs with local comedians.', '2026-05-20 20:00:00', 'The Comedy Club', 25.50);

-- 3. Seed an Active Cart for Jane Doe (user_id 1)
INSERT INTO cart (user_id, status) 
VALUES (1, 'active');

-- 4. Seed Cart Items (Jane wants 2 Festival tickets and 1 Comedy ticket)
-- (cart_id 1 is Jane's cart. event_id 1 is Festival, event_id 3 is Comedy)
INSERT INTO cart_item (cart_id, event_id, quantity) VALUES 
(1, 1, 2),
(1, 3, 1);

-- 5. Seed a Past Completed Order for Jane 
-- (Simulating she previously bought 1 Tech Conference ticket)
INSERT INTO customer_order (user_id, total_amount, status) 
VALUES (1, 300.00, 'completed');

-- 6. Seed Order Items (Using the "price snapshot" logic)
INSERT INTO order_item (order_id, event_id, quantity, price_at_purchase) VALUES 
(1, 2, 1, 300.00);