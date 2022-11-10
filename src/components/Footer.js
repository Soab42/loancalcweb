import { useState } from "react";
import Calculator from "../page/Calculator";
import CalculateIcon from "@mui/icons-material/Calculate";
import classes from "../styles/Daily.module.css";
export default function Footer() {
  const [show, SetShow] = useState(false);

  const calcshow = () => {
    !show ? SetShow(true) : SetShow(false);
    console.log(show);
  };
  return (
    <div
      className={classes.footer}
      style={{
        display: `${window.screen.width > 500 ? "flex" : "grid"}`,
      }}
    >
      <p>
        {window.screen.width > 500 ? "All right reserved" : null} &copy; soab
        mahmud
      </p>
      <p>
        for project contact Whatsapp @
        <a href="https://wa.me/1644556543">01644556543</a>
      </p>
      <div className={classes.calcicon} onClick={calcshow}>
        {<CalculateIcon fontSize="large" color="primary" />}
      </div>
      <div className={classes.calc} style={{ right: show ? -350 : 10 }}>
        <Calculator />
      </div>
    </div>
  );
}
