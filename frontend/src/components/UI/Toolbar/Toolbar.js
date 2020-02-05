import React from "react";
import classes from "./Toolbar.module.css";
import UiItems from "../UiItems/UiItems";
import UiItem from "../UiItems/UiItem/UiItem";

const toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      {props.isAuth && (
        <UiItems
          onAddEvent={props.onAddEvent}
          onDownloadList={props.onDownloadList}
        />
      )}
      {props.isAuth ? (
        <UiItem title="Logout" click={props.onLogout} />
      ) : (
        <UiItem title="Login" click={props.onInitLogin} />
      )}
    </div>
  );
};

export default toolbar;
