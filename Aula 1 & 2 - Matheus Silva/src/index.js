const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    type User{
        _id: ID!
        name: String!
        email: String!
        active: String!
    }

    type Post{
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query{
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation{
        createUser(name: String!, email: String!): User!
    }
`

const users = [
    {_id: String(Math.random()), name: 'Emanuel', email: 'emanuel@mail.com', active: true},
    {_id: String(Math.random()), name: 'João', email: 'joao@mail.com', active: true},
    {_id: String(Math.random()), name: 'Maria', email: 'maria@mail.com', active: false}
]

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        users: () => users,
        getUserByEmail: (_, {email}) => {
            return users.find( user => user.email === email)
        }
    },

    Mutation: {
        createUser: (_, {name, email}) => {
            const newUser ={
                _id: String(Math.random()),
                name,
                email,
                active: true
            }

            users.push(newUser)

            return newUser
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => console.log(`server at ${url}`))