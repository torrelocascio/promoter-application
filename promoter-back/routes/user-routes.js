const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const userRoutes = express.Router();

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






// update the User
userRoutes.put('/api/users/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the user." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    const updates = {
      username: req.body.userName,
      owner: req.user._id,
      description: req.body.description,
      profileImage: req.body.image,
      address: req.body.address,

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