# Welcome to the WS-form

## Overview
Este repositório contém um aplicativo web de registro de usuário com um frontend Vue.js e um backend Node.js.

## Project Structure
- `backend/`: Contém o código do servidor Node.js.
- `frontend/`: Contém o código de front-end Vue.js.

## Getting Started

### Backend
1. Navigate to the `backend` directory:
   ```sh
   cd backend

### Backend
2. Navigate to the `frontend` directory:
   ```sh
   cd frontend


##### BAKEND DOCUMENTATION

# Backend - MB Web Challenge

O objetivo deste backend é servir uma aplicação básica que renderiza um formulário de cadastro e recebe os dados submetidos pelo usuário.

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

##### FRONTEND DOCUMENTATION

# Frontend - MB Web Challenge

Este es el frontend de un sistema de registro de usuarios que utiliza Vue 3 con componentes escalables y estructurados. El proyecto sigue la metodología BEM para la nomenclatura de las clases CSS y está configurado con un servidor Express en el backend.

### Estructura del Proyecto

```plaintext
frontend
├── assets
│   ├── img
│   └── sass
│       ├── _reset.scss
│       └── index.scss
├── components
│   ├── WsHeader
│   │   ├── WsHeader.scss
│   │   └── WsHeader.vue
│   ├── WsInputBase
│   │   └── WsInputBase.vue
│   ├── WsLoading
│   │   ├── WsLoading.scss
│   │   └── WsLoading.vue
│   ├── WsNotification
│   │   ├── WsNotification.scss
│   │   └── WsNotification.vue
│   ├── WsStep
│   │   ├── WsStepBusiness
│   │   │   └── WsStepBusiness.vue
│   │   ├── WsStepIndividual
│   │   │   └── WsStepIndividual.vue
│   │   ├── WsStepPassword
│   │   │   └── WsStepPassword.vue
│   │   ├── WsStepReview
│   │   │   └── WsStepReview.vue
│   │   ├── WsStepWelcome
│   │   │   └── WsStepWelcome.vue
│   │   ├── WsStep.vue
│   └── WsTypeSelector
│       ├── WsTypeSelector.scss
│       └── WsTypeSelector.vue
├── composables
│   ├── useApi.js
│   └── useNotification.js
├── App.vue
├── main.js
└── README.md
```
### Instalação

- Clonar o repositório.
- nvm use v20.13.1
- Instalar as dependências com npm install.

### Uso

-npm run dev

### Notificações

Este projeto inclui um sistema de notificações que se mostra ao enviar o formulário de registro. As notificações podem ser de diferentes tipos: sucesso, erro, advertência e informação. O componente WsNotification gerencia essas notificações e assegura que elas sejam exibidas de maneira adequada na UI.

### Validações de Formulário

Os componentes de entrada de dados (WsInputBase.vue) estão projetados para lidar com validações em tempo real, mostrando erros de formato e requisitos faltantes. Isso garante que os usuários recebam feedback imediato sobre qualquer problema com os dados que foram inseridos.

### Estilos e Design

A aplicação segue a metodologia BEM para a nomenclatura das classes CSS, assegurando um código organizado e fácil de manter. Os arquivos SCSS estão estruturados para permitir a reutilização de estilos e a fácil personalização da UI.

### Componente WsStep

O componente `WsStep` é o núcleo do processo de registro em múltiplas etapas. Este componente permite que os usuários naveguem por diferentes etapas do formulário de registro, inserindo e validando dados em cada passo. A seguir, detalha-se sua estrutura e funcionamento:

# Estrutura e Funcionalidade

- **Componentes Importados**:
  - `WsWelcome`: Componente para a mensagem de boas-vindas e seleção do tipo de usuário (individual ou empresa).
  - `WsStepIndividual`: Componente para os dados pessoais de usuários individuais.
  - `WsStepBusiness`: Componente para os dados de empresas.
  - `WsStepPassword`: Componente para a configuração da senha.
  - `WsStepReview`: Componente para a revisão de todos os dados inseridos antes de enviar.

- **Composables**:
  - `useNotification`: Gerencia as notificações para indicar sucesso ou erro no envio de dados.
  - `useApi`: Gerencia as requisições API para interagir com o backend.

- **Estado do Formulário**:
  - O formulário é armazenado em um objeto `ref` chamado `form`, que contém todos os dados necessários para o registro, incluindo o tipo de usuário e os dados específicos de cada tipo.

- **Controle de Etapas**:
  - `steps`: Um array de componentes que representam cada etapa do registro.
  - `currentStep`: Um `ref` que indica a etapa atual.
  - `currentStepComponent`: Um `computed` que resolve o componente atual baseado em `currentStep`.

- **Navegação Entre Etapas**: I use props
  - `nextStep`: Avança para a próxima etapa.
  - `prevStep`: Retorna para a etapa anterior.

- **Atualização do Formulário**: I use emit, event
  - `updateForm`: Função que atualiza o estado do formulário com os novos dados inseridos pelo usuário.

- **Envio do Formulário**: I use provider, inject
  - `submitForm`: Função assíncrona que envia os dados do formulário para o backend utilizando `apiFetch`. Gerencia as notificações para indicar se o envio foi bem-sucedido ou se ocorreu um erro.


### Contribuição

Para contribuir com este projeto, por favor, siga os passos padrão de fork, clone, commit e pull request. Certifique-se de seguir as melhores práticas de codificação e manter a consistência com o estilo do código existente.

Este README.md fornece uma descrição geral do projeto, instruções de instalação, uso e contribuição, bem como informações sobre a estrutura do projeto e as principais características.

### Autor

Andres MHG

### Licença

Este projeto está licenciado sob a licença ISC.
