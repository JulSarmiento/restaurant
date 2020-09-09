// exportamos el .env
require('dotenv').config();

// exportamos los cositos de siempre
const Express = require('express');
const app = new Express();

/*
 * Aqui iniciamos los middleware
 * Agregar un midleware que verifique el plato exista.
 * Agregar el midleware a las rutas de seleccion, actualizacion y borrado.
 * 
 */
app.use(Express.json());
app.use(Express.urlencoded());

/*
 * Aqui empezamos las rutas.
 */
app.use(require('./src/routes/route'));

/*
 * Aqui iniciamos el Listen para iniciar el servidor.
 */
app.listen(3000, () =>{
    console.log('El gatito nació.')
});