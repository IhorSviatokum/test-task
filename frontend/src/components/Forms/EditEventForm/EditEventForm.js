import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./EditEventForm.module.css";
import UiItem from "../../UI/UiItems/UiItem/UiItem";
import * as actions from "../../../store/actions/Actions";
import { convertToTime } from "../../../utils/convertToTime";

class EditEventForm extends Component {
  state = {
    start: 0,
    duration: 0,
    title: ""
  };

  componentDidMount() {
    if (this.props.adding) {
      if (+this.props.finish < +this.props.start) {
        this.setState({
          start: +this.props.finish,
          duration: +this.props.start - +this.props.finish
        });
      } else {
        this.setState({
          start: +this.props.start,
          duration: +this.props.finish - +this.props.start
        });
      }
    }
    if (this.props.editing) {
      this.setState({
        start: +this.props.currentEvent.start,
        duration: +this.props.currentEvent.duration,
        title: this.props.currentEvent.title
      });
    }
  }

  inputChangeHandler = event => {
    let value = event.target.value;
    if (!event.target.id === "title") {
      value = +value;
    }
    this.setState({
      [event.target.id]: value
    });
  };

  addEventHandler = () => {
    this.props.onAddEvent(this.state, this.props.token);
  };

  editEventHandler = () => {
    this.props.onEditEvent(
      this.props.currentEvent._id,
      this.state,
      this.props.token
    );
  };

  deleteEventHandler = () => {
    this.props.onDeleteEvent(this.props.currentEvent._id, this.props.token);
  };

  render() {
    let buttons;
    if (this.props.adding) {
      buttons = (
        <div>
          <UiItem title="Add" click={this.addEventHandler} />
          <UiItem title="Cancel" click={this.props.click} />
        </div>
      );
    }

    if (this.props.editing) {
      buttons = (
        <div>
          <UiItem title="Update" click={this.editEventHandler} />
          <UiItem title="Delete" click={this.deleteEventHandler} />
          <UiItem title="Cancel" click={this.props.click} />
        </div>
      );
    }

    return (
      <div className={classes.EditEventForm}>
        <form>
          <div className={classes.FormElement}>
            <label>
              Start:
              <input
                type="number"
                name="start"
                id="start"
                min="0"
                max="535"
                step="5"
                value={this.state.start}
                onChange={event => this.inputChangeHandler(event)}
              />{" "}
            </label>
            <span>{convertToTime(+this.state.start)}</span>
          </div>
          <div className={classes.FormElement}>
            <label>
              Duration:
              <input
                type="number"
                name="duration"
                id="duration"
                min="5"
                max="540"
                step="5"
                value={this.state.duration}
                onChange={event => this.inputChangeHandler(event)}
              />
            </label>
            <span>
              {" "}
              Finish at:{" "}
              {convertToTime(+this.state.start + +this.state.duration)}
            </span>
          </div>
          <div className={classes.FormElement}>
            <label>
              Title:
              <input
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                onChange={event => this.inputChangeHandler(event)}
              />
            </label>
          </div>
        </form>
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    start: state.events.start,
    finish: state.events.finish,
    adding: state.events.adding,
    editing: state.events.editing,
    currentEvent: state.events.currentEvent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddEvent: (body, token) => dispatch(actions.addEvent(body, token)),
    onEditEvent: (eventId, body, token) =>
      dispatch(actions.editEvent(eventId, body, token)),
    onDeleteEvent: (eventId, token) =>
      dispatch(actions.deleteEvent(eventId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventForm);
