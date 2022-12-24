const express = require("express");
const router = express.Router();
const controller=require("../controller/register")

router.get("/", (req, res) => {
    res.send({
        message: "inside register page"
    })
})

router.get('/getRegister',controller.getregisters );
router.post("/saveRegister",controller.saveRegister)


module.exports = router;
