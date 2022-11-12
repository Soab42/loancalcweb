import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import classes from "../styles/Layout.module.css";
export default function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <nav className={classes.navbar}>
        <Nav />
      </nav>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
}
