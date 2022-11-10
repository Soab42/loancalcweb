import React, { useState } from "react";

export default function Calculator() {
  const [data, setdata] = useState();
  const [result, setResult] = useState(0);
  const calculate = () => {
    setResult(eval(data));
  };
  const Reset = () => {
    setdata();
    setResult(0);
  };
  return (
    <div
      style={{
        height: 200,
        width: 300,
        alignSelf: "center",
        display: "grid",
        padding: ".5rem",
        backgroundColor: "rgba(255,255,255,.1)",
        boxShadow: "0px 2px 2px 1px rgba(0,0,0,.2)",
        backdropFilter: "blur(4px)",
        justifyContent: "center",
      }}
    >
      <div>
        <div
          style={{
            textAlign: "center",
            height: 40,
            display: "flex",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          Calculator
        </div>
        <input
          style={{
            height: 40,
            marginBottom: 10,
            borderRadius: 25,
            border: "none",
            fontWeight: "bold",
            boxShadow: "1px 2px 2px 2px rgba(0,0,0,.2)",
            backgroundColor: "transparent",
            outline: "none",
            textAlign: "center",
          }}
          placeholder={"9500*3+245-10/2"}
          onChange={(x) => setdata(x.target.value)}
          cursorColor="black"
          keyboardType="numeric"
          value={data}
        />
        <input
          style={{
            height: 40,
            borderRadius: 25,
            marginBottom: 10,
            textShadow: "1.4px -.1px 1px rgba(0,0,0,1)",
            border: "none",
            textAlign: "center",
            backgroundColor: "rgba(4,165,250,1)",
            fontWeight: "bold",
            boxShadow: "0px 2px 2px 1px rgba(0,0,0,.2)",

            fontSize: "large",
            color: "rgba(250,255,255,1)",
          }}
          disabled
          value={result.toLocaleString("en-IN")}
        ></input>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={calculate}
            style={{
              height: 40,
              border: "none",
              borderRadius: 25,
              boxShadow: "0px 2px 2px 1px rgba(0,0,0,.2)",
              width: 150,
              backgroundColor: "rgba(15,255,100,1)",
              textAlign: "center",
            }}
          >
            Calculate
          </button>
          <button
            onClick={Reset}
            style={{
              height: 40,
              boxShadow: "0px 2px 2px 1px rgba(0,0,0,.2)",
              borderRadius: 25,
              border: "none",
              backgroundColor: "tomato",
              width: 150,
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
