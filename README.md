# 🏛️ Portal de Eventos Culturais - Desafio Técnico

Este projeto é uma solução para o desafio técnico de Front-end (Analista de Sistemas Júnior). Trata-se de uma aplicação **Next.js 15** para listar, visualizar e cadastrar eventos culturais, simulando um ambiente real de consumo de API.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com foco em modernidade, performance e acessibilidade:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estática e segurança)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [shadcn/ui](https://ui.shadcn.com/) (Acessibilidade e consistência visual)
- **Formulários:** React Hook Form + [Zod](https://zod.dev/) (Validação de esquemas)
- **Estado Global:** React Context API (Simulação de Auth/SSO)
- **Ícones:** Lucide React

## ✨ Funcionalidades

1.  **Listagem de Eventos:** Exibição em grid com Server Side Rendering (SSR) para performance.
2.  **Busca e Filtro:** Sistema de busca via URL Search Params (compartilhável e performático).
3.  **Detalhes do Evento:** Roteamento dinâmico (`/eventos/[id]`).
4.  **Cadastro (CRUD):** Formulário com validação robusta e feedback visual.
5.  **API Mock (Persistência):**
    - Foi criada uma API local (`/api/events`) usando Route Handlers do Next.js.
    - **Diferencial:** Os dados são persistidos em um arquivo local (`db.json`), permitindo que os dados salvos permaneçam mesmo após reiniciar o servidor.
6.  **Simulação de Login (SSO):**
    - Fluxo de login simulado com Context API.
    - Validação de credenciais na tela de login (`/login`).
    - Proteção visual de rotas e header adaptativo.

## 🛠️ Como Rodar o Projeto

Pré-requisitos: Node.js instalado (v18+ recomendado).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/marcos-lima-dev/portal-de-eventos.git](https://github.com/marcos-lima-dev/portal-de-eventos.git)
    cd portal-de-eventos
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse:** Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📂 Estrutura de Pastas

O projeto segue a arquitetura do **App Router**:

- `src/app`: Rotas e páginas da aplicação.
    - `api/events`: Mock da API REST e lógica de persistência JSON.
    - `eventos/[id]`: Página de detalhes dinâmica.
    - `novo`: Página de cadastro (Client Component).
    - `login`: Tela de autenticação.
- `src/components`: Componentes reutilizáveis (UI Kit e específicos).
- `src/providers`: Contextos globais (AuthContext).
- `src/types`: Definições de tipos TypeScript (Domain Driven).
- `structure.sql`: Arquivo de referência SQL (conforme solicitado no desafio).

## 📝 Decisões Técnicas

- **Next.js 15 & Server Components:** A listagem e os detalhes são renderizados no servidor para melhor SEO e performance inicial. Apenas os formulários e busca usam `use client`.
- **Persistência em Arquivo:** Para cumprir o requisito de "Mock da API" sem depender de serviços externos e manter os dados entre recargas, implementei um micro-sistema de leitura/escrita em arquivo JSON via Node.js (`fs`).

---
Desenvolvido por Marcos Lima