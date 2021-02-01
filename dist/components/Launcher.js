import PropTypes from "prop-types";
import React, { Component } from "react";
import API from "../utils/API";
import ChatWindow from "./ChatWindow";
import launcherIcon from "./../assets/chat-icon.svg";
import launcherIconActive from "./../assets/close-icon.svg";

class Launcher extends Component {
  constructor() {
    super();
    this.state = {
      launcherIcon,
      isOpen: false
    };
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty("isOpen") ? this.props.isOpen : this.state.isOpen;
    const classList = ["sc-launcher", isOpen ? "opened" : ""];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: classList.join(" "),
      onClick: this.handleClick.bind(this)
    }, /*#__PURE__*/React.createElement(MessageCount, {
      count: this.props.newMessagesCount,
      isOpen: isOpen
    }), /*#__PURE__*/React.createElement("img", {
      className: "sc-open-icon",
      src: launcherIconActive
    }), /*#__PURE__*/React.createElement("img", {
      className: "sc-closed-icon",
      src: launcherIcon
    })), /*#__PURE__*/React.createElement(ChatWindow, {
      messageList: this.props.messageList,
      onUserInputSubmit: this.props.onMessageWasSent,
      agentProfile: this.props.agentProfile,
      isOpen: isOpen,
      onClose: this.handleClick.bind(this),
      showEmoji: this.props.showEmoji,
      showFile: this.props.showFile,
      onKeyPress: this.props.onKeyPress,
      onKeyPressDebounce: this.props.onKeyPressDebounce,
      onDelete: this.props.onDelete
    }));
  }

}

const MessageCount = props => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "sc-new-messsages-count"
  }, props.count);
};

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onDelete: PropTypes.func
};
Launcher.defaultProps = {
  newMessagesCount: 0
};
export default Launcher;