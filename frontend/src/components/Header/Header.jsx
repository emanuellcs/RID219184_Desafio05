import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import "./index.scss";

function Header() {
  return (
    <div className='header'>
        <Link to="/"><img src={logo}/></Link>
        <nav>
            <ul>
                <li><Link to="/livros">Listar livros</Link></li>
                <li><Link to="/livros/cadastro">Cadastrar livros</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header
