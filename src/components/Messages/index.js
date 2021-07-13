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
        return (
          <TextMessage
            message={this.props.message}
            onDelete={this.props.onDelete}
          />
        );
      case "emoji":
        return <EmojiMessage {...this.props.message} />;
      case "file":
        return (
          <FileMessage
            onDelete={this.props.onDelete}
            message={this.props.message}
          />
        );
    }
  }

  render() {
    let contentClassList = [
      "sc-message--content",
      this.props.message.author === "me" ? "sent" : "received",
    ];
    const buttons = this.props.message.data.buttons || []
    return (
      <div>
        {buttons.length > 0 ?
          <div className="cat-btnDisabled">
            {buttons && buttons.map((res) => <button key={res.title} className="nthBtn" disabled>{res.title}</button>)}
          </div>
          :
          <div className="sc-message">
            <div className={contentClassList.join(" ")}>
              {this.props.message.author === "me" ? (
                <div
                  className="sc-message--avatar"
                  style={{
                    backgroundImage: `url(${userIconUrl})`,
                  }}
                ></div>
              ) : (
                <div
                  className="sc-message--avatar"
                  style={{
                    backgroundImage: `url(${chatIconUrl})`,
                  }}
                ></div>
              )}
              {this._renderMessageOfType(this.props.message.type)}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Message;
