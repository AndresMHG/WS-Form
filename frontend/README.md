### Frontend Project

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