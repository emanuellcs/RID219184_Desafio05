# Sistema de Gerenciamento de Biblioteca

Este projeto é uma aplicação web completa (full-stack) para gerenciar uma coleção de livros. Ele foi construído com uma arquitetura moderna, que separa o frontend (interface do usuário) do backend (lógica do servidor).

*   **Frontend:** React (usando Vite para otimização)
*   **Backend:** Node.js (usando o framework Express)
*   **Banco de Dados:** SQLite

### Por que SQLite?

Para este projeto, a escolha do SQLite como banco de dados foi intencional, visando a simplicidade e a facilidade de uso, especialmente por ser uma aplicação de escopo local.

## Estrutura do Projeto

O repositório está organizado em dois diretórios principais, cada um funcionando como um projeto independente:

*   `frontend/`: Contém a aplicação cliente desenvolvida em React, responsável por toda a interface visual e interação com o usuário.
*   `backend/`: Contém o servidor em Node.js/Express, que gerencia as regras de negócio, a comunicação com o banco de dados e fornece a API para o frontend.

Cada diretório possui seu próprio arquivo `package.json` e suas próprias dependências.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

*   [Node.js](https://nodejs.org/) (versão 18 ou superior é recomendada)
*   [npm](https://www.npmjs.com/) (que já vem instalado com o Node.js) ou um gerenciador de pacotes compatível (como Yarn ou pnpm).

## Configuração e Instalação

Siga os passos abaixo para configurar e executar a aplicação completa (backend e frontend).

### 1. Configuração do Backend (Servidor)

O backend é responsável por fornecer os dados e a lógica da aplicação.

```bash
# 1. Entre no diretório do backend
cd backend

# 2. Instale as dependências necessárias
npm install

# 3. Execute as "migrations" do banco de dados
# Este comando criará o arquivo do banco de dados e a tabela 'livros'.
npm run migrate

# 4. Inicie o servidor
# O servidor estará disponível em http://localhost:3001
npm start
```

### 2. Configuração do Frontend (Cliente)

O frontend é a interface com a qual o usuário irá interagir.

```bash
# 1. Em um novo terminal, entre no diretório do frontend
cd frontend

# 2. Instale as dependências necessárias
npm install

# 3. Inicie o servidor de desenvolvimento
# A aplicação estará disponível no seu navegador em http://localhost:5173
npm run dev
```

## Scripts Disponíveis

Aqui estão os comandos úteis que você pode executar em cada diretório.

### Backend (`backend/`)

*   `npm start`: Inicia o servidor em modo de produção.
*   `npm run dev`: Inicia o servidor em modo de desenvolvimento com `nodemon`, que reinicia o servidor automaticamente sempre que um arquivo é alterado.
*   `npm test`: Executa os testes automatizados do backend com Jest.
*   `npm run migrate`: Aplica as atualizações na estrutura do banco de dados.

### Frontend (`frontend/`)

*   `npm run dev`: Inicia o servidor de desenvolvimento do Vite, com recarregamento rápido para uma experiência de desenvolvimento ágil.
*   `npm run build`: Gera a versão final e otimizada da aplicação para ser implantada em um servidor de produção.
*   `npm run preview`: Permite visualizar a versão de produção localmente antes de publicá-la.