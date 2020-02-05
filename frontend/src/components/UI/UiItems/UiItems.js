import React from "react";
import classes from "./UiItems.module.css";
import UiItem from "./UiItem/UiItem";

const uiItems = props => {
  return (
    <div className={classes.UiItems}>
      <UiItem title="Add Event" click={props.onAddEvent} />
      <UiItem title="Download List" click={props.onDownloadList} />
    </div>
  );
};

export default uiItems;
