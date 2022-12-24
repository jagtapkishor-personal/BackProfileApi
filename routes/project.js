var express = require('express');
var router = express.Router();
const proSchema = require("../Model/projects");
const mongoose = require("mongoose");
const controller = require("../controller/project")
router.get("/", (req, res) => {
    res.send({
        message: "inside projects "
    })
})

router.get("/getProject", controller.getProject);

router.post("/postProject", controller.postProject);

router.delete("/deleteProject/:id",);

router.put("/editProject/:id",)


module.exports = router;
