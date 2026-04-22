-- ==========================================
-- DROP EXISTING TABLES (To allow clean rebuilds)
-- ==========================================
DROP TABLE IF EXISTS order_item CASCADE;
DROP TABLE IF EXISTS customer_order CASCADE;
DROP TABLE IF EXISTS cart_item CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS app_user CASCADE;

-- ==========================================
-- SPRINT 1: CORE TABLES
-- ==========================================

CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    venue VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SPRINT 2: CART & ORDER TABLES
-- ==========================================

-- 1. Cart Table
CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES app_user(id) ON DELETE CASCADE, -- Nullable for guests!
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure a user can only have ONE 'active' cart at a time
CREATE UNIQUE INDEX idx_one_active_cart_per_user 
ON cart (user_id) 
WHERE status = 'active';

-- 2. Cart Item Table
CREATE TABLE cart_item (
    id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0)
);

-- 3. Customer Order Table
CREATE TABLE customer_order (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES app_user(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order Item Table (Snapshot of the purchase)
CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES customer_order(id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES event(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL
);