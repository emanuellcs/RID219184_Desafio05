# RID219184_Desafio05

Este projeto é o Desafio 05 do curso de Engenheiro de Software da Escola DNC. Ele consiste em um sistema de gerenciamento de livros, com um backend em Node.js e Express, e um frontend desenvolvido em React com Vite.

## Visão Geral do Projeto

O sistema permite o cadastro, listagem, edição e exclusão de livros. O backend gerencia a persistência dos dados utilizando SQLite, enquanto o frontend oferece uma interface intuitiva para interagir com a aplicação.

## Tecnologias Utilizadas

### Backend
*   **Node.js**: Ambiente de execução JavaScript.
*   **Express**: Framework web para Node.js.
*   **Knex.js**: Construtor de queries SQL para Node.js.
*   **SQLite3**: Banco de dados leve e embarcado.
*   **Joi**: Validação de esquemas de dados.
*   **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

### Frontend
*   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite**: Ferramenta de build rápida para projetos web.
*   **Axios**: Cliente HTTP baseado em Promises para o navegador e Node.js.
*   **React Router DOM**: Roteamento declarativo para React.
*   **Sass**: Pré-processador CSS.
*   **React Toastify**: Biblioteca para notificações toast.

## Configuração do Ambiente de Desenvolvimento

Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 14 ou superior) instalado em sua máquina.

### Configuração do Backend

1.  **Instale as Dependências**:
    Navegue até a raiz do projeto no terminal e execute o comando para instalar todas as dependências do backend e frontend:
    ```bash
    npm install
    ```

2.  **Inicialize o Banco de Dados SQLite**:
    O projeto utiliza SQLite como banco de dados. Para criar o arquivo do banco de dados e a tabela `livros`, execute o seguinte comando:
    ```bash
    npm run db:init
    ```
    Este comando criará o arquivo `database.sqlite` dentro de `src/server/db/` e a tabela `livros`.

3.  **Inicie o Servidor de Backend**:
    Após a instalação das dependências e a inicialização do banco de dados, inicie o servidor backend com:
    ```bash
    npm start
    ```
    O backend estará em execução em `http://localhost:3001`.

### Configuração do Frontend

1.  **Inicie o Servidor de Frontend**:
    Em um novo terminal (ou na mesma janela, após iniciar o backend), execute o comando para iniciar o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```
    O servidor de desenvolvimento do frontend estará disponível em `http://localhost:5173` (ou outra porta disponível, caso a 5173 esteja em uso).

## Testes

Para executar os testes automatizados do projeto, utilize o seguinte comando:

```bash
npm test