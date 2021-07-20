const db = require('../../../db')

function geraId(lista){
    let num = 0
    num = lista.length

    return ++num
}

module.exports = {
    Usuarios: {
        perfil: (usuario) => db.perfis.find(perfil => perfil.id === usuario.perfil)
    },
    
    Query: {
        usuarios: () => db.usuarios,
        usuario: (_, { id, nome }) => {
            if(id) return db.usuarios.find(usuario => usuario.id === id)

            return db.usuarios.find(usuario => usuario.nome === nome)
        },
    },
    Mutation: {
        criarUsuario: (_, {nome, email, telefone}) => {

            let usuarioExistente = db.usuarios.some(u => u.email === email)

            if(usuarioExistente){
                throw new Error(`Usuário existente: ${nome}`)
            }

            let user ={
                id: geraId(db.usuarios),
                nome,
                email,
                telefone,
                perfil: 1
            }

            db.usuarios.push(user)

            return user
        },
        atualizarUsuario: (_,{id, nome, email, telefone}) => {
            const usuario = db.usuarios.find(u => u.id === id)
            const indice = db.usuarios.findIndex(u => u.id === id)

            let novoUsuario = {
                ...usuario,
                nome,
                email,
                telefone
            }

            db.usuarios.splice(indice, 1, novoUsuario)

            return novoUsuario
        },
        deletarUsuario:(_, {id}) => {
            const usuarioEncontrado = db.usuarios.find(u => u.id === id)

            db.usuarios = db.usuarios.filter(u => u.id !== id)

            return !!usuarioEncontrado
        }
    }
}

console.log(geraId(db.usuarios))