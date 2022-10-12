require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const regModel = require('./Model/register');
const app = express();
app.use(cors());
app.use(bodyparser.json());
// Database Connnection 

mongoose.connect(process.env.mongodburl, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('db connection failed...', err);
  }
  else {
    console.log('db connection success...');
  }
});


app.get('/getRegister', async (req, res) => {
  console.log('reg GEtdata');
  const data = await regModel.find();
  if (data.length > 0) {
      res.send({
          msg: "all user data",
          response: 200,
          result: data
      });
  } else {
      res.send({
          msg: "No Data Found",
          response: 404
      });
  }
});


app.post('/saveRegister', async (req, res) => {
  console.log(req.body, 'register postdata');
  const chkdataexit = await regModel.findOne({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
  console.log(chkdataexit);
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
              city:req.body.city,
              address:req.body.address,
              userType:req.body.userType
              
          }
      );
      data.save((err, result) => {
          if (err) {
              console.log('create db failed', err);
          }
          else {
              res.send({
                  msg: 'employee data created',
                  data: result
              });
          }
      });
  }
});

app.get("/",()=>
{
    console.log(`App Working Fine`);
})







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
})