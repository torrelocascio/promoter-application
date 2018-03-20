const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const userRoutes = express.Router();

const UserEvents = require('../models/user-event-model')
const User = require('../models/user-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});

// list single user
userRoutes.get("/api/users/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE user." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Users find went bad." });
      return;
    }

    res.status(200).json(theUser);
  });
});

//pull user Events per User // need help here

userRoutes.get("/api/users/:id/user-events", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE user." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Users find went bad." });
      return;
    }

    res.status(200).json(theUser);
  });
});

//Pull all user events

// userRoutes.get('/api/user-events', (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({ message: "Log in to see user events." });
//     return;
//   }
//   UserEvents.find()
//     // retrieve all the info of the owners (needs "ref" in model)
//     // don't retrieve "encryptedPassword" though
//     .populate('user', { encryptedPassword: 0 })
//     .exec((err, allTheUserEvents) => {
//       if (err) {
//         res.status(500).json({ message: "User Events find went bad." });
//         return;
//       }
//       res.status(200).json({allTheUserEvents: allTheUserEvents});
//     });
// });

//pull Promoter Events per Promoter // 

userRoutes.get("/api/users/:id/events", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE user." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Users find went bad." });
      return;
    }

    res.status(200).json(theUser);
  });
});

//List All User Events Per User

userRoutes.get("/api/users/:id/user-events", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE user." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Users find went bad." });
      return;
    }

    res.status(200).json(theUser);
  });
});



// update the User
userRoutes.put('/api/users/:id', myUploader.single('file'), (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the user." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    console.log("This is req.user._id",req.user._id)
    console.log("This is req.params.id",req.params.id)

    // if(req.user._id !==req.params.id){
    //     res.status(401).json({message: "You aren't authorized to edit this profile"})
    //     return;
    //   }
    

    const updates = {
      username: req.body.username,
      // owner: req.user._id,
      description: req.body.description,
      // profileImage: req.body.image,
      // address: req.body.address,
      // profileImage: `/uploads/${req.file.filename}`,
      // specs: JSON.parse(req.body.specs) || []

    };

  User.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "User updated successfully."
    });
  });
});

// delete user
userRoutes.delete("/api/users/:id"
, (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the user." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }

  // if(req.user._id !==req.params.id){
  //       res.status(401).json({message: "You aren't authorized to delete this profile"})
  //       return;
  //   }

    

  User.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "User has been removed."
    });
  });
});



module.exports = userRoutes;