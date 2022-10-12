const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    mobile: {
        require: true,
        type: String
    },
    city: {
        require: true,
        type: String
    },
    address: {
        require: true,
        type: String
    },
    userType: {
        require: true,
        type: String
    },
});

module.exports = mongoose.model("register", regSchema)