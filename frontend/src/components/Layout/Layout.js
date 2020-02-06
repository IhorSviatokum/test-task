import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "./Modal/Modal";
import * as actions from "../../store/actions/Actions";

import Toolbar from "../UI/Toolbar/Toolbar";

class Layout extends Component {
  componentDidMount() {
    this.props.onCheckState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.props.onCheckState();
    }
  }

  closeModalHandler = () => {
    if (this.props.editing) {
      this.props.onFinishEdit();
    }
    if (this.props.adding) {
      this.props.onFinishAdding();
    }
    if (this.props.loggingin) {
      this.props.onCancelAuth();
    }
  };

  initLoginHandler = () => {
    this.props.onInitAuth();
  };

  addEventHandler = () => {
    this.props.onStartAdding();
  };

  downloadListHandler = () => {
    fetch("http://localhost:8080/download", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "calendar.json");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal
          loggingin={this.props.loggingin}
          editing={this.props.editing}
          adding={this.props.adding}
          onCloseModal={this.closeModalHandler}
          startValue={this.props.start}
          finishValue={this.props.finish}
        />
        <Toolbar
          auth={this.props.token}
          onAddEvent={this.addEventHandler}
          onDownloadList={this.downloadListHandler}
          onInitLogin={this.initLoginHandler}
          isAuth={this.props.token}
          onLogout={this.props.onLogout}
        />
        {this.props.children}
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
    loggingin: state.auth.loggingin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckState: () => dispatch(actions.authCheckState()),
    onStartAdding: () => dispatch(actions.addingStart()),
    onFinishAdding: () => dispatch(actions.addingFinish()),
    onStartEdit: () => dispatch(actions.editingStart()),
    onFinishEdit: () => dispatch(actions.editingFinish()),
    onInitAuth: () => dispatch(actions.authInit()),
    onLogout: () => dispatch(actions.logout()),
    onCancelAuth: () => dispatch(actions.authCancel())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
