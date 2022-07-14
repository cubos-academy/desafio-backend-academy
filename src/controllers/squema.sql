CREATE TABLE IF NOT EXISTS usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
)

CREATE TABLE IF NOT EXISTS categorias(
    id SERIAL PRIMARY KEY,
    descricao TEXT
)

CREATE TABLE IF NOT EXISTS transacoes(
    id SERIAL PRIMARY KEY,
    tipo TEXT  
    descricao TEXT,
    valor INTEGER ('hex'),
    data TIMESTAMPTZ,
    categoria_id SMALINT,
    usuario_id SMALLINT,
)

