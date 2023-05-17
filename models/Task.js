const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({  // Define the task schema
    name: {  // The name of the task is a required string with a maximum length of 20 characters
        type: String, 
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    }, 
    completed: {  // The completed field is a boolean that defaults to false
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Task', TaskSchema)