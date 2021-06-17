const mongoose=require('mongoose');
notesSchema = mongoose.Schema({ 
    title:String ,
     desc:String 
    , userID : {type : mongoose.Schema.Types.ObjectId , ref : 'user'} 
})
module.exports = mongoose.model('note', notesSchema);