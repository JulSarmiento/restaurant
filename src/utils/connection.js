const MongoClient = require('mongodb')

class Database {

  static async Instance() {
    if (!Database.db) {

      const connection = await MongoClient.connect(process.env.DB_CONNECTION_STRING, {
        useUnifiedTopology: true
      })

      Database.db = connection.db('dishes')
    }

    return Database.db
  }
}

module.exports = Database;

