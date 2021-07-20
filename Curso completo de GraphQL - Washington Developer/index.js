const {ApolloServer} = require('apollo-server')
const {typeDefs, resolvers} = require('./src/graphql')

const server = new ApolloServer({
    typeDefs, resolvers,
    formatError: (error) => {
        if(error.message.startsWith('Usuário existente:')){
            return new Error(error.message)
        }
    }
})

server.listen().then(({url}) => console.log(`${url}`))