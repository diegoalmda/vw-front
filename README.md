# Projeto de Gerenciamento de Veículos

Este projeto é um frontend construído com Vite e React para gerenciar veículos e usuários. Ele se conecta a um backend desenvolvido em Node-RED.

A aplicação permite que usuários autenticados visualizem, criem, editem e excluam veículos, além de ter um painel de administração onde usuários **root** podem gerenciar outros usuários.

---

### Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- **Vite**: Ambiente de desenvolvimento e bundler para um build rápido e otimizado.
- **React com TypeScript**: Biblioteca para a construção da interface do usuário com tipagem estática.
- **CSS**: Estilização da aplicação.
- **React Hook Form & Zod**: Gerenciamento e validação de formulários de forma eficiente.
- **Zustand**: Criação de um store centralizado para o gerenciamento de estado global.
- **React Router DOM**: Gerenciamento de roteamento e navegação entre páginas.
- **JWT (JSON Web Token)**: Utilizado para a autenticação do usuário.
- **Axios**: Cliente HTTP para fazer requisições à API do backend.

---

### Como Rodar o Projeto

Para configurar e rodar a aplicação em seu ambiente local, siga os passos abaixo:

1.  **Instalar as dependências:**

    ```bash
    npm install
    ```

2.  **Configurar as variáveis de ambiente:**
    Copie o conteúdo do arquivo `.env.example` para um novo arquivo chamado `.env.local` na raiz do projeto.

3.  **Rodar a aplicação:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou em outra porta, caso a padrão esteja ocupada).

### Logar no sistema como administrador

`user: admin`
`senha: admin123`
