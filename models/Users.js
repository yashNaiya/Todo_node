const mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const user = new mongoose.Schema({
    userId:{
        type:ObjectId,
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    number: {
        type: String
    },
    list:[
        {
            type: mongoose.Schema.Types.Mixed,
        }
    ]
})

const Users = mongoose.model("Users", user);

module.exports = Users;