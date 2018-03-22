const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const userEventRoutes = express.Router();



const User = require('../models/user-model');
const Event = require('../models/event-model');
const UserEvent = require('../models/user-event-model')
var bodyParser = require('body-parser');


// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});



// create new user event (1 Date) must edit now !!!!!!!!!!!!!!!
userEventRoutes.post('/api/new-user-events', myUploader.single('eventPic'), (req, res, next) => {
  if(!req.user){
      res.status(401).json({message: "Log in to create a Guest Event Request."});
      return;
  }
  if(req.user.isPromoter==="true"){
    res.status(401).json({message: "You Must Be A Guest to create a Guest Event Request"});
    return;}

  const newUserEvent = new UserEvent({
    name: req.body.userEventName,
    // owner: req.user._id,
    // description: req.body.description,
    // image: req.body.image,
    // datesRequested: req.body.date

  });
  if(req.file){
      newUserEvent.image = '/uploads' + req.file.filename;
  }

  newUserEvent.save((err) => {
      if(err){
          res.status(500).json({message: "Some weird error from DB."});
          return;
      }
      // validation errors
      if (err && newUserEvent.errors){
          res.status(400).json({
              brandError: newUserEvent.errors.brand,
          });
          return;
      }
      req.user.encryptedPassword = undefined;
      newUserEvent.user = req.user;

      res.status(200).json(newUserEvent);
  });
});

//list all user-events

userEventRoutes.get('/api/user-events', (req, res, next) => {
  console.log("hello1")
  if (!req.user) {
    res.status(401).json({ message: "Log in to see events." });
    return;
  }
  // console.log("User is: ", req.user)

  UserEvent.find({}, (err, allTheUserEvents) =>{

    if (err) {
      res.status(500).json({ message: "UserEvents find went bad." });
      return;
    }
    console.log("hello2")

    console.log("allTheUserEvents", allTheUserEvents)
    res.status(200).json(allTheUserEvents);
  })
    // retrieve all the info of the owners (needs "ref" in model)
    // don't retrieve "encryptedPassword" though
    // .populate('user', { encryptedPassword: 0 })
    // .exec((err, allTheUserEvents) => {
    //   if (err) {
    //     res.status(500).json({ message: "UserEvents find went bad." });
    //     return;
    //   }
    //   res.status(200).json(allTheUserEvents);
    // });
});

//list all user-events for one user


// list single user event
userEventRoutes.get("/api/user-events/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE event." });
    return;
  
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  

  UserEvent.findById(req.params.id, (err, theUserEvent) => {
    
    if(req.user.ispromoter === "false" &&theUserEvent.creator!==req.user._id){
      res.status(401).json({message: "You Must Be A Promoter or the Guest Event Creator to view the individual Event"});
      return;}
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Events find went bad." });
      return;
    }

    res.status(200).json(theUserEvent);
  });
});

//Accept Invitation Event!!!!!!!!!New Array Fields, edit what happens

// userEventRoutes.put('/api/user-events/:id/accept', (req, res, next) => {
//       if (!req.user) {
//               res.status(401).json({ message: "Log in to update the event." });
//               return;
//             }
//       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//           res.status(400).json({ message: "Specified id is not valid" });
//           return;
//       }
  
//     UserEvent.findById(req.params.id, (err,foundUserEvent)=>{
//       // console.log("Found user Event",foundUserEvent)
      
//     // console.log("foundUserEvent.owner.id", foundUserEvent.owner)
//     // console.log("promo true", req.user.ispromoter)
//     // console.log("user is", req.user._id)
//     //   if(foundUserEvent.owner === req.user._id){
//     //     res.status(401).json({message: "You Must be the invited Guest to accept the individual Event"});
//     //     return;}

//       // console.log("event id: ",req.params.id )
//       if(err){
//         console.log("err", err)
//         // res. json(err)
//         return
//       }

//       Event.findById(req.body.id, (err, event)=>{
//         if(err){
//           res.json(err)
//           return
//         }

