const mongoose=require("mongoose");

const companyModel=new mongoose.Schema({
    Cname:{
        require:true,
        type:String
    },
    Cdesc:{
        require:true,
        type:String
    },
    Clink:{
        require:false,
        type:String
    }

});
module.exports=mongoose.model("company",companyModel)