module.exports = (app) => {
  const incident = require("../controllers/incidents.controller.js");

  const router = require("express").Router();

  // get all incidents
  router.get("/", incident.getIncidents);
  router.post("/upload", incident.uploadIncident);

  app.use("/api/incidents", router);
};
