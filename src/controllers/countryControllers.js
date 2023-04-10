const axios = require('axios');
const { Country, Activity } = require('../db');
const {Op} = require('sequelize')

let urlLink = "https://restcountries.com/v3/all";

//* Esta funcion trae la info de los paises de la api
const countriesApi = async () => {
  let { data } = await axios.get(urlLink);
  let countriesData = data.map(el => {
    return {
      id: el.cca3,
      name: el.name.common,
      nameSpanish: el.translations.spa.common
        ? el.translations.spa.common
        : el.name.common,
      image: el.flags[0],
      continent: el.continents[0],
      capital: el.capital ? el.capital[0] : "No se encontro capital",
      subregion: el.subregion ? el.subregion : "No se encontro subregion",
      area: el.area ? el.area : "No se encontro area",
      population: el.population
    };
  })
  return countriesData;
}


//* Funcion que obtiene todos los paises

const getCountries = async () => {
  
  const countries = await Country.findAll({
    include: {
      model: Activity,
      through: {
        attributes: [],
      },
    },
  });
  return countries;
};

//? Funcion que trae los detalles del pais por medio de un ID pasado por params
const getCountryDetail = async(idCountry) => {
  const country = await Country.findByPk(idCountry, {
    include: {
      model: Activity,
      through: {
        attributes:[]
      }
    },
  });
  if (!country) throw new Error("Pais no encontrado")
  else return country;
}


//!Funcion que trae los paises que coinciden con el name pasado por query
const findCountry = async (name) => {
  const country = await Country.findAll({
    include: {
      model: Activity,
      through: {
        attributes:[]
      },
    },
    where: {
      [Op.or]: {
        id: {
          [Op.iLike]: `%${name}%`,
        },
        name: {
          [Op.iLike]: `%${name}%`,
        },
        nameSpanish: {
          [Op.iLike]: `%${name}%`,
        },
      },
    },
  });
  if (country.length === 0) throw new Error("Pais no encontrado");
  else return country;

}





module.exports = { getCountries, getCountryDetail, countriesApi, findCountry};