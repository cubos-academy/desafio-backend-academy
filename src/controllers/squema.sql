CREATE TABLE IF NOT EXISTS usuários(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age SMALLINT NULL,
)
id, nome, email, senha, idade;