const ObjectId = require('mongodb').ObjectID;

const Database = require('../utils/connection');

module.exports = async (request, response, next) => {
  // haga aqui lo que tenga que hacer
  console.log('pasando por mi midleware')

  try {
    const db = await Database.Instance()
    const dish = await db.collection('dishes').findOne({
      '_id': new ObjectId(request.params.id)
    })
    
    if (dish) {
      next();
    } else {
      response.status(204).send('No content')
    }

  } catch (error) {
    response.status(500).send(error.toString())

  }
}