CREATE EXTENSION pgcrypto;

CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role user_role DEFAULT 'USER',
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO users (username, password, role, registration_date)
VALUES ('user', '$2b$10$ZNwvWRVM2CJOFnQfAl9OHeoqv5BIfI2EjjgnGSIjTTyITf8tYztj6', 'USER', '2023-05-30'),
       ('admin', '$2b$10$/z2MYsGOiOu/prV2YzwmK.4MLitwC9KiWPZFkSqFpVJyMYmjam7z6', 'ADMIN', '2012-12-21');

