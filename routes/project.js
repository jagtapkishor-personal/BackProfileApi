var express = require('express');
var router = express.Router();
const multer = require("multer")
const controller = require("../controller/project")
router.get("/", (req, res) => {
    res.send({
        message: "inside projects "
    })
})


var upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, callback) => {
            let type = req.params.type;
            let path = "./assets/projectImages"
            callback(null, path)
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname, file.fieldname)
        }
    })
});
router.get("/getProject", controller.getProject);

router.post("/postProject", upload.single("image"), controller.postProject);

router.delete("/deleteProject/:id",);

router.put("/editProject/:id",)


module.exports = router;
