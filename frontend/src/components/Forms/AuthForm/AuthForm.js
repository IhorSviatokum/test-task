import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./AuthForm.module.css";
import UiItem from "../../UI/UiItems/UiItem/UiItem";
import * as actions from "../../../store/actions/Actions";

class AuthForm extends Component {
  state = {
    login: "",
    password: "",
    signup: false
  };

  inputChangeHandler = event => {
    let value = event.target.value;
    this.setState({
      [event.target.id]: value
    });
  };

  toggleSignupHandler = () => {
    this.setState(prevState => {
      return {
        signup: !prevState.signup
      };
    });
  };

  authHandler = () => {
    this.props.onAuth(this.state.login, this.state.password, this.state.signup);
  };

  render() {
    return (
      <div className={classes.AuthEventForm}>
        <form>
          <div className={classes.SignupToggle}>
            <input
              type="checkbox"
              name="signup"
              value={this.state.signup}
              onChange={this.toggleSignupHandler}
            />
            {this.state.signup ? " Switch to Login" : " Switch to Signup"}
          </div>
          <div className={classes.FormElement}>
            <label>
              Login:
              <input
                type="text"
                name="login"
                id="login"
                value={this.state.login}
                onChange={event => this.inputChangeHandler(event)}
              />
            </label>
          </div>
          <div className={classes.FormElement}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={event => this.inputChangeHandler(event)}
              />
            </label>
          </div>
        </form>
        <UiItem
          title={this.state.signup ? "Signup" : "Login"}
          click={this.authHandler}
        />
        <UiItem title="Cancel" click={this.props.click} />
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
    onAuth: (login, password, isSignup) =>
      dispatch(actions.auth(login, password, isSignup))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
