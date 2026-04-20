-- Query 1: Get all events (sorted by date)
SELECT * FROM event ORDER BY event_date ASC;

-- Query 2: Get a specific event by ID (Example using ID 1)
SELECT * FROM event WHERE id = 1;