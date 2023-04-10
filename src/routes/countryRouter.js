const { Router } = require("express");
const {getCountries, getCountryDetail, findCountry } = require('../controllers/countryControllers')

const countryRouter = Router();

//* Traer y persistir en DB los temperamentos

countryRouter.get('/', async (req, res) => {
  const { name } = req.query;
  let allCountries;
  try {
    if (name) {
      allCountries = await findCountry(name)
    } else {
      allCountries = await getCountries();
    }
    return res.json(allCountries)
  } catch (error) {
    return res.status(404).json({error: error.message})
 }
}) 

countryRouter.get('/:idCountry', async (req, res) => {
  const { idCountry } = req.params;
  try {
    const findCountry = await getCountryDetail(idCountry)
    return res.json(findCountry)
    
  } catch (error) {
    return res.status(404).json({error: error.message})
  }
})




module.exports = countryRouter;