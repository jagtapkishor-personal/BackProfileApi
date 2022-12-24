const comSchems = require("../Model/company")

exports.getCompany = async (req, res) => {
    const data = await comSchems.find();
    console.log(data);
    if (data.length > 0) {
        res.send({
            message: "get compny successfully",
            result: data,
            response: 200,
            success: true
        })
    }
    else {
        res.send({
            message: "no company found"
        })
    }
}

exports.postCompany = async (req, res) => {
    const data = new comSchems({
        Cname: req.body.name,
        Cdesc: req.body.desc,
        Clink: req.body.link,
    })
    console.log(data);
    data.save((err, result) => {
        if (err) {
            res.send({
                message: "error in save data",
            })
        }
        else {
            res.send({
                message: "data saved successfully",
                data: result,
                response: 200,
                success: true
            })
        }
    })
};

exports.deleteCompany = async (req, res) => {
    const checkValidId = await comSchems.find({ _id: req.params.id });
    if (checkValidId != []) {
        const iddata = await comSchems.deleteOne({ _id: req.params.id });
        if (iddata.deletedCount === 1) {
            res.send({
                message: "company removed",
                response: 200
            })
        } else {
            res.send({
                message: "Id not found"
            })
        }
    }
    else {
        res.send({
            message: "Invalid ID"
        })
    }

}

exports.editCompany =async (req, res) => {
    const validId = mongoose.isValidObjectId(req.params.id);
    if (validId) {
      const data = await comSchems.updateOne({ _id: req.params.id },
        {
          $set:
          {
            Cname: req.body.name,
            Cdesc: req.body.desc,
            Clink: req.body.link,
          }
        });
  
      if (data.modifiedCount == 1) {
        res.send({
          message: "company Updated",
          response: true,
        })
      }
      else {
        res.send({
          message: "data remain same"
        })
      }
    }
    else {
      res.send({
        message: "Invalid ID"
      })
    }
  }