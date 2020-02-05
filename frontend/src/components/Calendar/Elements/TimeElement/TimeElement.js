import React from "react";
import classes from "./TimeElement.module.css";
import AddEventButton from "../../../UI/AddEventButton/AddEventButton";

import { convertToTime } from "../../../../utils/convertToTime";

const timeElement = props => {
  let label = "";
  let containerClasses = [classes.timeElementContainer];
  let labelClasses = [classes.timeElementLabel];

  if (props.time % 30 === 0) {
    label = convertToTime(props.time);
  }
  if (props.time % 60 === 0) {
    labelClasses.push(classes.hourLabel);
    containerClasses.push(classes.hourContainer);
  }

  return (
    <div className={containerClasses.join(" ")} id={props.id}>
      <div className={labelClasses.join(" ")}>
        {label}
        <AddEventButton />
      </div>
      <div className={classes.timeElementField} />
    </div>
  );
};

export default timeElement;
