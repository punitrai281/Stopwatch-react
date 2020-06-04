import React from "react";
function Lap(props) {
  return (
    <p>
      #{props.no + 1}{" "}
      {props.item.hour < 10 ? "0" + props.item.hour : props.item.hour}:
      {props.item.min < 10 ? "0" + props.item.min : props.item.min}:
      {props.item.sec < 10 ? "0" + props.item.sec : props.item.sec}
    </p>
  );
}
export default Lap;
