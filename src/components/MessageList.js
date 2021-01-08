import React, { Component } from "react";
import Message from "./Messages";
import { connect } from "react-redux";
import {
  startFetchingAction,
  stopFetchingAction,
} from "../stateManagement/actions/fetchingAction";
import { continuewithConverstaion } from "../stateManagement/actions/conversationFlowUpdate";

class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      lastMessage: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
    if (prevProps.messages.length !== this.props.messages.length) {
      if (
        this.props.messages[this.props.messages.length - 1].data.text ===
        "Great let us have your good name"
      ) {
      }
    }
  }

  yes = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Yes" },
    });
    this.props.continuewithConverstaion();
    setTimeout(() => {
      this.props.onSubmit({
        type: "text",
        author: "them",
        data: { text: "Great let us have your good name" },
      });
    }, 1000);
  };

  no = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "No" },
    });
    this.setState({
      continue: true,
    });
  };

  returningConversationFlow() {
    const { conversationContinue, conversationNameGet } = this.props;

    if (!conversationContinue) {
      return (
        <div className="yesno-btn">
          <button onClick={this.yes}>Yes</button>
          <button onClick={this.no}>No</button>
        </div>
      );
    }
    if (conversationContinue && !conversationNameGet) {
      return <div></div>;
      // return (
      //   <div className="yesno-btn">
      //     <button onClick={this.yes}>Yes</button>
      //     <button onClick={this.no}>No</button>
      //   </div>
      // );
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
          {this.props.fetchingMessage && <p>Typing...</p>}
          {this.returningConversationFlow()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingMessage: state.fetchingMessage,
  conversationContinue: state.conversationContinue,
  conversationNameGet: state.conversationNameGet,
  conversationEmailGet: state.conversationEmailGet,
  selectedQueryType: state.selectedQueryType,
});

const mapDispatchToProps = (dispatch) => ({
  continuewithConverstaion: () => dispatch(continuewithConverstaion),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
