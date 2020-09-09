const MongoClient = require('mongodb')

class Database {

  static async Instance() {
    if (!Database.db) {

      console.log('Connecting to database 1 time only')
      console.log(process.env.DB_CONNECTION_STRING)

      const connection = await MongoClient.connect(process.env.DB_CONNECTION_STRING, {
        useUnifiedTopology: true
      })

      Database.db = connection.db('dishes')
    }

    return Database.db
  }
}

module.exports = Database;

