import React, { Component } from "react";
import { Launcher } from "./Launcher";
import messageHistory from "./messageHistory";
import {
  startFetchingAction,
  stopFetchingAction,
} from "./components/stateManagement/actions/fetchingAction";
import { whattocallAction, askQuestionAction, contentEditableAction, answerSatisfactionAction } from "./components/stateManagement/actions/conversationFlowUpdate";
import { connect } from "react-redux";
import "./assets/styles";
import API from "./utils/API";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
    };
    this.lastId = messageHistory[messageHistory.length - 1].id;
  }

  _onMessageWasSent(message) {
    var data = new FormData();
    data.append("name", message.data.text);
    if (message.whattodo === "callapi") {
      this.props.startFetching();
      this.props.askQuestionAction(false);
      this.props.answerSatisfactionAction(false);
      if (this.props.whattocall === "name") {
        API.post("/name", data).then((res) => {
          this.props.stopFetching()
          this._sendMessage(`Nice name ${res.data.data}`)
          this._sendMessage("Please let us have your email address that we may send you relevant newsletters.")
          this.props.whattocallAction("email");
        })
      }
      if (this.props.whattocall === "email") {
        var email = new FormData();
        email.append("email", message.data.text);
        API.post("/email", email).then(() => {
          this.props.stopFetching()
          this._sendMessage("Great! Let’s begin.")
          this._sendMessage("Let us know what you are interested in.")
          this.props.askQuestionAction(true);
          this.props.contentEditableAction(false);
        }).catch((err) => {
          this.props.stopFetching()
          this._sendMessage(err.response.data.data)
          this.props.whattocallAction("email");
          this.props.contentEditableAction(true);
        })
      }
      if (this.props.whattocall === "terminology") {
        var terminology = new FormData();
        terminology.append("terminology", message.data.text);
        API.post("/terminology", terminology).then((res) => {
          this.props.stopFetching()
          this._sendMessage(res.data.data[1])
          this._sendMessage("Is it what you have been looking for?")
          this.props.answerSatisfactionAction(true);
          this.props.contentEditableAction(false);
        }).catch((err) => {
          this.props.stopFetching()
          this._sendMessage(err.response.data.data)
          this.props.askQuestionAction(true);
          this.props.contentEditableAction(false);
        })
      }
      if (this.props.whattocall === "question") {
        var question = new FormData();
        question.append("question", message.data.text);
        API.post("/question", question).then((res) => {
          this.props.stopFetching()
          this._sendMessage(res.data.data)
          this._sendMessage("Is it what you have been looking for?")
          this.props.answerSatisfactionAction(true);
          this.props.contentEditableAction(false);
        }).catch((err) => {
          this.props.stopFetching()
          this._sendMessage(err.response.data.data)
          this.props.askQuestionAction(true);
          this.props.contentEditableAction(false);
        })
      }
    }

    this.setState({
      messageList: [
        ...this.state.messageList,
        { id: this.lastId + 1, ...message },
      ],
    });
    this.lastId += 1;
  }

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen
        ? this.state.newMessagesCount
        : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [
          ...this.state.messageList,
          {
            id: this.lastId + 1,
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
      this.lastId += 1;
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    });
  }

  onKeyPress = () => { };

  onDelete = (msg) => {
    this.setState({
      messageList: this.state.messageList.filter(({ id }) => id !== msg.id),
    });
  };

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: "react-beautiful-chat",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
          onKeyPress={this.onKeyPress}
          onDelete={this.onDelete}
          showEmoji
          showFile
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  startFetching: () => dispatch(startFetchingAction),
  stopFetching: () => dispatch(stopFetchingAction),
  whattocallAction: (data) => dispatch(whattocallAction(data)),
  askQuestionAction: (data) => dispatch(askQuestionAction(data)),
  contentEditableAction: (data) => dispatch(contentEditableAction(data)),
  answerSatisfactionAction: (data) => dispatch(answerSatisfactionAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
