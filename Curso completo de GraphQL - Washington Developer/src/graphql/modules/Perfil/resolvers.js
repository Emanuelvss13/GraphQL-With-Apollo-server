const db = require('../../../db')

module.exports = {
    Query: {
        perfis: () => db.perfis
    }
}