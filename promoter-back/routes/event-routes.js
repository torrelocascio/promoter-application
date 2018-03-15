const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const eventRoutes = express.Router();

const Event = require('../models/event-model');
const User = require('../models/user-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


// create new promoter event !!!!!!!!!Edit the new Event Fields
eventRoutes.post('/api/events/new', myUploader.single('eventPic'), (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: "Log in to create event."});
        return;
    }
    if(req.user.isPromoter===false){
      res.status(401).json({message: "You Must Be A Promoter to edit A Venue"});
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
                brandError: newEvent.errors.brand,
            });
            return;
        }
        req.user.encryptedPassword = undefined;
        newEvent.user = req.user;

        res.status(200).json(newEvent);
    });
});



// list all promoter's events the events

eventRoutes.get('/api/events', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see events." });
      return;
    }
    if(req.user.isPromoter===false){
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
    if(req.user.isPromoter===false){
      res.status(401).json({message: "You Must Be A Promoter to Edit an Event"});
      return;}

    const updates = {
      name: req.body.eventName,
      owner: req.user._id,
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
eventRoutes.put('/api/user-event/:id/invite', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to update the event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
  }
  if(req.user.isPromoter===false){
    res.status(401).json({message: "You Must Be A Promoter to Edit an Event"});
    return;}

    UserEvent.findById(req.params.id, (err,foundUserEvent)=>{
      console.log("user id: ",req.params.id )
      if(err){
        res.json(err)
        return
      }
      Event.findById(req.body.id, (err,event)=>{
        console.log("event id: ",req.body.id );
        if(err){
          res.json(err)
          return
        }
    
        foundUserEvent.eventsInvitedTo.push(event._id);
        event.invitedGuests.push(foundUserEvent._id);
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
              data:foundUserEvent
            })
            res.json({
              data2:event
            })
          })
        })
      })
    })
});





// delete event
eventRoutes.delete("/api/events/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the event." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }
  if(req.user.isPromoter===false){
    res.status(401).json({message: "You Must Be A Promoter to Delete Events"});
    return;}

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
