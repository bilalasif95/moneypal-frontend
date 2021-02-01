import React, { Component } from 'react';
import closeIcon from './../assets/close-icon.png';
import handIcon from './../assets/hand-icon.svg';

class Header extends Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "sc-header"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hi there ", /*#__PURE__*/React.createElement("img", {
      src: handIcon
    })), /*#__PURE__*/React.createElement("p", null, "Good to see you here.")));
  }

}

export default Header;