import React, { useState } from "react";
import "../styles/CashCounter.css"; // Import your CSS file
import { Close } from "@mui/icons-material";
export default function CashCounter() {
  const [denominations, setDenominations] = useState([
    { value: 1000, count: "" },
    { value: 500, count: "" },
    { value: 200, count: "" },
    { value: 100, count: "" },
    { value: 50, count: "" },
    { value: 20, count: "" },
    { value: 10, count: "" },
    { value: 5, count: "" },
    { value: 2, count: "" },
    { value: 1, count: "" },
    { value: "extra", count: "" },
  ]);

  const handleKeyDown = (e, id) => {
    // console.log(e.key);
    if (e.key === "ArrowDown" && id < denominations.length - 1) {
      focusedInput(id + 1);
    } else if (e.key === "Enter" && id < denominations.length - 1) {
      focusedInput(id + 1);
    } else if (e.key === "ArrowUp" && id > 0) {
      focusedInput(id - 1);
    }
  };
  const focusedInput = (id) => {
    document.getElementById(`input-${id}`).focus();
  };

  const handleInputChange = (event, index) => {
    const newValue = !isNaN(Number(event.target.value))
      ? Number(event.target.value)
      : Number(event.target.value.splice(-1));
    // console.log(newValue);
    const updatedDenominations = [...denominations];
    updatedDenominations[index].count = newValue;
    setDenominations(updatedDenominations);
  };

  const resetValues = () => {
    const resetDenominations = denominations.map((denomination) => ({
      ...denomination,
      count: "",
    }));
    setDenominations(resetDenominations);
  };

  const total = denominations.reduce((acc, denomination) => {
    if (denomination.count && denomination.value !== "extra") {
      return acc + denomination.value * parseInt(denomination.count, 10);
    }
    return acc;
  }, 0);

  const extraDenomination = denominations.find(
    (denomination) => denomination.value === "extra"
  );
  return (
    <div className="cash-counter">
      <h2>Cash Counter</h2>
      <br />
      <button className="reset" onClick={resetValues}>
        Reset
      </button>
      <label htmlFor="name">Name: </label>
      <input type="text" name="" />
      <div className="cashTable">
        <div>
          {denominations.map((denomination, index) => (
            <div key={index} className="rowCounter">
              <p>
                {denomination.value !== "extra" ? denomination.value : "Extra "}
                <Close />
              </p>
              <input
                type="text"
                value={denomination.count}
                id={`input-${index}`}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleInputChange(e, index)}
              />

              <p>
                {denomination.value !== "extra"
                  ? `${denomination.value * denomination.count}`
                  : denomination.count}
              </p>
            </div>
          ))}
          <div className="rowCounter">
            <p
              style={{ background: "red", textAlign: "center" }}
              onClick={resetValues}
            >
              Reset
            </p>

            <input type="text" value="Total" disabled />

            <p>
              {total +
                (extraDenomination ? Number(extraDenomination.count) : 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
