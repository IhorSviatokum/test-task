const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Event = require("../models/event");
const User = require("../models/user");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ creator: req.userId });
    res.status(200).json({
      message: "Fetched events successfully.",
      events: events
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const title = req.body.title;
    const start = req.body.start;
    const duration = req.body.duration;
    const event = new Event({
      title: title,
      start: start,
      duration: duration,
      creator: req.userId
    });

    await event.save();
    const user = await User.findById(req.userId);
    user.events.push(event);
    await user.save();
    res.status(201).json({
      message: "Event created successfully!",
      event: event,
      creator: { _id: user._id, name: user.name }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  try {
    if (!event) {
      const error = new Error("Could not find event.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Event fetched.", event: event });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const title = req.body.title;
    const start = req.body.start;
    const duration = req.body.duration;

    const event = await Event.findById(eventId);
    if (!event) {
      const error = new Error("Could not find event.");
      error.statusCode = 404;
      throw error;
    }
    if (event.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    event.title = title;
    event.start = start;
    event.duration = duration;
    const result = await event.save();
    res.status(200).json({ message: "Event updated!", event: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      const error = new Error("Could not find event.");
      error.statusCode = 404;
      throw error;
    }
    if (event.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    await Event.findByIdAndRemove(eventId);

    const user = await User.findById(req.userId);
    user.events.pull(eventId);
    await user.save();

    res.status(200).json({ message: "Deleted event." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.downloadCalendar = async (req, res, next) => {
  try {
    const events = await Event.find({ creator: req.userId });
    const fileContents = events.map(event => {
      return {
        title: event.title,
        start: event.start,
        duration: event.duration
      };
    });
    const filePath = path.join(__dirname, "..", "docs", "events.json");
    fs.writeFile(filePath, JSON.stringify(fileContents), err => {
      if (err) {
        throw err;
      }
      res.download(filePath, err => {
        if (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
