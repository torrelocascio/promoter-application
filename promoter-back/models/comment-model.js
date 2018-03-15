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

const Venue =mongoose.model('Venue', VenueSchema);

module.exports = Venue;
