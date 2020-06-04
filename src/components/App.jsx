import React, { useState } from "react";
import Stopwatch from "./Stopwatch";
import Lap from "./Lap";
function App() {
  const [lapArray, setLapArray] = useState([]);
  console.log(lapArray);
  return (
    <div>
      <h2>Stopwatch</h2>
      <Stopwatch setArray={setLapArray} />
      <div>
        {lapArray.map((items, index) => {
          return <Lap no={index} key={index} item={items} />;
        })}
      </div>
    </div>
  );
}
export default App;
