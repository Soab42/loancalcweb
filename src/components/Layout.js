import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import classes from "../styles/Layout.module.css";
// import useClick from "./navsm/useClick";
import Navsm from "./navsm/Navsm";
import { useAuth } from "../auth/AuthContext";

export default function Layout({ children }) {
  // const { Clicked } = useClick();
  const { currentUser } = useAuth();

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
