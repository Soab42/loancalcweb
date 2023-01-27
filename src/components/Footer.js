/* eslint-disable react/jsx-no-target-blank */
import Modal from "react-modal";
import React from "react";
import Calculator from "../page/Calculator";

import CalculateIcon from "@mui/icons-material/CalculateSharp";
import CloseIcon from "@mui/icons-material/Cancel";
import classes from "../styles/Layout.module.css";
import { Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
export default function Footer() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div
      className={classes.footercontent}
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyItems: "start",
      //   paddingBottom: "5px",
      // }}
    >
      <a
        href="https://www.linkedin.com/in/soab-mahmud-4a202787/"
        target={"_blank"}
        rel="noreferrer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#0072b1" }}>
          <LinkedIn />
        </p>
        <p>Soab Mahmud</p>
      </a>

      <a
        href="https://www.facebook.com/syfuddhin/"
        target={"_blank"}
        rel="noreferrer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#4267B2" }}>
          <Facebook />
        </p>
        <p>Soab Mahmud</p>
      </a>

      <a
        href="https://wa.me/1644556543"
        target={"_blank"}
        rel="noreferrer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#075e54" }}>
          <WhatsApp />
        </p>
        <p>+8801644556543</p>
      </a>

      <div className={classes.calcicon} onClick={openModal}>
        {<CalculateIcon fontSize="large" color="success" />}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            zIndex: 2,
            right: "0",
            top: 0,
          }}
        >
          {<CloseIcon fontSize="small" color="dark" />}
        </div>
        <div className={classes.calc}>
          <Calculator />
        </div>
      </Modal>
    </div>
  );
}
const customStyles = {
  overlay: { backgroundColor: "rgba(0, 0, 0, .2)" },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transition: "1s",
    marginRight: "-50%",
    backgroundColor: "transparent",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  },
};
