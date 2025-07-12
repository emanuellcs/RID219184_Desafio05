import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './views/Home/Home';
import Livros from './views/Livros/Livros';
import LivrosCadastro from './views/LivrosCadastro/LivrosCadastro';
import LivrosEdicao from './views/LivrosEdicao/LivrosEdicao';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/livros",
    element: <Livros/>,
  },
  {
    path: "/livros/cadastro",
    element: <LivrosCadastro />,
  },
  {
    path: "/livros/edicao/:livroId",
    element: <LivrosEdicao />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
