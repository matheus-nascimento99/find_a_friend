# Api Find a Friend
Api para sistema de adoção de pets com Node JS com TypeScript usando Clean Code, arquitetura SOLID, testes unitários e testes E2E.

## Instalação de dependências

```bash
  npm install
```
## Instalação Docker

 - [Docker install](https://docs.docker.com/engine/install/)

## Criar container

```bash
  docker compose up -d
```
## Rodar aplicação

```bash
  npm run start:dev
```

## Rodar testes unitários

```bash
  npm run test
```

## Rodar testes E2E

```bash
  npm run test:e2e
```

## Requisitos funcionais

[x] Deve ser possível cadastrar um pet
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[x] Deve ser possível filtrar pets por suas características
[x] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível realizar login como uma ORG

## Requisitos não funcionais

[x] Para listar os pets, obrigatoriamente precisamos informar a cidade
[x] Uma ORG precisa ter um endereço e um número de WhatsApp
[x] Um pet deve estar ligado a uma ORG
[x] Todos os filtros, além da cidade, são opcionais
[x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

