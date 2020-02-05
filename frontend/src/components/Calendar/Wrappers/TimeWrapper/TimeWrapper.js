import React from "react";

import TimeElement from "../../Elements/TimeElement/TimeElement";

const minutes = (17 - 8) * 60;

const timeWrapper = props => {
  let table = [];
  for (let i = 0; i <= minutes; i += 5) {
    table.push(<TimeElement key={i} time={i} id={i} />);
  }

  return <div onClick={props.onSelecting}>{table}</div>;
};

export default timeWrapper;
