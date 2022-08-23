const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
   
    name:
    {
       type: String,
       required: true
    },

    url:
    {
       type: String,
       required: true
    },
    
    caption:
    {
       type: String,
       required: true
    },

    


});
memeSchema.set('versionKey', false);



module.exports = mongoose.model('meme', memeSchema);