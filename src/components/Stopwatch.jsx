import React, { useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
function Stopwatch(props) {
  const array = props.setArray;
  const [stopwatch, setStopwatch] = useState({
    hour: 0,
    min: 0,
    sec: 0,
    secElapsed: 0,
    minElapsed: 0,
  });
  const [buttonState, setButtonState] = useState({
    start: true,
    stop: false,
    pause: false,
    resume: false,
    lap: false,
  });

  const [intervalState, setIntervalState] = useState(null);
  function onStart() {
    var intState = setInterval(() => {
      setStopwatch((prevValue) => {
        prevValue.secElapsed++;
        return {
          hour: Math.floor(prevValue.secElapsed / 3600),
          minElapsed: Math.floor((prevValue.secElapsed + 1) / 60),
          min: prevValue.minElapsed % 60,
          sec: prevValue.secElapsed % 60,
          secElapsed: prevValue.secElapsed,
        };
      });
    }, 1000);
    setButtonState((prevValue) => {
      return {
        ...prevValue,
        start: false,
        pause: true,
        stop: true,
        lap: true,
      };
    });
    setIntervalState(intState);
  }
  function onPause() {
    setButtonState((prevValue) => {
      return {
        ...prevValue,
        pause: false,
        resume: true,
        lap: false,
      };
    });
    clearInterval(intervalState);
  }
  function onResume() {
    onStart();
    setButtonState((prevValue) => {
      return {
        ...prevValue,
        pause: true,
        resume: false,
        lap: true,
      };
    });
  }
  function onReset() {
    clearInterval(intervalState);
    setButtonState((prevValue) => {
      return {
        ...prevValue,
        start: true,
        stop: false,
        resume: false,
        pause: false,
        lap: false,
      };
    });
    setStopwatch({
      hour: 0,
      min: 0,
      sec: 0,
      secElapsed: 0,
      minElapsed: 0,
    });
    array([]);
  }
  function onLap() {
    array((prevValue) => {
      return [...prevValue, stopwatch];
    });
  }

  const style = { fontSize: 40, paddingTop: 6, color: "LightGrey" };
  return (
    <div className="stopwatch">
      <h1>
        {stopwatch.hour < 10 ? "0" + stopwatch.hour : stopwatch.hour}:
        {stopwatch.min < 10 ? "0" + stopwatch.min : stopwatch.min}:
        {stopwatch.sec < 10 ? "0" + stopwatch.sec : stopwatch.sec}
      </h1>
      {buttonState.lap ? (
        <button className="extra-btn lap-btn" onClick={onLap}>
          Lap
        </button>
      ) : null}
      {buttonState.start ? (
        <button className="function-btn" onClick={onStart}>
          <PlayArrowIcon style={style} />
        </button>
      ) : null}
      {buttonState.pause ? (
        <button className="function-btn" onClick={onPause}>
          <PauseIcon style={style} />
        </button>
      ) : null}
      {buttonState.resume ? (
        <button className="function-btn " onClick={onResume}>
          <PlayArrowIcon style={style} />
        </button>
      ) : null}
      {buttonState.stop ? (
        <button className="extra-btn reset-btn" onClick={onReset}>
          Reset
        </button>
      ) : null}
    </div>
  );
}
export default Stopwatch;
