import React, { Component } from 'react';
import sendIcon from './../../assets/send-icon.svg';

class SendIcon extends Component {
  render() {
    return /*#__PURE__*/React.createElement("button", {
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      onClick: e => {
        e.preventDefault();
        this.props.onClick(e);
      },
      className: "sc-user-input--send-icon-wrapper"
    }, /*#__PURE__*/React.createElement("img", {
      src: sendIcon,
      alt: "Send"
    }));
  }

}

export default SendIcon;