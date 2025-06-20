import PropTypes from "prop-types";
import React, { Component } from "react";
import API from "../utils/API";
import ChatWindow from "./ChatWindow";
import launcherIcon from "./../assets/chatIcon.png";
import launcherIconActive from "./../assets/closeIcon.png";

class Launcher extends Component {
  constructor() {
    super();
    this.state = {
      launcherIcon,
      isOpen: true,
    };
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty("isOpen")
      ? this.props.isOpen
      : this.state.isOpen;
    const classList = ["sc-launcher", isOpen ? "opened" : ""];
    return (
      <div>
        <div
          className={classList.join(" ")}
          onClick={this.handleClick.bind(this)}
        >
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={"sc-open-icon"} src={launcherIconActive} />
          <img className={"sc-closed-icon"} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
          showFile={this.props.showFile}
          onKeyPress={this.props.onKeyPress}
          onKeyPressDebounce={this.props.onKeyPressDebounce}
          onDelete={this.props.onDelete}
        />
      </div>
    );
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className={"sc-new-messsages-count"}>{props.count}</div>;
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
  onDelete: PropTypes.func,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
};

export default Launcher;
