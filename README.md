# RID219184_Desafio05
Desafio 05 do curso de Engenheiro de Software da Escola DNC

## Visão Geral do Projeto

Este projeto é um sistema de biblioteca online com um back-end em Node.js e Express e um front-end em React com Vite.

A implantação do front-end foi aprimorada.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js
- PostgreSQL

### Configuração do Backend

1.  **Instale as Dependências**: No terminal, na raiz do projeto, execute:
    ```bash
    npm install
    ```

2.  **Configure o PostgreSQL**:
    *   Certifique-se de que o PostgreSQL esteja instalado e em execução.
    *   Crie um novo banco de dados e um usuário para a aplicação.

3.  **Configure as Variáveis de Ambiente**:
    *   Crie um arquivo `.env` na raiz do projeto.
    *   Adicione os detalhes de conexão do seu banco de dados PostgreSQL ao arquivo `.env`:
        ```
        DB_USER=seu_usuario_db
        DB_HOST=localhost
        DB_DATABASE=seu_banco_de_dados
        DB_PASSWORD=sua_senha_db
        DB_PORT=5432
        ```

4.  **Inicialize o Banco de Dados**: Execute o seguinte comando para criar a tabela `livros`:
    ```bash
    npm run db:init
    ```

5.  **Inicie o Servidor de Backend**:
    ```bash
    npm start
    ```
    O backend estará em execução em `http://localhost:3001`.

### Configuração do Frontend

1.  **Inicie o Servidor de Frontend**: Em um novo terminal, execute:
    ```bash
    npm run dev
    ```
    O servidor de desenvolvimento do frontend estará disponível em `http://localhost:3001`.