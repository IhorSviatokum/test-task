import React from "react";
import classes from "./EventElement.module.css";

const eventElement = props => {
  const style = {
    gridRow: `${1 + props.start / 5} / span ${props.duration / 5}`
  };

  return (
    <div
      className={classes.EventElement}
      style={style}
      id={props.id}
      onClick={props.click}
    >
      {props.title}
    </div>
  );
};

export default eventElement;
