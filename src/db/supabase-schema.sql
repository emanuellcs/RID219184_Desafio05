-- Create the books table in Supabase
CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    numero_paginas INTEGER,
    isbn VARCHAR(255),
    editora VARCHAR(255)
);

-- Enable Row Level Security (recommended for production)
ALTER TABLE livros ENABLE ROW LEVEL SECURITY;

-- Create a policy for public access (adjust as needed for your security requirements)
-- This allows all operations for all users - you may want to restrict this in production
CREATE POLICY "Enable all operations for all users" ON livros
    FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_livros_isbn ON livros(isbn);
CREATE INDEX IF NOT EXISTS idx_livros_titulo ON livros(titulo);

-- Sample data (optional - remove in production)
-- INSERT INTO livros (titulo, numero_paginas, isbn, editora) VALUES
-- ('Dom Casmurro', 256, '9788525406699', 'Editora Globo'),
-- ('O Cortiço', 368, '9788525050205', 'Editora Martin Claret'),
-- ('Memórias Póstumas de Brás Cubas', 192, '9788594318602', 'Principis');