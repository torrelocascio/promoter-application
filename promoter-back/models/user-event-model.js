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
        owner: { 
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        timestamps: { 
          required:true,
          type: Date

        },   
        datesRequested:{
            type:[Date]
        },
        dateGoing:{
            type:Date
        },
        promoterEventsInvited:{
        type: [Schema.Types.ObjectId],
        ref:'Event'
        },
        promoterEventsConfirmed:{
            type: Schema.Types.ObjectId,
            ref:'Event'
            }

});

const UserEvent =mongoose.model('UserEvent', UserEventSchema);

module.exports = Event;