//         // UserEvent.findById(req.params.id, (err,foundUserEvent)=>{
//           // console.log("Found Event",foundUserEvent)
//           // if(err){
//           //   res.json(err)
//           //   return
//           // }
//         foundUserEvent.promoterEventsInvited.remove(event.id);
//         event.userEventsInvited.remove(foundUserEvent._id);
//         foundUserEvent.promoterEventsConfirmed.push(event.id);
//         event.userEventsConfirmed.push(foundUserEvent._id);
//         console.log("heyyyy", event.userEventsConfirmed)

//         event.save(err=>{
//           if(err){
//             res.json(err)
//             return
//           }
//           foundUserEvent.save(err=>{
//             if(err){
//               res.json(err)
//               return
//             }
//             console.log("end")
//             res.json({
//               data:{ foundUserEvent, event}
//             })
//           })
//         })
//       // })
//     })
//   })
// });

//TESTING FOR ACCEPTING INVITE
userEventRoutes.put('/api/users/:id/user-events/accept', (req, res, next) => {
  const userId = req.params.id;
  console.log("body is: ", req.body)
  if (!req.user) {
    res.status(401).json({ message: "Log in to update the event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
  }
  if(req.user.isPromoter==="true"){
    res.status(401).json({message: "You Must Be A Guest to Accept the Event"});
    return;}

    UserEvent.findById(req.params.id, (err,foundUserEvent)=>{
      // console.log("user id: ",req.params.id )

      if(err){
        res.json(err)
        return

      }

  if(req.user.ispromoter === "false" &&theUserEvent.creator!==req.user._id){
      res.status(401).json({message: "You Must Be A Promoter or the Guest Event Creator to view the individual Event"});
      return;}

      Event.findById(req.body.id, (err,event)=>{
        if(err){
          res.json(err)
          return
        }
        
        foundUserEvent.promoterEventsInvited.remove(event._id);
        foundUserEvent.promoterEventsInvitedName.remove(event.name);

        event.userEventsInvited.remove(foundUserEvent._id);
        event.userEventsInvitedName.remove(foundUserEvent._name);

        foundUserEvent.promoterEventsConfirmed.push(event._id);
        foundUserEvent.promoterEventsConfirmedName.push(event.name);

        event.userEventsConfirmed.push(foundUserEvent._id);
        event.userEventsConfirmed.push(foundUserEvent.name);
        // console.log("heyyyy", event.userEventsConfirmed)

        event.save(err=>{
          if(err){
            res.json(err)
            return
          }
          foundUserEvent.save(err=>{
            if(err){
              res.json(err)
              return
            }
            res.json({
              data:foundUserEvent, event
            })
          })
        })
      })
    })
});




//Testing for Decline Invite:


userEventRoutes.put('/api/user-events/:id/decline', (req, res, next) => {
  
  if (!req.user) {
    res.status(401).json({ message: "Log in to update the event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
  }
  if(req.user.isPromoter==="true"){
    res.status(401).json({message: "You Must Be A Guest to Accept the Event"});
    return;}

    UserEvent.findById(req.params.id, (err,foundUserEvent)=>{
      // console.log("user id: ",req.params.id )

      if(err){
        res.json(err)
        return

      }


    if(req.user.ispromoter === "false" &&theUserEvent.creator!==req.user._id){
      res.status(401).json({message: "You Must Be A Promoter or the Guest Event Creator to view the individual Event"});
      return;}

      Event.findById(req.body.id, (err,event)=>{
        if(err){
          res.json(err)
          return
        }

        foundUserEvent.promoterEventsInvited.remove(event._id);
        foundUserEvent.promoterEventsInvitedName.remove(event.name);

        event.userEventsInvited.remove(foundUserEvent._id);
        event.userEventsInvitedName.remove(foundUserEvent.name);
        // console.log("heyyyy", event.userEventsConfirmed)

        event.save(err=>{
          if(err){
            res.json(err)
            return
          }
          foundUserEvent.save(err=>{
            if(err){
              res.json(err)
              return
            }
            res.json({
              data:foundUserEvent, event
            })


          })
        })
      })
    })
});

module.exports = userEventRoutes;