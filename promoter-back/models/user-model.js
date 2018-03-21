const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        username: { 
            type: String, 
            required: true 
        },
        encryptedPassword: {
            type: String,
            required: true
        },
        profileImage: {
            type: String
        },
        otherImages: {
           type:[String]
            },
        // address: {
        //         city: String,
        //         state: String,
        //         zip: Number
        //     },
        description: {
            type: String
        },

        gender: {
            type: String
        },

        followers:{
            type: Number
        },

        ispromoter: {
            type: String,
            default: 'false'
        },
        eventCreated:{
            type: []
        },

        // datesGoingOut:{
        //     Type:[Date]
        // },
        // datesRequested:{
        //     Type:[]
        // },
        venuesCreated:{
           type: [Schema.Types.ObjectId],
           ref: 'Venue'

        },
        myEventRequests: {
            type: [Schema.Types.ObjectId],
        
        ref: "user-event-model"
        },
        myEventsNowConfirmed:{
            type: [Schema.Types.ObjectId],
        
        ref: "user-event-model"

        },
        guestRequestsInvited:{
         type: [Schema.Types.ObjectId],
         ref:'user-event-model'  
        },
        guestRequestsConfirmed:{
            type: [Schema.Types.ObjectId],
            ref:'user-event-model'
        }

        


},
{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;