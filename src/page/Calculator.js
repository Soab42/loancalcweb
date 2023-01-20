/* eslint-disable no-eval */
import { ArrowRightAlt } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import * as math from "mathjs";
import { useEffect } from "react";
export default function Calculator() {
  const [data, setData] = useState(0);
  const [result, setResult] = useState(0);
  const dataref = useRef(null);
  const Reset = () => {
    setData(0);
    setResult(0);
  };
  useEffect(() => {
    const ref = dataref.current;
    ref.focus();

    return () => ref.blur();
  }, [data]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "=") {
        setResult(math.evaluate(data));
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [data]);
  return (
    <div
      style={{
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
            height: 10,
            display: "flex",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bolder",
          }}
        >
          Calculator
        </div>
        {/* <p
          style={{
            height: 20,
            marginBottom: 10,
            borderRadius: 25,
            border: "none",
            fontWeight: "bold",
            boxShadow: "1px 2px 2px 2px rgba(0,0,0,.2)",
            backgroundColor: "transparent",
            outline: "none",
            textAlign: "center",
          }}
        >
          {data}
        </p> */}
        <div
          style={{
            height: 50,
            width: 300,
            textShadow: "1.4px -.1px 1px rgba(0,0,0,1)",
            textAlign: "right",
            backgroundColor: "rgba(10, 100, 100, .5)",
            // border: "2px solid black",
            // borderTopLeftRadius: "10px",
            // borderTopRightRadius: "10px",
            padding: ".41rem",
            fontWeight: "bold",
            boxShadow: "0px 2px 2px 1px rgba(0,10,0,.5)",
            fontSize: "large",
            color: "rgba(250,255,255,1)",
          }}
        >
          <input
            type="nummber"
            ref={dataref}
            value={data || 0}
            onChange={(x) => {
              data !== 0 ? setData(x.target.value) : setData(x.target.value);
            }}
            className="calcinpt"
          />

          <p style={{ color: "lightgreen", fontSize: 25 }}>
            {result % 1 !== 0 ? result.toFixed(2) : result}
          </p>
        </div>
        <div className="calc">
          <div className="calcrow">
            <p className="calcbtn" onClick={Reset}>
              ac
            </p>
            <p
              className="calcbtn"
              onClick={() => setData(data.toString().slice(0, -1))}
            >
              <ArrowRightAlt />
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "%") : setData(0))}
            >
              %
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "/") : setData(0))}
            >
              ÷
            </p>
          </div>
          <div className="calcrow">
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "7") : setData("7"))}
            >
              7
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "8") : setData(8))}
            >
              8
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "9") : setData("9"))}
            >
              9
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "*") : setData(0))}
            >
              *
            </p>
          </div>
          <div className="calcrow">
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "4") : setData(4))}
            >
              4
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "5") : setData("5"))}
            >
              5
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "6") : setData("6"))}
            >
              6
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "-") : setData(0))}
            >
              -
            </p>
          </div>
          <div className="calcrow">
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "1") : setData(1))}
            >
              1
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "2") : setData(2))}
            >
              2
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "3") : setData(3))}
            >
              3
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "+") : setData(0))}
            >
              +
            </p>
          </div>
          <div className="calcrow">
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "0") : setData(0))}
            >
              0
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + "00") : setData("0"))}
            >
              00
            </p>
            <p
              className="calcbtn"
              onClick={() => (data !== 0 ? setData(data + ".") : setData("."))}
            >
              .
            </p>
            <p
              className="calcbtn"
              onClick={() => setResult(math.evaluate(data))}
            >
              =
            </p>
          </div>
        </div>

        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <button
            onClick={calculate}
            onMouseOver
            style={{
              height: 40,
              border: "none",
              borderRadius: 25,
              boxShadow: "0px 2px 2px 1px rgba(0,0,0,.2)",
              width: 150,
              backgroundColor: "rgba(15,255,100,1)",
              textAlign: "center",
              translate: 0,
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
          </button> */}
        </div>
      </div>
    </div>
  );
}
