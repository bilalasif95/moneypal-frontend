import React, { Component } from "react";
import Message from "./Messages";
import { connect } from "react-redux";
import { continuewithConverstaion, contentEditableAction, whattocallAction, knowMoreAction, askQuestionAction, answerSatisfactionAction } from "./stateManagement/actions/conversationFlowUpdate";
import {
  startFetchingAction,
  stopFetchingAction,
} from "./stateManagement/actions/fetchingAction";
import chatIconUrl from "../assets/chat-bot.svg";

class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      lastMessage: "",
    };
  }

  yes = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Yes" },
    });
    this.props.startFetching();
    this.props.contentEditableAction(true);
    this.props.continuewithConverstaion(true);
    setTimeout(() => {
      this.props.stopFetching()
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "Great! First let us have your good name." },
      });
    }, 1000)
    this.props.whattocallAction("name");
  };

  no = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "No" },
    });
    this.props.startFetching();
    this.props.contentEditableAction(false);
    this.props.continuewithConverstaion(true);
    setTimeout(() => {
      this.props.stopFetching()
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "Oh! Okay. We wish you a nice day." },
      })
    }, 1000)
  };

  terminology = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Terminology" },
    });
    this.props.askQuestionAction(false);
    this.props.knowMoreAction(false);
    this.props.contentEditableAction(true);
    this.props.whattocallAction("terminology");
  };

  question = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Question" },
    });
    this.props.askQuestionAction(false);
    this.props.contentEditableAction(true);
    this.props.knowMoreAction(false);
    this.props.whattocallAction("question");
  };

  answerSatisfactionYes = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Yes" },
    });
    this.props.startFetching();
    this.props.contentEditableAction(false);
    this.props.answerSatisfactionAction(false);
    this.props.continuewithConverstaion(true);
    setTimeout(() => {
      this.props.stopFetching()
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "Very well. Would you like to know more?" },
      });
    }, 1000)
    this.props.knowMoreAction(true);
  };

  answerSatisfactionNo = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "No" },
    });
    this.props.startFetching();
    this.props.contentEditableAction(false);
    this.props.knowMoreAction(false);
    this.props.answerSatisfactionAction(false);
    setTimeout(() => {
      this.props.stopFetching()
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "Oh! Okay. We wish you a nice day." },
      });
    }, 1000)
  };

  knowMoreYes = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Yes" },
    });
    this.props.startFetching();
    this.props.contentEditableAction(false);
    this.props.answerSatisfactionAction(false);
    setTimeout(() => {
      this.props.stopFetching()
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "What are you interested in exploring?" },
      });
    }, 1000)
    this.props.askQuestionAction(true);
  };

  knowMoreNo = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "No" },
    });
    this.props.startFetching();
    this.props.knowMoreAction(false);
    this.props.contentEditableAction(false);
    this.props.answerSatisfactionAction(false);
    this.props.continuewithConverstaion(true);
    setTimeout(() => {
      this.props.stopFetching()
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "Oh! Okay. We wish you a nice day." },
      });
    }, 1000)
  };

  returningConversationFlow() {
    const { conversationContinue, askQuestionType, answerSatisfaction, knowMore } = this.props;

    if (!conversationContinue) {
      return (
        <div className="yesno-btn">
          <button onClick={this.yes}>YES</button>
          <button onClick={this.no}>NO</button>
        </div>
      );
    }
    if (askQuestionType) {
      return (
        <div className="yesno-btn">
          <button onClick={this.terminology}>TERMINOLOGY</button>
          <button onClick={this.question}>QUESTION</button>
        </div>
      );
    }
    if (answerSatisfaction) {
      return (
        <div className="yesno-btn">
          <button onClick={this.answerSatisfactionYes}>YES</button>
          <button onClick={this.answerSatisfactionNo}>NO</button>
        </div>
      );
    }
    if (knowMore) {
      return (
        <div className="yesno-btn">
          <button onClick={this.knowMoreYes}>YES</button>
          <button onClick={this.knowMoreNo}>NO</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="sc-message-list">
        <div
          className="sc-message-scroller"
          ref={(el) => (this.scrollList = el)}
        >
          {this.props.messages.map((message, i) => {
            return (
              <Message
                message={message}
                key={i}
                onDelete={this.props.onDelete}
              />
            );
          })}
          {this.props.fetchingMessage &&
            <div className="sc-message">
              {/* <div className={contentClassList.join(" ")}> */}
              {/* {this.props.message.author === "me" ? ( */}
              <div
                className="sc-message--avatar"
                style={{
                  backgroundImage: `url(${chatIconUrl})`,
                }}
              ></div>
              {/* ) : ( */}
              {/* <div
                 className="sc-message--avatar"
                 style={{
                   backgroundImage: `url(${chatIconUrl})`,
                 }}
               ></div>
             )} */}
              <p className="typing">Typing...</p>
            </div>
            //  </div>

          }
          {this.returningConversationFlow()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingMessage: state.fetchingMessage,
  conversationContinue: state.conversationContinue,
  askQuestionType: state.askQuestionType,
  answerSatisfaction: state.answerSatisfaction,
  knowMore: state.knowMore,
});

const mapDispatchToProps = (dispatch) => ({
  startFetching: () => dispatch(startFetchingAction),
  stopFetching: () => dispatch(stopFetchingAction),
  continuewithConverstaion: (data) => dispatch(continuewithConverstaion(data)),
  whattocallAction: (data) => dispatch(whattocallAction(data)),
  contentEditableAction: (data) => dispatch(contentEditableAction(data)),
  askQuestionAction: (data) => dispatch(askQuestionAction(data)),
  knowMoreAction: (data) => dispatch(knowMoreAction(data)),
  answerSatisfactionAction: (data) => dispatch(answerSatisfactionAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
