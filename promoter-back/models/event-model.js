const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
        name: { 
            type: String, 
            // required: true 
        },
        description:{
            type: String
        },

        image: { 
            type: String 
        },
        owner: { 
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
         
    },
   
        place: {
            type: Schema.Types.ObjectId,  
            ref: 'Venue',
            required: false
        },
        userEventsInvited: [],

        userEventsInvitedName: [],
        // {
            // []
            // ref: 'UserEvent'
        // },
        userEventsConfirmed:{
           type: []
        },
        userEventsConfirmedName:{
            type: []
         }
        
},
{
    timestamps: true
});

const Event =mongoose.model('Event', EventSchema);

module.exports = Event;
