function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import SendIcon from "./icons/SendIcon"; // import EmojiIcon from "./icons/EmojiIcon";
// import FileIcons from "./icons/FileIcon";

import closeIcon from "../assets/close-icon.svg";
import genericFileIcon from "../assets/file.svg";
import _ from "lodash";
import { whattocallAction } from "./stateManagement/actions/conversationFlowUpdate";

class UserInput extends Component {
  constructor() {
    super();

    _defineProperty(this, "handleKey", event => {
      if (event.keyCode === 13 && !event.shiftKey) {
        this._submitText(event);
      }
    });

    _defineProperty(this, "handleKeyPress", _.debounce(() => {
      this.props.onKeyPress(this.userInput.textContent);
    }, 300, {
      trailing: true
    }));

    this.state = {
      inputActive: false,
      file: null
    };
  }

  _submitText(event) {
    event.preventDefault();
    const text = this.userInput.textContent;
    const file = this.state.file;

    if (file) {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: "me",
          type: "file",
          data: {
            text,
            file
          }
        });
        this.setState({
          file: null
        });
        this.userInput.innerHTML = "";
      } else {
        this.props.onSubmit({
          author: "me",
          type: "file",
          data: {
            file
          }
        });
        this.setState({
          file: null
        });
      }
    } else {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: "me",
          type: "text",
          data: {
            text
          },
          whattodo: "callapi"
        });
        this.userInput.innerHTML = "";
        this.props.whattocallAction("");
      }
    }
  }

  _handleEmojiPicked(emoji) {
    this.props.onSubmit({
      author: "me",
      type: "emoji",
      data: {
        emoji
      }
    });
  }

  _handleFileSubmit(file) {
    this.setState({
      file
    });
  }

  render() {
    const {
      contentEditable
    } = this.props;
    return /*#__PURE__*/React.createElement("div", null, this.state.file && /*#__PURE__*/React.createElement("div", {
      className: "file-container"
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon-file-message"
    }, /*#__PURE__*/React.createElement("img", {
      src: genericFileIcon,
      alt: "genericFileIcon",
      height: 15
    })), this.state.file && this.state.file.name, /*#__PURE__*/React.createElement("span", {
      className: "delete-file-message",
      onClick: () => this.setState({
        file: null
      })
    }, /*#__PURE__*/React.createElement("img", {
      src: closeIcon,
      alt: "close icon",
      height: 10,
      title: "Remove the file"
    }))), /*#__PURE__*/React.createElement("form", {
      className: `sc-user-input ${this.state.inputActive ? "active" : ""}`
    }, this.props.whattocall === "terminology" && /*#__PURE__*/React.createElement("div", null, "I am confused about the term: "), /*#__PURE__*/React.createElement("div", {
      role: "button",
      tabIndex: "0",
      onFocus: () => {
        this.setState({
          inputActive: true
        });
      },
      onBlur: () => {
        this.setState({
          inputActive: false
        });
      },
      ref: e => {
        this.userInput = e;
      },
      onKeyDown: this.handleKey,
      onKeyPress: this.handleKeyPress,
      contentEditable: contentEditable ? true : false,
      placeholder: "Write a reply...",
      className: "sc-user-input--text"
    }), /*#__PURE__*/React.createElement("div", {
      className: "sc-user-input--buttons"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sc-user-input--button"
    }, /*#__PURE__*/React.createElement(SendIcon, {
      onClick: this._submitText.bind(this)
    })))), /*#__PURE__*/React.createElement("div", {
      className: "powered-by"
    }, /*#__PURE__*/React.createElement("p", null, "Chat by ", /*#__PURE__*/React.createElement("span", null, "iWealth"))));
  }

}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func
};
UserInput.defaultProps = {
  showEmoji: true,
  showFile: true
};

const mapStateToProps = state => ({ ...state
});

const mapDispatchToProps = dispatch => ({
  whattocallAction: data => dispatch(whattocallAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);