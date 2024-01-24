# FIAP TECH CHALLENGE

## Primeiros Passos

Estas instruções irão ajudá-lo a obter uma cópia do projeto em sua máquina local para fins de desenvolvimento e testes.

### Pré-requisitos

O que você precisa instalar na sua máquina local.

- Node.js (v20.3)
- Docker

### Instalação

Como configurar o ambiente de desenvolvimento.

```bash
# Clone o repositório
git clone https://github.com/souzantero/fiap-tech-challenge.git

# Acesse o diretório
cd fiap-tech-challenge/

# Instale as dependências
npm install
```

## Iniciando o servidor

Como iniciar o servidor em modo de desenvolvimento.

Crie um arquivo `.env` na raiz do diretório e cole o seguinte conteúdo.

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fiap_tech_challenge_db
```

Execute o serviço Docker Compose para iniciar o PostgreSQL.

```bash
docker-compose up -d database
```

Crie o banco de dados.

```bash
npx prisma migrate dev
```

Inicie a aplicação.

```bash
npm run start:dev
```

Para iniciar em modo de produção.

```bash
npm run build
npm run start
```

Como iniciar o servidor com o Docker Compose

Execute o serviço Docker Compose para iniciar o servidor Node.js.

```bash
docker-compose up -d server
```

## Como executar o ecossistema utilizando o Kubernetes em um cluster local

### Preparação

Antes de prosseguir, certifique-se de estar na raiz do projeto.

### Iniciar o Banco de Dados

Para iniciar o banco de dados, execute os seguintes comandos:

```bash
kubectl apply -f ./kubernetes/database/config-map.yaml
kubectl apply -f ./kubernetes/database/secret.yaml
kubectl apply -f ./kubernetes/database/persistent-volume.yaml
kubectl apply -f ./kubernetes/database/pod.yaml
kubectl apply -f ./kubernetes/database/service.yaml
```

### Iniciar o Servidor

Agora, para iniciar o servidor, execute:

```bash
kubectl apply -f ./kubernetes/server/config-map.yaml
kubectl apply -f ./kubernetes/server/deployment.yaml
kubectl apply -f ./kubernetes/server/service-node-port.yaml
```

Este arquivo contém as instruções para configurar e executar o ecossistema utilizando o Kubernetes. Certifique-se de seguir todos os passos cuidadosamente.

## Open API

Para acessar o painel Open API e visualizar os endpoints disponíveis na API. 

`http://localhost:3000/api/docs`

## Construído com

- [Node.js](http://www.nodejs.org/) - A estrutura do servidor em tempo de execução.
- [TypeScript](https://www.typescriptlang.org/) - Usado para tipagem estática no JavaScript.
- [Express.js](https://expressjs.com/) - Estrutura de aplicativo da web Node.js.
- [Prisma](https://www.prisma.io/) - ORM Node.js e TypeScript.

## Autores

- **Felipe Antero** - _Trabalho inicial_ - [souzantero](https://github.com/souzantero)

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.
