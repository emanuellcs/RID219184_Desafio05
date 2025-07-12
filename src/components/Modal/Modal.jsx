import React from 'react';
import './index.scss';

const Modal = ({ livro, onClose }) => {
  if (!livro) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{livro.titulo}</h2>
        <p><strong>ID:</strong> {livro.id}</p>
        <p><strong>Nº de Páginas:</strong> {livro.numero_paginas}</p>
        <p><strong>ISBN:</strong> {livro.isbn}</p>
        <p><strong>Editora:</strong> {livro.editora}</p>
      </div>
    </div>
  );
};

export default Modal;