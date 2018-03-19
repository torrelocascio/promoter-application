const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

        text: { 
            type: String 
        },
        owner: { 
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

    },
    {
        timestamps: true
    });

const Comment =mongoose.model('Comment', CommentSchema);

module.exports = Comment;
