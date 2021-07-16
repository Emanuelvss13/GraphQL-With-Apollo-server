import { ApolloServer } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions'
import mongoose from 'mongoose'

function startServer({typeDefs, resolvers}){
    mongoose.connect('mongodb+srv://emanuel:desconhecido94@cluster0.b0aoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('mongoose connected...'))

    const pubsub = new PubSub()
    const serve = new ApolloServer({typeDefs, resolvers, context: {pubsub}})

    serve.listen().then(({url}) => console.log(`server start at ${url}`))
}

export default startServer