import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import SendIcon from "./icons/SendIcon";
// import EmojiIcon from "./icons/EmojiIcon";
// import FileIcons from "./icons/FileIcon";
import closeIcon from "../assets/close-icon.svg";
import genericFileIcon from "../assets/file.svg";
import _ from "lodash";
import { whattocallAction } from "./stateManagement/actions/conversationFlowUpdate";

class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      inputActive: false,
      file: null,
    };
  }

  handleKey = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event);
    }
  };

  handleKeyPress = _.debounce(
    () => {
      this.props.onKeyPress(this.userInput.textContent);
    },
    300,
    { trailing: true }
  );

  _submitText(event) {
    event.preventDefault();
    const text = this.userInput.textContent;
    const file = this.state.file;
    if (file) {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: "me",
          type: "file",
          data: { text, file },
        });
        this.setState({ file: null });
        this.userInput.innerHTML = "";
      } else {
        this.props.onSubmit({
          author: "me",
          type: "file",
          data: { file },
        });
        this.setState({ file: null });
      }
    } else {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: "me",
          type: "text",
          data: { text },
          whattodo: "callapi",
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
      data: { emoji },
    });
  }

  _handleFileSubmit(file) {
    this.setState({ file });
  }

  render() {
    const { contentEditable } = this.props;

    return (
      <div>
        {this.state.file && (
          <div className="file-container">
            <span className="icon-file-message">
              <img src={genericFileIcon} alt="genericFileIcon" height={15} />
            </span>
            {this.state.file && this.state.file.name}
            <span
              className="delete-file-message"
              onClick={() => this.setState({ file: null })}
            >
              <img
                src={closeIcon}
                alt="close icon"
                height={10}
                title="Remove the file"
              />
            </span>
          </div>
        )}
        <form
          className={`sc-user-input ${this.state.inputActive ? "active" : ""}`}
        >
          {this.props.whattocall === "terminology" && <div>I am confused about the term: </div>}
          <div
            role="button"
            tabIndex="0"
            onFocus={() => {
              this.setState({ inputActive: true });
            }}
            onBlur={() => {
              this.setState({ inputActive: false });
            }}
            ref={(e) => {
              this.userInput = e;
            }}
            onKeyDown={this.handleKey}
            onKeyPress={this.handleKeyPress}
            contentEditable={contentEditable ? true : false}
            placeholder="Write a reply..."
            className="sc-user-input--text"
          ></div>
          <div className="sc-user-input--buttons">
            {/* <div className="sc-user-input--button">
              {this.props.showEmoji && (
                <EmojiIcon onEmojiPicked={this._handleEmojiPicked.bind(this)} />
              )}
            </div> */}
            {/* {this.props.showFile && (
              <div className="sc-user-input--button">
                <FileIcons onChange={(file) => this._handleFileSubmit(file)} />
              </div>
            )} */}
            <div className="sc-user-input--button">
              <SendIcon onClick={this._submitText.bind(this)} />
            </div>
          </div>
        </form>
        <div className="powered-by">
          <p>
            Chat by <span>iWealth</span>
          </p>
        </div>
      </div>
    );
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func,
};

UserInput.defaultProps = {
  showEmoji: true,
  showFile: true,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  whattocallAction: (data) => dispatch(whattocallAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
