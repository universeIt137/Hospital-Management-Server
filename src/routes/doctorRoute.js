const express = require("express");
const { createDoctor, allDoctor, singleDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorController");


function doctorRoute(doctorCollection) {
    const router = express.Router();


    router.post("/doctor", (req, res) => createDoctor(req, res, doctorCollection));
    router.get("/doctor", (req, res) => allDoctor(req, res, doctorCollection));
    router.get("/doctor/:id", (req, res) => singleDoctor(req, res, doctorCollection));
    router.put("/doctor/:id", (req, res) => updateDoctor(req, res, doctorCollection));
    router.delete("/doctor/:id", (req, res) => deleteDoctor(req, res, doctorCollection));


    return router;
}

module.exports = doctorRoute;