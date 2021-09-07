import React, { Component } from 'react';
import logo from "../assets/logo.png";
// import search from "../assets/search.svg";
import {
  Link
} from "react-router-dom";
import Idea from "../assets/idea.svg"


class Header extends Component {

  render() {
    return (
      <div className="sc-header">
        <div className="header-main">
          <div>
          <Link to="/"><img src={logo} /></Link>
          </div>
          <div className="Help-sec">
          <div className="help-cont">
              <img src={Idea} />
              <div className="help-message">
                  Help
              </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;
