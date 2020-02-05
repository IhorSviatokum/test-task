import React from "react";
import EventElement from "../../Elements/EventElement/EventElement";
import EventGroup from "../../Elements/EventElement/EventGroup";

import classes from "./EventWrapper.module.css";

const eventWrapper = props => {
  let prevEventEnding = 0;
  let offset = 0;
  let eventGroup = [];
  let eventList = [];
  if (props.events) {
    /*Rendering events on the timetable. Events are sorted and the we check, whether or not start of a given event
    overlaps with the latest ending of previous events. If so, they are put together into the eventGroup array, after
    which they are rendered as a grid. Otherwise, new eventGroup array is created.  */

    props.events
      .sort((a, b) => a.start - b.start)
      .forEach((event, index) => {
        if (eventGroup.length && prevEventEnding <= event.start) {
          eventList.push(
            <EventGroup
              key={Math.random()}
              start={eventGroup[0].props.start}
              end={prevEventEnding}
            >
              {[...eventGroup]}
            </EventGroup>
          );
          eventGroup = [];
          offset = prevEventEnding;
        }
        eventGroup.push(
          <EventElement
            key={event._id}
            id={event._id}
            start={event.start - offset}
            duration={event.duration}
            title={event.title}
            click={props.onEventClick}
          />
        );

        if (index === props.events.length - 1) {
          eventList.push(
            <EventGroup
              key={Math.random()}
              start={eventGroup[0].props.start}
              end={event.start + event.duration}
            >
              {[...eventGroup]}
            </EventGroup>
          );
        } else {
          if (prevEventEnding < event.start + event.duration) {
            prevEventEnding = event.start + event.duration;
          }
        }
      });
  }

  return <div className={classes.EventWrapper}>{eventList}</div>;
};

export default eventWrapper;
