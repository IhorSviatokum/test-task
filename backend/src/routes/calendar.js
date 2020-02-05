const express = require("express");
const { body } = require("express-validator/check");

const calendarController = require("../controllers/calendar");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/events", isAuth, calendarController.getEvents);

router.get("/download", isAuth, calendarController.downloadCalendar);

router.post(
  "/event",
  isAuth,
  [
    body("title")
      .trim()
      .not()
      .isEmpty(),
    body("start")
      .toInt()
      .isInt({ min: 0 })
      .withMessage("No events before 8:00!"),
    body("duration")
      .toInt()
      .custom((value, { req }) => {
        if (value + req.body.start > 540) {
          throw new Error(
            "It's far too late to plan something, have some tea!"
          );
        }
        return true;
      })
  ],
  calendarController.createEvent
);

router.get("/event/:eventId", isAuth, calendarController.getEvent);

router.put(
  "/event/:eventId",
  isAuth,
  [
    body("title")
      .trim()
      .not()
      .isEmpty(),
    body("start")
      .toInt()
      .isInt({ min: 0 })
      .withMessage("No events before 8:00!"),
    body("duration")
      .toInt()
      .custom((value, { req }) => {
        if (value + req.body.start > 540) {
          throw new Error(
            "It's far too late to plan something, have some tea!"
          );
        }
        return true;
      })
  ],
  calendarController.updateEvent
);

router.delete("/event/:eventId", isAuth, calendarController.deleteEvent);

module.exports = router;
