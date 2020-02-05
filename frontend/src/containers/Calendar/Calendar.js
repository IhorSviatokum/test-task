import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Calendar.module.css";
import * as actions from "../../store/actions/Actions";

import TimeWrapper from "../../components/Calendar/Wrappers/TimeWrapper/TimeWrapper";
import EventWrapper from "../../components/Calendar/Wrappers/EventWrapper/EventWrapper";

class Calendar extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.props.onInit(this.props.token);
    }
  }

  selectHandler = event => {
    if (this.props.token) {
      if (!this.props.selecting) {
        if (event.target.nodeName === "BUTTON") {
          const timeId = event.target.closest("div[id]").id;
          this.props.onStartSelectingTime(timeId);
        }
      } else {
        if (event.target.id !== this.props.start) {
          const timeId = event.target.closest("div[id]").id;
          this.props.onFinishSelectingTime(timeId);
          this.props.onStartAdding();
        }
      }
    }
  };

  eventClickHandler = event => {
    this.props.onFetchEvent(event.target.id, this.props.token);
  };

  render() {
    return (
      <div className={classes.CalendarContainer}>
        <TimeWrapper
          selecting={this.props.selecting}
          onSelecting={event => this.selectHandler(event)}
        />
        <EventWrapper
          events={this.props.events}
          onEventClick={event => this.eventClickHandler(event)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.events,
    selecting: state.events.selecting,
    start: state.events.start,
    finish: state.events.finish,
    adding: state.events.adding,
    editing: state.events.editing,
    error: state.events.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInit: token => dispatch(actions.initCalendar(token)),
    onFetchEvent: (eventId, token) =>
      dispatch(actions.fetchEvent(eventId, token)),
    onStartSelectingTime: timeId => dispatch(actions.selectTimeStart(timeId)),
    onFinishSelectingTime: timeId => dispatch(actions.selectTimeFinish(timeId)),
    onStartAdding: () => dispatch(actions.addingStart()),
    onFinishAdding: () => dispatch(actions.addingFinish()),
    onStartEdit: () => dispatch(actions.editingStart()),
    onFinishEdit: () => dispatch(actions.editingFinish())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
