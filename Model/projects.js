const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    link: {
        required: false,
        type: String
    },
    image: {
        require: true,
        type: String
    }
});

module.exports = mongoose.model("project", projectSchema);