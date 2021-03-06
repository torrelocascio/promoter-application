const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserEventSchema = new Schema({
        name: { 
            type: String, 
            required: true 
        },

        image: { 
            type: String,
            default: String
        },
        description: {
            type:String
        },
        owner: { 
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        timestamps: { 
          required:false,
          type: Date

        },   
        datesRequested:{
            type:[String]
        },
        dateGoing:{
            type:Date
        },
        promoterEventsInvited:[],
        promoterEventsInvitedName:[],
        promoterEventsConfirmed:{
            type: [],
            // ref: 'Event'
        },
        promoterEventsConfirmedName:{
            type: [],
            // ref: 'Event'
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: "Comment"
        }


});

const UserEvent =mongoose.model('UserEvent', UserEventSchema);

module.exports = UserEvent;
