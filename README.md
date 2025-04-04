# CSI606-2024-02 - Trabalho Final - Resultados

## Discente: Laura Soares

### Resumo
Este projeto consiste no desenvolvimento de um sistema para adoção de animais, permitindo que usuários visualizem uma lista de animais disponíveis e realizem pedidos de adoção. O sistema conta com um painel administrativo onde os responsáveis podem gerenciar os cadastros de animais e acompanhar as solicitações de adoção. A aplicação foi desenvolvida utilizando React para o frontend e Node.js com Express para o backend, utilizando um banco de dados MySQL para armazenamento das informações.

### 1. Funcionalidades implementadas

- Listagem de animais disponíveis.
- Exibição de detalhes de cada animal.
- Formulário para solicitação de adoção.
- Controle de solicitações de adoção.

### 2. Funcionalidades previstas e não implementadas

- Funcionalidade de busca e filtragem avançada de animais.
- Funcionalidade de acompanhamento das adoções.

A não implementação dessas funcionalidades se deu devido a limitações de tempo e complexidade adicional que exigiria ajustes na arquitetura do sistema.

### 3. Outras funcionalidades implementadas

- Proteção de rotas administrativas utilizando contexto de autenticação.

### 4. Principais desafios e dificuldades

- Configuração da comunicação entre frontend e backend devido a problemas com CORS.

- Implementação da autenticação e proteção de rotas administrativas.

Esses desafios foram superados através de pesquisa, testes e ajustes na configuração do backend e frontend.

### 5. Instruções para instalação e execução

Clonar o repositório:

git clone <https://github.com/lauracsres/ViraLar>

- Configurar o backend:

Acesse a pasta do backend.

Instale as dependências com npm install.

Configure o banco de dados MySQL.

Execute o servidor com node server.js.

- Configurar o frontend:

Acesse a pasta do frontend.

Instale as dependências com npm install.

Inicie o frontend com npm run dev.

### 6. Referências

Documentação oficial do React: https://react.dev/
Documentação oficial do Express.js: https://expressjs.com/
Documentação oficial do MySQL: https://dev.mysql.com/doc/
