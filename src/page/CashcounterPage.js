import React, { useState } from "react";
import CashCounter from "./CashCounter";
import { Add, Cancel } from "@mui/icons-material";

export default function CashCounterPage() {
  const [counters, setCounters] = useState([<CashCounter key={0} />]);

  const addCounter = () => {
    const newCounters = [...counters, <CashCounter key={counters.length} />];
    setCounters(newCounters);
  };
  const removeCounter = (index) => {
    const newCounters = counters.filter((_, i) => i !== index);
    setCounters(newCounters);
  };
  return (
    <div className="counterPage">
      {counters.map((counter, index) => (
        <div key={index} className="warpingDiv">
          {counter}{" "}
          <button onClick={() => removeCounter(index)} className="removeBtn">
            <Cancel />
          </button>
        </div>
      ))}
      <button onClick={addCounter} className="addBtn">
        <Add /> Add Counter
      </button>
    </div>
  );
}
