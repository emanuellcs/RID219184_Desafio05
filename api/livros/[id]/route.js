import { supabase } from '../../../src/lib/supabase.js';
import { bookUpdateSchema } from '../../../src/lib/validation.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { id } = req.query;
  
  try {
    if (req.method === 'GET') {
      // Get a single book by ID
      console.log('getLivroById: Requested ID:', id);
      
      const { data, error } = await supabase
        .from('livros')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log('getLivroById: Book not found for ID:', id);
          return res.status(404).send('Livro não encontrado');
        }
        throw error;
      }
      
      console.log('getLivroById: Result:', data);
      return res.json(data);
    }
    
    if (req.method === 'PUT') {
      // Update a book
      console.log('updateLivro: Incoming request body:', req.body, 'ID:', id);
      
      const { error: validationError, value } = bookUpdateSchema.validate(req.body);
      if (validationError) {
        console.log('updateLivro: Joi validation error:', validationError.details[0].message);
        return res.status(400).json({ message: validationError.details[0].message });
      }
      
      const fields = Object.keys(value);
      if (fields.length === 0) {
        return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
      }
      
      console.log('updateLivro: Data to be updated:', value, 'for ID:', id);
      
      const { data, error } = await supabase
        .from('livros')
        .update(value)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).send('Livro não encontrado');
        }
        throw error;
      }
      
      return res.json(data);
    }
    
    if (req.method === 'DELETE') {
      // Delete a book
      console.log('deleteLivro: ID to be deleted:', id);
      
      const { error, count } = await supabase
        .from('livros')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      if (count === 0) {
        console.log('deleteLivro: Book not found for ID:', id);
        return res.status(404).send('Livro não encontrado');
      }
      
      console.log('deleteLivro: Book deleted for ID:', id);
      return res.status(204).send();
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Algo deu errado no servidor!' 
    });
  }
}