import React, { Component } from 'react';
import logo from "../assets/logo.png";
// import search from "../assets/search.svg";
import {
  Link
} from "react-router-dom";


class Header extends Component {

  render() {
    return (
      <div className="sc-header">
        <div className="header-main">
          <div>
          <Link to="/"><img src={logo} /></Link>
          </div>
          <div>
          {/* <Link to="/"><img src={search} /></Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
