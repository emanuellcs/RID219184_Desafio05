CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    numero_paginas INTEGER,
    isbn VARCHAR(255),
    editora VARCHAR(255)
);