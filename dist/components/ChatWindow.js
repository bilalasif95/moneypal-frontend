function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import Header from "./Header";

class ChatWindow extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onUserInputSubmit", message => {
      this.props.onUserInputSubmit(message);
    });
  }

  onMessageReceived(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  render() {
    let messageList = this.props.messageList || [];
    let classList = [// "chat-box-container",
    "sc-chat-window", this.props.isOpen ? "opened" : "closed"];
    return /*#__PURE__*/React.createElement("div", {
      className: classList.join(" ")
    }, /*#__PURE__*/React.createElement(Header // teamName={this.props.agentProfile.teamName}
    // imageUrl={this.props.agentProfile.imageUrl}
    // onClose={this.props.onClose}
    , null), /*#__PURE__*/React.createElement("div", {
      className: "message-input"
    }, /*#__PURE__*/React.createElement(MessageList, {
      messages: messageList,
      imageUrl: this.props.agentProfile.imageUrl,
      onDelete: this.props.onDelete,
      onSubmit: this.onUserInputSubmit
    }), /*#__PURE__*/React.createElement(UserInput, {
      showEmoji: this.props.showEmoji,
      onSubmit: this.onUserInputSubmit,
      showFile: this.props.showFile,
      onKeyPress: this.props.onKeyPress
    })));
  }

}

ChatWindow.propTypes = {
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func
};
export default ChatWindow;