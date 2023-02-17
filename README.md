# DOC-RFC da POC: https://loftbr.atlassian.net/wiki/spaces/APB/pages/3059843481/Testes+de+valida+o+de+contratos

## instalação do projeto

### 1 - clonar o repositório  
### 2 - docker-compose up
### 3 - npm install

## Para gerar um contrato de consumer  
### npm run test:consumer  
  
## Para publicar os contratos no pact-broker  
### npm run publish:broker  
  
## Para rodar um mock service(necessário para rodar os testes do provider) 
### npm run up:mock-service  
  
## Para rodar a validação do lado do provider  
### npm run test:provider-broker