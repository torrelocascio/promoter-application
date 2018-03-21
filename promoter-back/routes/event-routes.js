const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const eventRoutes = express.Router();
var bodyParser = require('body-parser');

const Event = require('../models/event-model');
const User = require('../models/user-model');
const UserEvent = require('../models/user-event-model');
// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


// create new promoter event !!!!!!!!!Edit the new Event Fields
eventRoutes.post('/api/new-events', myUploader.single('eventPic'), (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: "Log in to create event."});
        return;
    }
    if(req.user.isPromoter==="false"){
      res.status(401).json({message: "You Must Be A Promoter to edit an Event"});
      return;}

    const newEvent = new Event({
      name: req.body.eventName,
      owner: req.user._id,
      place: req.body.venue,
      description: req.body.description,
      image: req.body.image,

    });
    if(req.file){
        newEvent.image = '/uploads' + req.file.filename;
    }

    newEvent.save((err) => {
        if(err){
            res.status(500).json({message: "Some weird error from DB."});
            return;
        }
        // validation errors
        if (err && newEvent.errors){
            res.status(400).json({
                // brandError: newEvent.errors.brand,
            });
            return;
        }

     
        
        // req.user.encryptedPassword = undefined;
        newEvent.user = req.user;
console.log("newEvent._id+++++++++++",newEvent._id)
console.log("req.user.eventCreated++++++++++",req.user.eventCreated)

req.user.eventCreated.push(newEvent)
req.user.save(err => {
  if(err){
    console.log("err saving user: ", err);
  }
  res.status(200).json(newEvent);

})


    });
});



// list all promoter's events the events

eventRoutes.get('/api/events', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see events." });
      return;
    }
    if(req.user.isPromoter==="false"){
      res.status(401).json({message: "You Must Be A Promoter View All Promoter Events"});
      return;}
    Event.find()
      // retrieve all the info of the owners (needs "ref" in model)
      // don't retrieve "encryptedPassword" though
      .populate('user', { encryptedPassword: 0 })
      .exec((err, allTheEvents) => {
        if (err) {
          res.status(500).json({ message: "Events find went bad." });
          return;
        }
        res.status(200).json(allTheEvents);
      });
});


// list single promoter event
eventRoutes.get("/api/events/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  

  Event.findById(req.params.id, (err, theEvent) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Events find went bad." });
      return;
    }

    res.status(200).json(theEvent);
  });
});

// update the promoter event !!!!!!!!!Check Update Fields
eventRoutes.put('/api/events/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the event." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    if(req.user.isPromoter==="false"){
      res.status(401).json({message: "You Must Be A Promoter to Edit an Event"});
      return;}

    const updates = {
      name: req.body.eventName,
      place: req.body.venue,
      description: req.body.description,
      image: req.body.image,
    };

  Event.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Event updated successfully."
    });
  });
});

//Invite Guests to Event Ask Sandra (push promoter event into Guest's Array)
//!!!!!!!!!!!Edit what happens on invite, new fields, new array push
eventRoutes.put('/api/user-events/:id/invite', (req, res, next) => {
  console.log(req.body)
  if (!req.user) {
    res.status(401).json({ message: "Log in to update the event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
  }
  if(req.user.isPromoter==="false"){
    res.status(401).json({message: "You Must Be A Promoter to Edit an Event"});
    return;}


  

    UserEvent.findById(req.params.id, (err,foundUserEvent)=>{
      // console.log("user id: ",req.params.id )

      if(err){
        res.json(err)
        return

      }
  
      // console.log("name is ============",req.body.promoterEventThing)
      const name = req.body.promoterEventThing;
      Event.findOne({"name": name}, (err,event)=>{
        console.log("in the route");
        console.log("name here", name);
        console.log("event here", event)
        if(err){console.log(
          "err is: ", err)
          // res.json(err)
          return
        }
        // console.log("Here is the event============",event)
        // console.log("Here is the foundUserEvent=========",foundUserEvent)

        foundUserEvent.promoterEventsInvited.push(event._id);
        foundUserEvent.promoterEventsInvitedName.push(event.name);

        event.userEventsInvited.push(foundUserEvent._id);
        event.userEventsInvitedName.push(foundUserEvent.name);

        event.save(err=>{
          // console.log("===============")
          // console.log(event)
          // console.log("===============")

          if(err){
            res.json(err)
            return
          }
          foundUserEvent.save(err=>{
            console.log("found user event: ", foundUserEvent)
            console.log("===============")


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





// delete promoter event
eventRoutes.delete("/api/events/:id", (req, res, next) => {

  
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }
  if(req.user.isPromoter==="false"){
    res.status(401).json({message: "You Must Be A Promoter to Delete Events"});
    return;}

    Event.findById(req.params.id, (err,event)=>{
      if(err){
        res.json(err)
        return
      }
      if(req.user.isPromoter==="true" && req.user._id !==event.owner){
        res.status(401).json({message: "You are not the Promoter Who Created This Event"})
        return;
      }
    
    })



  Event.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Event has been removed."
    });
  });
});





module.exports = eventRoutes;
