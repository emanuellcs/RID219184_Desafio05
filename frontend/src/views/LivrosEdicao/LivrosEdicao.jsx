import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header/Header'
import "./index.scss"
import { useParams } from 'react-router-dom'
import LivrosService from '../../api/LivrosService'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const LivrosEdicao = () => {
  let {livroId} = useParams();

  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro(data);
    } catch (error) {
      toast.error('Erro ao carregar o livro.');
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();

  async function editLivro(e) {
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
      await LivrosService.updateLivro(livroId, body);
      toast.success('Livro atualizado com sucesso!');
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

  useEffect(() => {
    getLivro()
  }, [])

  return (
  <>
    <Header/>
    <div className='livrosCadastro'>
      <h1>Edição de Livros</h1>
      {loading && !livro ? (
        <LoadingSpinner />
      ) : (
        <form id="formulario" onSubmit={editLivro}>
            <div className='form-group'>
                <label htmlFor='id'>Id</label>
                <input
                    type="number"
                    id='id'
                    required
                    value={livro?.id || ''}
                    onChange={(event) => setLivro({ ...livro, id: event.target.value })}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='titulo'>Titulo</label>
                <input
                    type="text"
                    id='titulo'
                    required
                    value={livro?.titulo || ''}
                    onChange={(event) => setLivro({ ...livro, titulo: event.target.value })}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='num'>Número de Páginas</label>
                <input
                    type="number"
                    id='num'
                    required
                    value={livro?.numero_paginas || ''}
                    onChange={(event) => setLivro({ ...livro, numero_paginas: event.target.value })}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='isbn'>ISBN</label>
                <input type="text" id='isbn' required value={livro?.isbn || ''} onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
                <label htmlFor='editora'>Editora</label>
                <input
                    type="text"
                    id='editora'
                    required
                    value={livro?.editora || ''}
                    onChange={(event) => setLivro({ ...livro, editora: event.target.value })}
                />
            </div>
            <div className='form-group full-width'>
                <button type="button" className="back-button" onClick={() => navigate('/livros')}>
                    VOLTAR
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? 'ATUALIZANDO...' : 'ATUALIZAR LIVRO'}
                </button>
            </div>
        </form>
      )}
    </div>
  </>)
  
}

export default LivrosEdicao