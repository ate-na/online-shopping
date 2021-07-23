const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User'
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

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;