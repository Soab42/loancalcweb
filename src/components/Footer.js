import Modal from "react-modal";
import React from "react";
import Calculator from "../page/Calculator";

import CalculateIcon from "@mui/icons-material/CalculateSharp";
import CloseIcon from "@mui/icons-material/Cancel";
import classes from "../styles/Daily.module.css";
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
      <div className={classes.calcicon} onClick={openModal}>
        {<CalculateIcon fontSize="large" color="primary" />}
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
