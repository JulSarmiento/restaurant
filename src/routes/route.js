const { request } = require('express');
/*
 * Se creó un router y lo importamos mediante el metodo .Router() de la libreria Express. 
 */
const router = require('express').Router();
const ObjectId = require('mongodb').ObjectID;

//importamos la base de datos.
const Database = require('../utils/connection');
const dishesValidator = require('../midlewares/dishes-validator');


// Esta ruta muestra todos los platos almacenados
router.get('/dishes', async (request, response) => {
	try {
			const db = await Database.Instance()
			const dishes = await db.collection('dishes').find().toArray()
			response.json(dishes)

	} catch (error) {
			response.status(500).send(error.toString())
	}
})

// Esta ruta muestra el plato especificado segun su id
router.get('/dishes/:id', [dishesValidator], async (request, response) => {
  try {
		const db = await Database.Instance()
		const dish = await db.collection('dishes').findOne({
			'_id': new ObjectId(request.params.id)
		})
		
		if (dish) {
			response.json(dish)
		} else {
			response.status(204).send('No content')
		}

	} catch (error) {
		response.status(500).send(error.toString())
	}
})

//Esta ruta añade un plato nuevo
router.post('/dishes', async (request, response) => {
    try {
			const db = await Database.Instance()
			const dish = await db.collection('dishes').insertOne(request.body)
			response.status(201).json(dish)

    } catch (error) {
      response.status(500).send(error.toString())
    }
})

// Esta ruta elimina un plato seleccionado mediante su ID.
router.delete('/dishes/:id', [dishesValidator], async (request, response) => {
	try {
		const db = await Database.Instance()
		const dish = await db.collection('dishes').findOneAndDelete({
			'_id': new ObjectId(request.params.id)
		})
		
		if (dish) {
			response.status(200).send()
		} else {
			response.status(400).send()
		}

	} catch (error) {
		response.status(500).send(error.toString())
	}
})

// Esta ruta permite actualizar la informacion del plato seleccionado mediante su ID.
router.patch('/dishes/:id', [dishesValidator], async (request, response) => {
	try {
		const db = await Database.Instance()
		const filter = { '_id': new ObjectId(request.params.id)}
		const dish = await db.collection('dishes').findOneAndUpdate( 
			filter, 
			{'$set': request.body} , 
			{returnNewDocument: true}
		)

		if (dish) {
			response.json(dish.value)
		} else {
			response.status(400).send()
		}

	} catch (error) {
		response.status(500).send(error.toString())
	}
})


/*
* Aqui exportamos las rutas
 */
module.exports = router;


