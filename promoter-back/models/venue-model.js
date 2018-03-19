const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
        name: { 
            type: String, 
            required: true 
        },
        description: {
            type: String,
        },

        profileImage: { 
            type: String 
        },

        owner: { 
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        } ,
        address: {
          street: String,
          city: String,
          state: String,
          zip: Number
          
        }

  })

const Venue =mongoose.model('Venue', VenueSchema);

module.exports = Venue;
