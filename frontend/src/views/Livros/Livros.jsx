import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header/Header';
import "./index.scss";
import LivrosService from '../../api/LivrosService';
import { Link } from "react-router-dom";
import Modal from '../../components/Modal/Modal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Livros = () => {

  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [livroToDelete, setLivroToDelete] = useState(null);

  async function getLivros() {
    try {
      const { data } = await LivrosService.getLivros();
      setLivros(data);
    } catch (error) {
      toast.error('Erro ao carregar os livros.');
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteClick = (livroId) => {
    setLivroToDelete(livroId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowConfirmation(false);
    try {
      await LivrosService.deleteLivro(livroToDelete);
      toast.success('Livro removido com sucesso!');
      getLivros();
    } catch (error) {
      const { response } = error;
      if (response) {
        toast.error(`${response.status} - ${response.data.message}`);
      } else {
        toast.error('Erro ao conectar ao servidor.');
      }
    } finally {
      setLivroToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setLivroToDelete(null);
  };

  useEffect(() => {
    getLivros()
  },[])

  return (
    <>
      <Header />
      <div className='livros'>
        <h1>Escolha o seu livro</h1>
        {loading ? (
          <LoadingSpinner />
        ) : livros.length === 0 ? (
          <p className='no-books-message'>Nenhum livro cadastrado.</p>
        ) : (
          <div className='cards-container'>
            {livros.map((livro) => (
              <div className='card' key={livro.id} onClick={() => setSelectedLivro(livro)}>
                <h3>{livro.titulo}</h3>
                <span>{livro.editora}</span>
                <div className='botoes'>
                  <Link className='btn edit' to={`/livros/edicao/${livro.id}`} onClick={(e) => e.stopPropagation()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                  </Link>
                  <button className='btn delete' onClick={(e) => { e.stopPropagation(); handleDeleteClick(livro.id); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal livro={selectedLivro} onClose={() => setSelectedLivro(null)} />
      {showConfirmation && (
        <ConfirmationModal
          message={`Você realmente deseja remover o livro de ID: ${livroToDelete}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  )
  
}

export default Livros