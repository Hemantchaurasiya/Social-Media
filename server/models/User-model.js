const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{ type:String,required:true,unique:true,min:3,max:20,trim:true},

        firstname:{ type:String,default:"",min:3,max:20,trim:true},

        lastname:{ type:String,default:"",min:3,max:20,trim:true},

        email:{ type:String,required:true,unique:true,trim:true},

        password:{type:String,required:true,min:6,max:20,trim:true},

        profilePicture:{type:String,default:""},

        coverPicture:{type:String,default:""},
        
        followers:{type:Array,default:[]},
        
        followings:{type:Array,default:[]},

        mobile:{type:String,max:12,min:10,default:"",trim:true},

        gender:{type:String,default:"",max:15},

        religion:{type:String,max:20,default:"",trim:true},

        otherName:{type:String,max:50,default:"",trim:true},

        dob:{type:Date},

        languages:{type:String,max:50,default:"",trim:true},

        hobbies:{type:String,max:100,default:"",trim:true},

        desc:{type:String,max:250,default:"",trim:true},

        city:{type:String,max:50,default:"",trim:true},

        from:{type:String,max:50,default:"",trim:true},

        state:{type:String,max:50,default:"",trim:true},
        
        country:{type:String,max:50,default:"",trim:true},

        liveIn:{type:String,max:50,default:"",trim:true},

        workAt:{type:String,max:50,default:"",trim:true},

        school:{type:String,max:50,default:"",trim:true},

        reletionship:{type:String,default:"",max:20},
        
        isVerified:{ type:Boolean,default:false},
        
        isAdmin:{ type:Boolean,default:false},

    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);