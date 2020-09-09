const MongoClient = require('mongodb')

class Database {
  static async Instance() {
    if (!Database.db) {

      console.log('Connecting to database 1 time only')

      const connection = await MongoClient.connect('mongodb://localhost:27017/dishes', {
        useUnifiedTopology: true
      })

      Database.db = connection.db('dishes')
    }

    return Database.db
  }
}

module.exports = Database;

