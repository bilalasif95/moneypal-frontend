import React, { Component } from "react";
import { Launcher } from "../../src";
import messageHistory from "./messageHistory";
import {
  startFetchingAction,
  stopFetchingAction,
} from "../../src/stateManagement/actions/fetchingAction";

import { connect } from "react-redux";
import "./../assets/styles";
import {
  setNewUserName,
  setNewUserNameError,
} from "../../src/stateManagement/actions/nameActions";
import API from "../../src/utils/API";

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
      API.post("/name", data).then((res) => {
        if (res.data.error) {
          // this.props.setNewUserNameError("Some Error Occured");
        } else {
          // this.props.setNewUserName(res.data.message);
        }
      });
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

  onKeyPress = (userInput) => {
    // console.log(userInput);
  };

  onDelete = (msg) => {
    this.setState({
      messageList: this.state.messageList.filter(({ id }) => id !== msg.id),
    });
  };

  render() {
    return (
      <div>
        {/* <Header /> */}
        {/* <TestArea onMessage={this._sendMessage.bind(this)} /> */}
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
        {/* <div style={{ height: 200 }} /> */}
        {/* <Footer /> */}
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
  setNewUserName: (payload) => dispatch(setNewUserName(payload)),
  setNewUserNameError: (payload) => dispatch(setNewUserNameError(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
