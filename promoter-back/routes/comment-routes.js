const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const commentRoutes = express.Router();

const UserEvent= require('../models/user-event-model')
const Comment = require('../models/comment-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


// create new comment
// Route to Handle Review Comment Submission
commentRoutes.post('/api/user-events/:id/comments/new', (req, res, next) => {
  // Load the UserEvent From the Database
  let eventId = req.params.id;

  UserEvent.findById(eventId, (err, event) => {
      console.log("Event+++++++++++++++", event)
      // Create the Schema Object to Save the Review
      const newComment = new Comment({
          text: req.body.content,
          owner: req.user._id
      });
      
      // Add Comment to Event Comment Array
      event.comments.push(newComment);
  
      // Save the product to the Database
      event.save((err) => {
          if (err) { return next(err); }
          // Redirect the user to the event page
          res.json(event)
      });
  });
});



module.exports = commentRoutes;