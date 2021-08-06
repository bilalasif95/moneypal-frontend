import PropTypes from "prop-types";
import React, { Component } from "react";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import Header from "./Header";
import plane from "../assets/paper-plane.svg";
import { ReactSVG } from 'react-svg'
import API from "../utils/API";



class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      questions: [],
      term: [],
    };

  }

  componentDidMount() {
    API.get("/api/v1/faqs/differences").then((response) => {
      this.setState({ questions: response.data })
    }).catch((error) => {
      console.error(error);
    })
    API.get("/api/v1/faqs/terms?category=Takaful").then((response) => {
      this.setState({ term: response.data })
    }).catch((error) => {
      console.error(error);
    })
  }

  onUserInputSubmit = (message) => {
    this.props.onUserInputSubmit(message);
  };

  onMessageReceived(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }
  onQuestionClick(question) {
    this.onUserInputSubmit({
      author: "me",
      type: "text",
      data: { text: question },
      whattodo: "callapi",
    })
  }
  ontermClick(term) {
    this.onUserInputSubmit({
      author: "me",
      type: "text",
      data: { text: term },
      whattodo: "callapi",
    })
  }
  render() {
    let messageList = this.props.messageList || [];
    let classList = [
      // "chat-box-container",
      "sc-chat-window",
      this.props.isOpen ? "opened" : "closed",
    ];
    return (


      <div className="main">
        <div className={classList.join(" ")}>

          <div className="message-input">
            <Header />
            <MessageList
              messages={messageList}
              imageUrl={this.props.agentProfile.imageUrl}
              onDelete={this.props.onDelete}
              onSubmit={this.onUserInputSubmit}
            />
            <UserInput
              showEmoji={this.props.showEmoji}
              onSubmit={this.onUserInputSubmit}
              showFile={this.props.showFile}
              onKeyPress={this.props.onKeyPress}
            />
          </div>
        </div>
        <div className="bot-faq">
          <p className="faq-head-main">Frequently Asked Terms</p>
          <p className="faq-head">Islamic Terms</p>
          <div className="faq-tags">
            {this.state.term.map((info,index)=>
            <p className={this.state.active ? 'active' : null} key={index} onClick={() => this.ontermClick(info.term)}>{info.term}</p>
            )}
          </div>
          <div className="custom-border"></div>
          <p className="faq-head">Conventional Terms</p>
          <div className="faq-tags">

            <p>Insurance</p>
            <p>Risk</p>
            <p>Loss</p>
            <p>Speculative Risk          </p>
            <p>Risk Transfer</p>
            <p>Indemnity</p>
            <p>Insurable Interest</p>
            <p>Proximate Cause</p>
            <p>Subrogation</p>
            <p>Risk Avoidance</p>
          </div>
          <div className="custom-border"></div>
          <div className="questions-main">
            <p className="faq-head">Frequently Asked Differences</p>
            <div className="questions">
              <ul className="questions-list">
                {this.state.questions.map((info,index) =>
                  <li key={index} onClick={() => this.onQuestionClick(info.question)}><ReactSVG src={plane} />{info.question}</li>
                )}

              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ChatWindow.propTypes = {
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func,
};

export default ChatWindow;
