const {ApolloServer, gql} = require('apollo-server')

const usuarios = [
    {
        id: 1,
        nome: "Emanuel",
        idade: 19,
        salario: 1500,
        ativo: true,
        perfil: 2
    },
    {
        id: 2,
        nome: "Ana",
        idade: 17,
        salario: 500,
        ativo: true,
        perfil: 2
    },
    {
        id: 3,
        nome: "Maria",
        idade: 32,
        salario: 5500,
        ativo: true,
        perfil: 1
    },
]

const perfis = [
    {
        id: 1,
        descricao: "Admin",
    },
    {
        id: 2,
        descricao: "Normal",
    },
]

const typeDefs = gql`

    type Perfis{
        id: ID!
        descricao: String!
    }

    type Usuarios{
        id: ID!
        nome: String!
        idade: Int!
        salario: Int!
        ativo: Boolean!
        perfil: Perfis!
    }

    type Query{
        usuarios: [Usuarios]!
        usuario(id: Int, nome: String): Usuarios
        perfis: [Perfis]!
    }
`

const resolvers = {
    Usuarios: {
        perfil: (usuario) => perfis.find(perfil => perfil.id === usuario.perfil)
    },


    Query: {
        usuarios: () => usuarios,
        usuario: (_, { id, nome }) => {
            if(id) return usuarios.find(usuario => usuario.id === id)

            return usuarios.find(usuario => usuario.nome === nome)
        },
        perfis: () => perfis
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => console.log(`${url}`))