const mongoose = require("mongoose");  

const EventSchema = new mongoose.Schema({
    eventDetails:{
        title:{
            type:String,
            required: true 
        },
        date:{
            type:Date,
            required:true
        },
        timing:{
            type:String,
            required:true
        },
        venue:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        poster:{
            type:String,
            required:true
        },
        fees: {
            type: Number,
            required: true,
            default: 0
        },
        completed: {
            type: Boolean,
            required:false,
            default: false,
        }
    },
    organizer:{
        society:{
            type:String,
            required:true
        },
        socialmedia: {
            type:String,
            required:true
        },
        website: {
            type:String,
            required:true
        }
    },
    management: {
        email:{
            type:String,
            required:true
        },
        contact:{
            type:Number,
            required:true
        }
    },
    uploadedBy: {
        email:{
            type: String,
            required:true,
        }
    }
},{ timestamps: true });

module.exports = mongoose.model('EventSchema', EventSchema);

