const proSchema = require("../Model/projects");


exports.getProject = async (req, res) => {
    const data = await proSchema.find();
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
}

exports.postProject = async (req, res) => {

    const data = new proSchema({
        name: req.body.name,
        desc: req.body.desc,
        link: req.body.link?req.body.link:'',
        image: req.file?.originalname,
        path: req.file?.path,
    });
    if (proSchema.length != Object.values(req.body).length) {
       res.send({
        message:"Send Required Fields"
       })
    }
    else {

        data.save((err, result) => {
            if (err) {
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
    }
}

exports.deleteProject = async (req, res) => {
    const checkValid = mongoose.isValidObjectId(req.params.id);
    if (checkValid) {
        const iddata = await proSchema.deleteOne({ _id: req.params.id });
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
}

exports.editProject = async (req, res) => {
    const checkid = mongoose.isValidObjectId(req.params.id);
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
}