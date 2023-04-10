const { Activity, Country } = require('../db')

//* Crear actividad
const createActivity = async (name, difficulty, duration, season, countries) => {

  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  let associatedCountry = await Country.findAll({
    where: { name: countries }
  });

  newActivity.addCountry(associatedCountry);
  return newActivity;
}


//? Traer todas las actividades
const getActivities = async () => {
  let activities = [];
  const allActivities = await Activity.findAll({
    order: [["id", "ASC"]], // ordena la consulta por el id de forma ascendente
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  allActivities.forEach((activity) => {
    activities.push(activity);
  });
  return activities;
};

//*Delete activity

const deleteActivity = async (id) => {
  const activityToDelete = await Activity.findByPk(id);
  if (!activityToDelete) {
    throw new Error("No se encontró ninguna actividad con el ID dado");
  }
  await activityToDelete.destroy();
  return activityToDelete;
};

//? Modificar actividad
const modifyActivity = async (id,name,difficulty,duration,season, countries) => {
  const activityToModify = await Activity.findByPk(id);
  if (activityToModify) {
    activityToModify.name = name;
    activityToModify.difficulty = difficulty;
    activityToModify.duration = duration;
    activityToModify.season = season;

    // Obtener los objetos de modelo de país correspondientes a los nombres de los países proporcionados
    const associatedCountries = await Country.findAll({
      where: { name: countries },
    });

    // Asociar los países con la actividad
    await activityToModify.setCountries(associatedCountries); //setCountries, se utiliza para establecer los paises asociados a la actividad, este metodo elimina cualquier asociacion previa y crea nuevas asociaciones, con los paises proporcionados por body

    await activityToModify.save();
  }
  return activityToModify;
};



module.exports = {
  createActivity,
  getActivities,
  deleteActivity,
  modifyActivity,
};