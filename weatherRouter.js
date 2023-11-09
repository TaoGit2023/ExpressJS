const express = require("express");
const weatherRouter = express.Router();
let data = [
  {
    activity: ["morning jog", "breakfast", "work", "lunch", "gym"],
    weather: "sunny",
  },
  {
    activity: ["work", "coffee break", "meetings", "dinner", "movie"],
    weather: "cloudy",
  },
  {
    activity: ["weekend", "hiking", "picnic", "reading", "gardening"],
    weather: "rainy",
  },
];
//GET all
weatherRouter.get("/list", (req, res) => {
  res.send(data);
});

//GET an activity by query parameter ? activity=work
weatherRouter.get("/activities", (req, res) => {
  const activityToFind = req.query.activity;
  if (!activityToFind) {
    return res.status.apply(400).send("activity not exist");
  }
  const foundItems = data.filter((item) => {
    return item.activity.includes(activityToFind);
  });
  if (!foundItems.length) {
    return res.status(404).send("activity not found");
  }
  res.send(foundItems);
});
//POST add a new item
weatherRouter.post("/activities", (req, res) => {
  const { activity, weather } = req.body;
  if (!activity || !weather) {
    return res.status(400).send("Activity and weather are required");
  }
  const newActivity = { activity, weather };
  data.push(newActivity);
  res.status(201).send({ msg: "added data" });
});

//GET activities based on weather condition /:condition/cloudy
weatherRouter.get("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const itemsWithCondition = data.filter((item) => {
    return item.weather === weatherCondition;
  });
  res.status(200).send(itemsWithCondition);
});

//PUT update activities

weatherRouter.put("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const newActivities = req.body.activities;
  const foundIndex = data.findIndex((item) => {
    return item.weather === weatherCondition;
  });
  if (foundIndex === -1) {
    return res.status(404).send("weather condition not found");
  }
  data[foundIndex].activity = newActivities;
  res.send({
    msg: "activities updated",
    updatedWeather: data[foundIndex],
  });
});

//DELETE ITEMS  based on weather condition
weatherRouter.delete("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const findIndex = data.findIndex((item) => {
    return item.weather === weatherCondition;
  });
  if (findIndex === -1) {
    return res.status(404).send("Weather condition not found");
  }
  const deletedWeather = data.splice(findIndex,1);
  res.status(200).send({
    msg:"deleted",
    deletedItem: deletedWeather[0]
  })

});

module.exports = weatherRouter;
