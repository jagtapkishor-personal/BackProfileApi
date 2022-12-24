const regModel = require("../Model/register");

exports.getregisters = async (req, res) => {
    const data = await regModel.find();
    if (data.length > 0) {
        res.send({
            msg: "all user data",
            response: 200,
            result: data,
            success: true
        });
    } else {
        res.send({
            msg: "No Data Found",
            response: 404

        });
    }
};

exports.saveRegister = async (req, res) => {
    const chkdataexit = await regModel.findOne({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
    if (chkdataexit) {
        if (chkdataexit.email == req.body.email && chkdataexit.mobile == req.body.mobile) {
            res.send({
                msg: "Mobile number and Email already exists"
            })
        } else
            if (chkdataexit.mobile === req.body.mobile) {
                res.send({
                    msg: "mobile number already exits"
                });
            }


            else
                if (chkdataexit.email === req.body.email) {
                    res.send({
                        msg: "email id already exits"
                    });
                }
    }
    else {
        // save db 
        const data = new regModel(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobile: req.body.mobile,
                city: req.body.city,
                address: req.body.address,
                userType: req.body.userType

            }
        );
        data.save((err, result) => {
            if (err) {
            }
            else {
                res.send({
                    msg: 'employee data created',
                    data: result
                });
            }
        });
    }
};