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
// Route to Handle Review Form Submission
router.post('api/user-events/:id/comments/new', (req, res, next) => {
  // Load the Product From the Database
  let eventsId = req.params.id;

  UserEvent.findById(eventId, (err, event) => {
      // Create the Schema Object to Save the Review
      const newComment = new Comment({
          content: req.body.content,
          title: req.body.stars,
          owner: req.user._id
      });
      
      // Add Comment to Event Comment Array
      event.comments.push(newComment);
  
      // Save the product to the Database
      event.save((err) => {
          if (err) { return next(err); }
          // Redirect the user to the event page
          res.redirect(`/events/${event._id}`);
      });
  });
});



module.exports = commentRoutes;