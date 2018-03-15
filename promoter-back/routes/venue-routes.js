const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const venueRoutes = express.Router();

const Venue = require('../models/venue-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


// create new venue
venueRoutes.post('/api/venues/new', myUploader.single('venuePic'), (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: "Log in to create venue."});
        return;
    }
    if(req.user.isPromoter===false){
      res.status(401).json({message: "You Must Be A Promoter to Create A Venue"});
      return;
  }
    
    const newVenue= new Venue({
      name: req.body.venueName,
      owner: req.user._id,
      description: req.body.description,
      image: req.body.image

    });
    if(req.file){
        newVenue.image = '/uploads' + req.file.filename;
    }

    newVenue.save((err) => {
        if(err){
            res.status(500).json({message: "Some weird error from DB."});
            return;
        }
        // validation errors
        if (err && newVenue.errors){
            res.status(400).json({
                brandError: newVenue.errors.brand,
            });
            return;
        }
        req.user.encryptedPassword = undefined;
        newVenue.user = req.user;

        res.status(200).json(newVenue);
    });
});

// list the venues

venueRoutes.get('/api/venues', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see venues." });
      return;
    }
    Venue.find()
      // retrieve all the info of the owners (needs "ref" in model)
      // don't retrieve "encryptedPassword" though
      .populate('user', { encryptedPassword: 0 })
      .exec((err, allTheVenues) => {
        if (err) {
          res.status(500).json({ message: "Venues find went bad." });
          return;
        }
        res.status(200).json(allTheVenues);
      });
});

// list single venue
venueRoutes.get("/api/venues/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE venue." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Venue.findById(req.params.id, (err, theVenue) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Venues find went bad." });
      return;
    }

    res.status(200).json(theVenue);
  });
});

// update the venue
venueRoutes.put('/api/venues/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the venue." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    if(req.user.isPromoter===false){
      res.status(401).json({message: "You Must Be A Promoter to edit A Venue"});
      return;}

    const updates = {
      name: req.body.venueName,
      owner: req.user._id,
      description: req.body.description,
      image: req.body.image, 
    };

  Venue.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Venue updated successfully."
    });
  });
});

// delete venue
venueRoutes.delete("/api/venues/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the venue." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }
  if(req.user.isPromoter===false){
    res.status(401).json({message: "You Must Be A Promoter to edit A Venue"});
    return;}

  Venue.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Venue has been removed."
    });
  });
});


module.exports = venueRoutes;