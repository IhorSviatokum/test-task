import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import Backdrop from "./Backdrop/Backdrop";
import EditEventForm from "../../Forms/EditEventForm/EditEventForm";
import AuthForm from "../../Forms/AuthForm/AuthForm";

const modal = props => {
  let modal = null;
  let content;
  if (props.adding || props.editing) {
    content = <EditEventForm click={props.onCloseModal} />;
  }
  if (props.loggingin) {
    content = <AuthForm click={props.onCloseModal} />;
  }
  if (props.loading) {
    content = <Spinner />;
  }
  if (props.editing || props.adding || props.loggingin || props.loading) {
    modal = (
      <Fragment>
        <Backdrop click={props.onCloseModal} />
        <div className={classes.Modal}>{content}</div>
      </Fragment>
    );
  }

  //
  //if (props.editing || props.adding) {
  //}
  //if (props.loading) {
  //}
  return modal;
};

export default modal;
