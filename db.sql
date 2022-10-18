-- CREATE TABLE restaurants (
-- id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
-- name VARCHAR(50) NOT NULL,
-- location VARCHAR(50) NOT NULL,
-- price_range INT NOT NULL check(price_range BETWEEN 1 AND 5));




-- CREATE TABLE has_uuid_pkey (
--    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
--    name VARCHAR(50),
-- );

-- CREATE TABLE reviews (
--    id BIGSERIAL NOT NULL PRIMARY KEY,
--    restaurant_id uuid NOT NULL REFERENCES restaurants(id),
--    name VARCHAR(50) NOT NULL,
--    review TEXT NOT NULL,
--    rating INT NOT NULL check(rating BETWEEN 1 AND 5)

-- )

