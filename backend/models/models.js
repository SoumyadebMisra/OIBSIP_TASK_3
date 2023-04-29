const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Task name is required'
    },
    description :{
        type: String
    },
    status:{
        type: String,
        enum: ['PENDING','COMPLETED'],
        default: 'PENDING'
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required'
    },
    hash:{
        type: String,
        trim : true,
        required : 'Password is required'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    tasks: [taskSchema]
})


const User = mongoose.model('user',userSchema)
const Task = mongoose.model('task',taskSchema)

module.exports = {User,Task}