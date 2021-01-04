import React, { Component } from "react";
import Message from "./Messages";
import { connect } from "react-redux";
import {
  startFetchingAction,
  stopFetchingAction,
} from "../stateManagement/actions/fetchingAction";

class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      continue: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  yes = () => {
    this.props.onSubmit({
      type: "text",
      author: "me",
      data: { text: "Yes" },
    });
    this.setState(
      {
        continue: true,
      },
      () => {
        setTimeout(() => {
          this.props.onSubmit({
            type: "text",
            author: "them",
            data: { text: "Great let us have your good name" },
          });
        }, 1000);
      }
    );
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

  render() {
    return (
      <div className="sc-message-list">
        <div className="sc-message-scroller" ref={(el) => (this.scrollList = el)}>
          {this.props.messages.map((message, i) => {
            return (
              <Message message={message} key={i} onDelete={this.props.onDelete} />
            );
          })}
          {this.props.fetchingMessage && <p>Typing...</p>}
          {!this.state.continue && (
            <div className="yesno-btn">
              <button onClick={this.yes}>Yes</button>
              <button onClick={this.no}>No</button>
            </div>
          )}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingMessage: state.fetchingMessage,
});

export default connect(mapStateToProps)(MessageList);
