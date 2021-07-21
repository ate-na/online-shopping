const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    commentID:{
        type:String,
        required:true,
        unique:true   
    },
    text: {
        type: String,
        required: true,
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    replyOf: {
        type: Schema.Types.ObjectId,
        ref: 'comment',
    },
},{
    timestamps: true
});

const comment = mongoose.model('comment', comment);
module.exports = comment;