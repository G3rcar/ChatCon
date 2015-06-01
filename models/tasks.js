/**
 * Created by gerardo on 28/05/15.
 * Task Model
 */

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var taskSchema = new Schema({
    idTask: ObjectId,
    date: {type: Date, default: Date.now},
    title: String,
    content: String
});

module.exports = mongoose.model('Task', taskSchema);
