var express = require('express');
var router = express.Router();
const proSchema = require("../Model/projects");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.send({
        message: "inside projects "
    })
})

router.get("/getProject", async (req, res) => {
    console.log("get Projects");
    const data = await proSchema.find();
    console.log(data);
    if (data.length > 0) {
        res.send({
            message: "get projects list",
            result: data,
            response: 200,
            success: true
        })
    }
    else {
        res.send({
            message: "Empty Data",
            response: 404
        })
    }
});

router.post("/postProject", async (req, res) => {
    console.log(req.body, "body request");

    const data = new proSchema({
        name: req.body.name,
        desc: req.body.desc,
        link: req.body.link,
    });

    data.save((err, result) => {
        if (err) {
            console.log("error while posting");
        }
        else {
            res.send({
                message: "Data saved",
                data: result,
                success: true,
                response: 200
            });
        }
    })
});

router.delete("/deleteProject/:id", async (req, res) => {
    const checkValid = mongoose.isValidObjectId(req.params.id);
    console.log(checkValid);
    if (checkValid) {
        const iddata = await proSchema.deleteOne({ _id: req.params.id });
        console.log(iddata);
        if (iddata.deletedCount === 1) {
            res.send({
                msg: "project removed",
                response: 200
            });
        }
        else {
            res.send({
                msg: "project not found",
                response: 404,
            });
        }
    }
    else {
        res.send({
            msg: "invalid id please enter valid id"
        });
    }
});

router.put("/editProject/:id", async (req, res) => {
    const checkid = mongoose.isValidObjectId(req.params.id);
    console.log(checkid);
    if (checkid) {
        const updatedata = await proSchema.updateOne({ _id: req.params.id },
            {
                $set:
                {
                    name: req.body.name,
                    desc: req.body.desc,
                    link: req.body.link,
                }
            });
        if (updatedata.modifiedCount == 1) {
            res.send({
                message: "project Updated",
                response: 200
            });
        }
        else {
            res.send({
                message: "updated but value remain same"
            });
        }
    }
    else {
        res.send({
            message: "invalid id"
        })
    }
})


module.exports = router;
