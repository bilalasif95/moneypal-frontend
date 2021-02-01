function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Message from "./Messages";
import { connect } from "react-redux";
import { continuewithConverstaion, contentEditableAction, whattocallAction, knowMoreAction, askQuestionAction, answerSatisfactionAction } from "./stateManagement/actions/conversationFlowUpdate";
import { startFetchingAction, stopFetchingAction } from "./stateManagement/actions/fetchingAction";

class MessageList extends Component {
  constructor() {
    super();

    _defineProperty(this, "yes", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "Yes"
        }
      });
      this.props.startFetching();
      this.props.contentEditableAction(true);
      this.props.continuewithConverstaion(true);
      setTimeout(() => {
        this.props.stopFetching();
        this.props.onSubmit({
          type: "text",
          author: "them",
          data: {
            text: "Great! First let us have your good name."
          }
        });
      }, 1000);
      this.props.whattocallAction("name");
    });

    _defineProperty(this, "no", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "No"
        }
      });
      this.props.startFetching();
      this.props.contentEditableAction(false);
      this.props.continuewithConverstaion(true);
      setTimeout(() => {
        this.props.stopFetching();
        this.props.onSubmit({
          type: "text",
          author: "them",
          data: {
            text: "Oh! Okay. We wish you a nice day."
          }
        });
      }, 1000);
    });

    _defineProperty(this, "terminology", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "Terminology"
        }
      });
      this.props.askQuestionAction(false);
      this.props.knowMoreAction(false);
      this.props.contentEditableAction(true);
      this.props.whattocallAction("terminology");
    });

    _defineProperty(this, "question", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "Question"
        }
      });
      this.props.askQuestionAction(false);
      this.props.contentEditableAction(true);
      this.props.knowMoreAction(false);
      this.props.whattocallAction("question");
    });

    _defineProperty(this, "answerSatisfactionYes", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "Yes"
        }
      });
      this.props.startFetching();
      this.props.contentEditableAction(false);
      this.props.answerSatisfactionAction(false);
      this.props.continuewithConverstaion(true);
      setTimeout(() => {
        this.props.stopFetching();
        this.props.onSubmit({
          type: "text",
          author: "them",
          data: {
            text: "Very well. Would you like to know more?"
          }
        });
      }, 1000);
      this.props.knowMoreAction(true);
    });

    _defineProperty(this, "answerSatisfactionNo", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "No"
        }
      });
      this.props.startFetching();
      this.props.contentEditableAction(false);
      this.props.knowMoreAction(false);
      this.props.answerSatisfactionAction(false);
      setTimeout(() => {
        this.props.stopFetching();
        this.props.onSubmit({
          type: "text",
          author: "them",
          data: {
            text: "Oh! Okay. We wish you a nice day."
          }
        });
      }, 1000);
    });

    _defineProperty(this, "knowMoreYes", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "Yes"
        }
      });
      this.props.startFetching();
      this.props.contentEditableAction(false);
      this.props.answerSatisfactionAction(false);
      setTimeout(() => {
        this.props.stopFetching();
        this.props.onSubmit({
          type: "text",
          author: "them",
          data: {
            text: "What are you interested in exploring?"
          }
        });
      }, 1000);
      this.props.askQuestionAction(true);
    });

    _defineProperty(this, "knowMoreNo", () => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: {
          text: "No"
        }
      });
      this.props.startFetching();
      this.props.knowMoreAction(false);
      this.props.contentEditableAction(false);
      this.props.answerSatisfactionAction(false);
      this.props.continuewithConverstaion(true);
      setTimeout(() => {
        this.props.stopFetching();
        this.props.onSubmit({
          type: "text",
          author: "them",
          data: {
            text: "Oh! Okay. We wish you a nice day."
          }
        });
      }, 1000);
    });

    this.state = {
      lastMessage: ""
    };
  }

  returningConversationFlow() {
    const {
      conversationContinue,
      askQuestionType,
      answerSatisfaction,
      knowMore
    } = this.props;

    if (!conversationContinue) {
      return /*#__PURE__*/React.createElement("div", {
        className: "yesno-btn"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.yes
      }, "YES"), /*#__PURE__*/React.createElement("button", {
        onClick: this.no
      }, "NO"));
    }

    if (askQuestionType) {
      return /*#__PURE__*/React.createElement("div", {
        className: "yesno-btn"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.terminology
      }, "TERMINOLOGY"), /*#__PURE__*/React.createElement("button", {
        onClick: this.question
      }, "QUESTION"));
    }

    if (answerSatisfaction) {
      return /*#__PURE__*/React.createElement("div", {
        className: "yesno-btn"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.answerSatisfactionYes
      }, "YES"), /*#__PURE__*/React.createElement("button", {
        onClick: this.answerSatisfactionNo
      }, "NO"));
    }

    if (knowMore) {
      return /*#__PURE__*/React.createElement("div", {
        className: "yesno-btn"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.knowMoreYes
      }, "YES"), /*#__PURE__*/React.createElement("button", {
        onClick: this.knowMoreNo
      }, "NO"));
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "sc-message-list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sc-message-scroller",
      ref: el => this.scrollList = el
    }, this.props.messages.map((message, i) => {
      return /*#__PURE__*/React.createElement(Message, {
        message: message,
        key: i,
        onDelete: this.props.onDelete
      });
    }), this.props.fetchingMessage && /*#__PURE__*/React.createElement("p", null, "Typing..."), this.returningConversationFlow()));
  }

}

const mapStateToProps = state => ({
  fetchingMessage: state.fetchingMessage,
  conversationContinue: state.conversationContinue,
  askQuestionType: state.askQuestionType,
  answerSatisfaction: state.answerSatisfaction,
  knowMore: state.knowMore
});

const mapDispatchToProps = dispatch => ({
  startFetching: () => dispatch(startFetchingAction),
  stopFetching: () => dispatch(stopFetchingAction),
  continuewithConverstaion: data => dispatch(continuewithConverstaion(data)),
  whattocallAction: data => dispatch(whattocallAction(data)),
  contentEditableAction: data => dispatch(contentEditableAction(data)),
  askQuestionAction: data => dispatch(askQuestionAction(data)),
  knowMoreAction: data => dispatch(knowMoreAction(data)),
  answerSatisfactionAction: data => dispatch(answerSatisfactionAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);