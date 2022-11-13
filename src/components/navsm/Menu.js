import React from "react";
import { Link } from "react-router-dom";
export default function Menu(props) {
  return (
    <div className="menu" {...props}>
      <Link className="link" to="/" end>
        Daily
      </Link>
      <Link className="link" to="/dailyold">
        Daily Old
      </Link>
      <Link className="link" to="/new">
        New Calculation
      </Link>
      <Link className="link" to="/old">
        Old Calculation
      </Link>
      <Link className="link" to="/contact">
        Others
      </Link>
    </div>
  );
}
