-- Insert 1 test user
INSERT INTO app_user (first_name, last_name, email, password_hash) 
VALUES ('Jane', 'Doe', 'jane.doe@example.com', 'hashed_password_placeholder');

-- Insert multiple catalog items (events)
INSERT INTO event (title, description, event_date, venue, price) 
VALUES 
('Summer Music Festival', 'A three-day outdoor music event.', '2026-07-15 12:00:00', 'Central Park', 150.00),
('Tech Conference 2026', 'Annual software development conference.', '2026-09-10 09:00:00', 'Convention Center', 299.99),
('Standup Comedy Night', 'An evening of laughs with local comedians.', '2026-05-20 20:00:00', 'The Comedy Club', 25.50);