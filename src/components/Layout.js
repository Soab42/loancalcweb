import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import classes from "../styles/Layout.module.css";
import Navsm from "./navsm/Navsm";
export default function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <nav className={classes.navbar}>
        {window.screen.width > 500 ? <Nav /> : <Navsm />}
      </nav>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
}
