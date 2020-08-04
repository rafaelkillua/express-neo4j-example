## Introdução a Neo4j e Express - Exemplos de uso e *queries* básicas

Nesse repositório você encontrará alguns exemplos de queries na linguagem ***Cipher*** do **Neo4j** de um modo bem inicial e um exemplo básico de como conectar ao banco de dados Neo4j usando o driver padrão Javascript.

Caso queira mais informações, há uma **apresentação de slides** (link a definir) explicando um pouco da história dos *graph databases*, o que são **grafos**, seus casos de uso e exemplos da linguagem ***Cipher***.

### Quick start

- Clone o repositório.
- Instale o Neo4j ou crie o container Docker usando o comando a seguir, ou, caso use **Docker Compose**, [clique aqui](https://neo4j.com/developer/docker-run-neo4j/).

   `docker run --name testneo4j -p7474:7474 -p7687:7687 -d --env NEO4J_AUTH=neo4j/graph neo4j:latest`
- Crie um arquivo `.env` baseado no `.env.example`. Se tiver usado o código acima, a senha do banco será **graph**.
- Rode `yarn` ou `npm install`.
- Rode `yarn dev` ou `npm run dev` para rodar o app Express em modo de desenvolvimento.
- **OPCIONAL**: Baixe o *json* do **Insomnia** (link a definir) com algumas rotas para facilitar o desenvolvimento.

### Modelagem do projeto

Esse projeto consiste em 3 modelos (**Person**, **Expertise** e **Framework**) e 3 relacionamentos (**IS_TEAMMATE**, **HAS_EXPERTISE** e **REQUIRES_EXPERTISE**).

Todos os modelos tem a propriedade **name**. Os relacionamentos não têm propriedades.

As possibilidades são:
  - `(:Person)    -[:IS_TEAMMATE]->   (:Person)`
  - `(:Person)    -[:HAS_EXPERTISE]-> (:Expertise)`
  - `(:Framework) -[:REQUIRES_EXPERTISE]->      (:Expertise)`

Então, um exemplo de ligação entre **Person** e **Framework** seria:

  `(:Person) -[:HAS_EXPERTISE]-> (:Expertise) <-[:REQUIRES_EXPERTISE]- (:Framework)`

### Mais informações:
- [Neo4j](https://neo4j.com/)
- [Neo4j para desenvolvedores](https://neo4j.com/developer/)
- [Neo4j com Docker](https://neo4j.com/developer/docker-run-neo4j/)
- [Driver Javascript para Neo4j](https://github.com/neo4j/neo4j-javascript-driver)
- [Cursos online **grátis** oficial Neo4j (com certificado)](https://neo4j.com/graphacademy/online-training/)
- [Sandbox do SGBD online do Neo4j](https://neo4j.com/sandbox/)
