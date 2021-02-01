import React, { Component } from "react";
import TextMessage from "./TextMessage";
import EmojiMessage from "./EmojiMessage";
import FileMessage from "./FileMessage";
import chatIconUrl from "./../../assets/chat-bot.svg";
import userIconUrl from "./../../assets/user-icon.svg";

class Message extends Component {
  _renderMessageOfType(type) {
    switch (type) {
      case "text":
        return /*#__PURE__*/React.createElement(TextMessage, {
          message: this.props.message,
          onDelete: this.props.onDelete
        });

      case "emoji":
        return /*#__PURE__*/React.createElement(EmojiMessage, this.props.message);

      case "file":
        return /*#__PURE__*/React.createElement(FileMessage, {
          onDelete: this.props.onDelete,
          message: this.props.message
        });
    }
  }

  render() {
    let contentClassList = ["sc-message--content", this.props.message.author === "me" ? "sent" : "received"];
    return /*#__PURE__*/React.createElement("div", {
      className: "sc-message"
    }, /*#__PURE__*/React.createElement("div", {
      className: contentClassList.join(" ")
    }, this.props.message.author === "me" ? /*#__PURE__*/React.createElement("div", {
      className: "sc-message--avatar",
      style: {
        backgroundImage: `url(${userIconUrl})`
      }
    }) : /*#__PURE__*/React.createElement("div", {
      className: "sc-message--avatar",
      style: {
        backgroundImage: `url(${chatIconUrl})`
      }
    }), this._renderMessageOfType(this.props.message.type)));
  }

}

export default Message;