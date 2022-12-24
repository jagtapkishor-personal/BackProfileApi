require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const project = require("./routes/project");
const register = require("./routes/register");
const company = require("./routes/company");
const app = express();
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
    ],
    AllowCredentials: [
        true
    ]
};
app.use(cors(corsOpts));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use("/project", project);
app.use("/register", register);
app.use("/company", company);
// Database Connnection 
mongoose.connect(process.env.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('db connection failed...', err);
    }
    else {
        console.log('db connection success...');
    }
});

app.get("/", (req, res) => {
    res.send({
        message: "App working fine"
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})