import { supabase } from '../../src/lib/supabase.js';
import { bookCreateSchema } from '../../src/lib/validation.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    if (req.method === 'GET') {
      // Get all books
      const { data, error } = await supabase
        .from('livros')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      return res.status(200).json(data);
    }
    
    if (req.method === 'POST') {
      // Create a new book
      const { error: validationError, value } = bookCreateSchema.validate(req.body);
      if (validationError) {
        return res.status(400).json({ 
          message: validationError.details[0].message 
        });
      }
      
      const { data, error } = await supabase
        .from('livros')
        .insert([value])
        .select()
        .single();
      
      if (error) {
        // Check if it's a unique constraint violation (duplicate ID)
        if (error.code === '23505') {
          return res.status(400).json({ 
            message: 'Já existe um livro com este ID.' 
          });
        }
        throw error;
      }
      
      return res.status(201).json(data);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Algo deu errado no servidor!' 
    });
  }
}