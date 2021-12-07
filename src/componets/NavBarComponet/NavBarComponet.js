import React from "react";
import { Link } from "react-router-dom";
import Mainlogo from "../../img/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
const NavBarComponet = () => {
  return (
    <div className="nav-main">
      <div id="baner">
        <div id="logo">
          <Link to="/">
            <img id="logoimg" src={Mainlogo} />
          </Link>
        </div>
        <div id="search">
          <div id="wyszukaj">
            <AiOutlineSearch className="search-icon" style={{ height: "47px", fontSize: "1.6em" }} />
          </div>
          <input type="text" id="wpisz" placeholder="search" />
        </div>
        <div id="kosz"></div>
        <div id="konto">Sing in</div>
      </div>
      <div id="filtr"></div>
    </div>
  );
};
export default NavBarComponet;
