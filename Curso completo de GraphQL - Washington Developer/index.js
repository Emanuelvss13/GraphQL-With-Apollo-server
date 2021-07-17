const {ApolloServer, gql} = require('apollo-server')

const usuarios = [
    {
        id: 1,
        nome: "Emanuel",
        idade: 19,
        salario: 1500,
        ativo: true
    },
    {
        id: 2,
        nome: "Ana",
        idade: 17,
        salario: 500,
        ativo: true
    },
    {
        id: 3,
        nome: "Maria",
        idade: 32,
        salario: 5500,
        ativo: true
    },
]

const produtos = [
    {
        id: 1,
        nome: "Notebook",
        valor: 3500
    },
    {
        id: 2,
        nome: "Celular",
        valor: 2000
    },
    {
        id: 3,
        nome: "M711",
        valor: 150
    },
]

const typeDefs = gql`
    type Produtos{
        id: ID!
        nome: String!
        valor: Int!
    }

    type Usuarios{
        id: ID!
        nome: String!
        idade: Int!
        salario: Int!
        ativo: Boolean!
    }

    type Query{
        usuarios: [Usuarios]!
        usuario(id: Int, nome: String): Usuarios

        produtos: [Produtos]!
        produto(id: Int, nome: String): Produtos
    }
`

const resolvers = {
    Query: {
        usuarios: () => usuarios,
        usuario: (_, { id, nome }) => {
            if(id) return usuarios.find(usuario => usuario.id === id)

            return usuarios.find(usuario => usuario.nome === nome)
        },

        produtos: () => produtos,
        produto: (_, {id, nome}) => {
            if(id) return produtos.find(produto => produto.id === id)

            return produtos.find(produto => produto.nome.toLowerCase() === nome.toLowerCase())
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => console.log(`${url}`))