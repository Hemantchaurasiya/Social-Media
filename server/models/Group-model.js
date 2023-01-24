const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    ownerId:{type:String,required:true},

    name:{type:String,required:true,min:3,max:30},

    desc:{type:String,max:500},
    
    photo:{type:String,default:""},

    members:{type:Array,default:[]},
    
    likes:{type:Array,default:[]},

},{timestamps:true});

module.exports = mongoose.model("Group",GroupSchema);