const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    teamSize: {
        type: Number,
        required: true
    },
    dateStart: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Projects', ProjectSchema);