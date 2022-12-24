var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const controller = require("../controller/company")
router.get('/', (req, res, next) => {
  res.send({
    message: "inside company"
  });
});

router.get("/getCompany", controller.getCompany);
router.post("/postCompany", controller.postCompany);
router.post("/deleteCompany/:id", controller.deleteCompany);
router.put("/editCompany/:id", controller.editCompany)

module.exports = router;
