# Backend - MB Web Challenge

Este é o backend para o desafio MB Web. O objetivo deste backend é servir uma aplicação básica que renderiza um formulário de cadastro e recebe os dados submetidos pelo usuário.

## Estrutura do Projeto

```plaintext
backend/
├── node_modules/
├── src/
│ ├── index.js
│ └── routes/
│   └── registration.js
├── package.json
├── README.md
└── .gitignore
```
### Arquivos Principais

- `src/index.js`: Arquivo principal do servidor Node.js com Express.
- `src/routes/registration.js`: Definição das rotas de registro.

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior) de preferencia use  nvm, existe un archivo .nvmrc
- NPM (versão 6 ou superior)

### Instalação

- npm i
- npm run start

O servidor será iniciado na porta 3010 ou em outra porta especificada pela variável de ambiente PORT.

### Endpoints

[GET] /
Renders uma página HTML simples que irá falar API is live.

[GET] /registration
Renders uma página HTML simples que irá carregar os componentes do formulário no navegador.

[POST] /registration
Recebe os dados de cadastro submetidos pelo usuário em formato JSON e responde para o cliente com uma mensagem de sucesso. Simula o envio do formulário e o recebimento da resposta.

### Exemplo de Requisição [POST] /registration

{
  "email": "usuario@exemplo.com",
  "type": "PF",
  "name": "Nome do Usuário",
  "cpf": "000.000.000-00",
  "birthdate": "2000-01-01",
  "phone": "123456789",
  "companyName": "",
  "cnpj": "",
  "companyOpeningDate": "",
  "password": "senha123"
}

### Exemplo de Resposta [POST] /registration

{
  "message": "Registration successful"
}

###  Notas Adicionais

Este projeto não armazena dados em um banco de dados. Ele apenas simula o processo de registro.
A validação dos campos é básica e pode ser expandida conforme necessário.

### Autor

Andres MHG

### Licença

Este projeto está licenciado sob a licença ISC.
