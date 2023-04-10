const { Router } = require('express');
const {
  createActivity,
  getActivities,
  deleteActivity,
  modifyActivity,
} = require("../controllers/activityControllers");

const activityRouter = Router();

activityRouter.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    return res.json({
      msg: "the activity has been successfully created!",
      createdActivity: newActivity,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

activityRouter.get("/", async (req, res) => {
  try {
    let activities = await getActivities();
    return res.json(activities);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

activityRouter.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteActivity(id);
    return res.json(deleted);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

activityRouter.put("/", async (req, res) => {
  const { id, name, difficulty, duration, season, countries } = req.body;

  try {
    const updatedUser = await modifyActivity(
      id,
      name,
      difficulty,
      duration,
      season, 
      countries
    );
    return res.json({
      msg: "The activity was successfully modified!",
      createdActivity: updatedUser,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});



module.exports = activityRouter;