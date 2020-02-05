import React from "react";
import classes from "./UiItem.module.css";

const uiItem = props => {
  return (
    <button className={classes.UiItem} onClick={props.click}>
      {props.title}
    </button>
  );
};

export default uiItem;
