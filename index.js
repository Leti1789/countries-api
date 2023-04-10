//? Aqui se levanta un servidor y se pone a escuchar en un puerto

const server = require('./src/app');
const { database } = require('./src/db.js')
const { countriesApi } = require("./src/controllers/countryControllers");
const {Country} = require("./src/db")

const PORT = 3001 || 3030;

//?Carga los paises en la base de datos al levantar la apliacacion
//?Esta funcion utiliza la funcion que trae info desde la api. Primero verifica que la tabla(modelo) Country tenga informacion. Si esta vacia llama a la funcion anterior, para que traiga la info, la guarda en una variable y luego con el metodo bulkCreate inserta la info en la tabla y finalmente con findAll la trae. En cambio si la tabla esta llena trae la info con findAll.
const createInfoToDB = async () => {
  if (!(await Country.count())) {
    const allCountries = await countriesApi();
    await Country.bulkCreate(allCountries);
    return await Country.findAll();
  } else return await Country.findAll();
}

createInfoToDB();



server.listen(PORT, async () => {
  await database
    .sync()
    .then(() => console.log("server listening on port", PORT))
    .catch((err) => console.error(err.message));
  
});
