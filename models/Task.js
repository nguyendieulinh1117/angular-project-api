const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    id_project: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    assignedTo: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Tasks', TaskSchema);