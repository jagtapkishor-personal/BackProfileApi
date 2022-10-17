const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    desc: {
        require: true,
        type: String
    },
    link: {
        require: false,
        type: String
    }
});

module.exports=mongoose.model("project",projectSchema);