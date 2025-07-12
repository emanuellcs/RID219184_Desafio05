import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header/Header'
import "./index.scss"
import LivrosService from '../../api/LivrosService'

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    numero_paginas: '',
    isbn: '',
    editora: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createLivro(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      numero_paginas: Number(livro.numero_paginas),
      isbn: livro.isbn,
      editora: livro.editora,
    };
    try {
      await LivrosService.createLivro(body);
      toast.success('Livro cadastrado com sucesso!');
      navigate('/livros');
    } catch (error) {
      const { response } = error;
      if (response) {
        toast.error(`${response.status} - ${response.data.message}`);
      } else {
        toast.error('Erro ao conectar ao servidor.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
  <>
    <Header/>    
    <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <form id="formulario" onSubmit={createLivro}>
            <div className='form-group'>
                <label htmlFor='id'>Id</label>
                <input
                    type="number"
                    id='id'
                    required
                    value={livro.id}
                    onChange={(event) => setLivro({ ...livro, id: event.target.value })}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='titulo'>Titulo</label>
                <input
                    type="text"
                    id='titulo'
                    required
                    value={livro.titulo}
                    onChange={(event) => setLivro({ ...livro, titulo: event.target.value })}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='num'>Número de Páginas</label>
                <input
                    type="number"
                    id='num'
                    required
                    value={livro.numero_paginas}
                    onChange={(event) => setLivro({ ...livro, numero_paginas: event.target.value })}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='isbn'>ISBN</label>
                <input type="text" id='isbn' required value={livro.isbn} onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
                <label htmlFor='editora'>Editora</label>
                <input
                    type="text"
                    id='editora'
                    required
                    value={livro.editora}
                    onChange={(event) => setLivro({ ...livro, editora: event.target.value })}
                />
            </div>
            <div className='form-group full-width'>
                <button type="button" className="back-button" onClick={() => navigate('/livros')}>
                    VOLTAR
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? 'CADASTRANDO...' : 'CADASTRAR LIVRO'}
                </button>
            </div>
        </form>
    </div>
  </>)
  
}

export default LivrosCadastro