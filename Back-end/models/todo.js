let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let todoSchema = new Schema(
{
    act : {type:String , required : true}
}) 

let Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;