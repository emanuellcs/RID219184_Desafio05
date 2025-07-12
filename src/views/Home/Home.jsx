import React from 'react';
import Header from "../../components/Header/Header";
import "./index.scss";

const Home = () => {
  return (
    <>
      <Header/>
      <div className='home'>
        <h1>Bem-vindo à Biblioteca Central Online</h1>
        <p>Explore nossa vasta coleção de livros, cadastre novos títulos e gerencie sua biblioteca de forma eficiente.</p>
      </div>
    </>
  )
}

export default Home