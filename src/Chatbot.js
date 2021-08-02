import React, { Component } from 'react';
import { Launcher } from "./Launcher";
import messageHistory from "./messageHistory";
import {
    startFetchingAction,
    stopFetchingAction,
} from "./components/stateManagement/actions/fetchingAction";
import { whattocallAction, askQuestionAction, timeAction, askedQuestionAction, knowMoreAction, buttonsAction, userNameAction, dualMessageAction, delayedMessageAction, askCategoryAction, contentEditableAction, answerAction, answerSatisfactionAction } from "./components/stateManagement/actions/conversationFlowUpdate";
import { connect } from "react-redux";
import "./assets/styles";
import API from "./utils/RASAAPI";

class Chatbot extends Component {
    constructor() {
        super();
        this.state = {
            messageList: messageHistory,
            newMessagesCount: 0,
            isOpen: false,
            minTime: 5000,
            maxTime: 300000,
            extendedTime: 10000,
        };
        //this.lastId = messageHistory[messageHistory.length - 1].id;
    }

    _onMessageWasSent(message) {
        if (message.whattodo === "callapi") {
            this.props.startFetching();
            this.props.askQuestionAction(false);
            this.props.buttonsAction([]);
            this.props.delayedMessageAction("");
            // this.props.answerSatisfactionAction(false);
            // if (this.props.whattocall === "name") {
            //   var data = new FormData();
            //   data.append("name", message.data.text);
            this.props.contentEditableAction(false);
            let data;
            if (message.data.payload) {
                data = {
                    sender: "test_user",
                    message: message.data.payload
                }
            }
            else {
                data = {
                    sender: "test_user",
                    message: message.data.text
                }
            }
            API.post("/api/message/send", data).then((response) => {
                this.props.stopFetching()
                this.props.contentEditableAction(true);
                this.props.dualMessageAction(false)
                if (response.data.length > 1) {
                    this.props.delayedMessageAction(response.data[1].text)
                    if (response.data[1].buttons) {
                        // this.props.askQuestionAction(true);
                        this.props.buttonsAction(response.data[1].buttons)
                    }
                    else {
                        this.props.buttonsAction([]);
                    }
                    this.props.timeAction("min")
                    this.props.dualMessageAction(true)
                    this.timeAction(response.data[1].text, this.state.minTime)
                }
                else {
                    // response.data.map((data) => {
                    if (response.data[0].buttons) {
                        this.props.askQuestionAction(true);
                        this.props.contentEditableAction(false);
                        this.props.buttonsAction(response.data[0].buttons)
                    }
                    else {
                        this.props.buttonsAction([]);
                    }
                }
                this._sendMessage(response.data[0].text)
                // })
            }).catch(() => {
                this.props.stopFetching();
                this._sendMessage("Sorry, I got some problem 🙁 Please try again!")
            })
            // API.post("/name", data).then((res) => {
            //   this.props.stopFetching()
            //   this._sendMessage(res.data.data)
            //   this.props.userNameAction(res.data.name)
            //   this._sendMessage("I can resolve your query in just a few clicks..")
            //   this._sendMessage("Can you type in your question?")
            //   // this.props.whattocallAction("email");
            //   this.props.whattocallAction("takequestion");
            //   this.props.contentEditableAction(true);
            // })
            //}
            // if (this.props.whattocall === "email") {
            //   //this.props.contentEditableAction(false);
            //   var email = new FormData();
            //   email.append("email", message.data.text);
            //   API.post("/email", email).then(() => {
            //     this.props.stopFetching()
            //     this._sendMessage("Thank you. Would you also like to join our quarterly newsletter on events hosted by MoneyPAL?")
            //     // this._sendMessage("Let us know what you are interested in.")
            //     this.props.askQuestionAction(true);
            //   }).catch((err) => {
            //     this.props.stopFetching()
            //     // this._sendMessage(err.response.data.data)
            //     this._sendMessage("Ok if you do not want to provide your email, it is fine.");
            //     this._sendMessage("Do you have any other question?")
            //     // this.props.whattocallAction("email");
            //     this.props.knowMoreAction(true);
            //   })
            // }
            // if (this.props.whattocall === "terminology") {
            //   var terminology = new FormData();
            //   terminology.append("terminology", this.props.askedQuestion);
            //   API.post("/terminology", terminology).then((res) => {
            //     this.props.stopFetching()
            //     this.props.answerAction(res.data.data[1])
            //     this._sendMessage(`Answer is: ${res.data.data[1]}`)
            //     this._sendMessage(`${this.props.userName}, are you satisfied?`)
            //     this.props.answerSatisfactionAction(true);
            //     this.props.contentEditableAction(false);
            //   }).catch((err) => {
            //     this.props.stopFetching()
            //     this._sendMessage(err.response.data.data)
            //     this.props.askQuestionAction(true);
            //     this.props.contentEditableAction(false);
            //   })
            // }
            // if (this.props.whattocall === "question") {
            //   var question = new FormData();
            //   question.append("question", this.props.askedQuestion);
            //   API.post("/question", question).then((res) => {
            //     this.props.stopFetching()
            //     this.props.answerAction(res.data.data)
            //     this._sendMessage(`Answer is: ${res.data.data}`)
            //     this._sendMessage(`${this.props.userName}, are you satisfied?`)
            //     this.props.answerSatisfactionAction(true);
            //     this.props.contentEditableAction(false);
            //   }).catch((err) => {
            //     this.props.stopFetching()
            //     this._sendMessage(err.response.data.data)
            //     this.props.askQuestionAction(true);
            //     this.props.contentEditableAction(false);
            //   })
            // }
        }
        // if (message.whattodo === "showMessages") {
        //   this.props.startFetching();
        //   this.props.contentEditableAction(false);
        //   var question = new FormData();
        //   question.append("question", message.data.text);
        //   API.post("/question", question).then((res) => {
        //     this.props.stopFetching();
        //     this.props.askedQuestionAction(message.data.text);
        //     this._sendMessage("OK great! Now which knowledge area does it fit into?")
        //     this.props.askCategoryAction(true);
        //   }).catch((err) => {
        //     this.props.stopFetching();
        //     this.props.whattocallAction("takequestion");
        //     this._sendMessage(err.response.data.data);
        //     this.props.contentEditableAction(true);
        //   })
        //   // this._sendMessage("OK great! Now which knowledge area does it fit into?");
        // }
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

    componentDidMount() {
        this.props.startFetching();
        this.props.contentEditableAction(false);
        let data = {
            sender: "test_user",
            message: "hello"
        }
        API.post("/api/message/send", data).then((response) => {
            this.props.stopFetching();
            this.props.contentEditableAction(true);
            response.data.map((data, index) => {
                this._sendMessage(data.text)
            })
        }).catch(() => {
            this.props.stopFetching();
            this._sendMessage("Sorry, I got some problem 🙁 Please try again!")
        })
    }

    timeAction(message, delay) {
        if (this.props.dualMessage) {
            if (this.props.delayedMessage.includes("Do you want to know more")) {
                delay = this.state.minTime
            }
            else {
                delay = this.state.maxTime
            }
            setTimeout(() => {
                if (this.props.time === "max") {
                    this.props.timeAction("min")
                    this.timeAction(this.state.extendedTime)
                }
                else if (this.props.time === "min") {
                    setTimeout(() => {
                        this.props.stopFetching()
                        this.props.askQuestionAction(true);
                        if (this.props.buttons.length > 0) {
                            this.props.contentEditableAction(false);
                        }
                        else {
                            this.props.contentEditableAction(true);
                        }
                        this._sendMessage(message)
                        this.props.dualMessageAction(false)
                        this.props.timeAction("expired")
                    }, 1000)
                    this.props.askQuestionAction(false);
                    this.props.contentEditableAction(true);
                    this.props.startFetching()
                }
                else if (this.props.time === "expired") { }
                else { }
            }, delay)
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
        )
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
    userNameAction: (data) => dispatch(userNameAction(data)),
    delayedMessageAction: (data) => dispatch(delayedMessageAction(data)),
    dualMessageAction: (data) => dispatch(dualMessageAction(data)),
    buttonsAction: (data) => dispatch(buttonsAction(data)),
    knowMoreAction: (data) => dispatch(knowMoreAction(data)),
    askedQuestionAction: (data) => dispatch(askedQuestionAction(data)),
    askCategoryAction: (data) => dispatch(askCategoryAction(data)),
    contentEditableAction: (data) => dispatch(contentEditableAction(data)),
    answerSatisfactionAction: (data) => dispatch(answerSatisfactionAction(data)),
    answerAction: (data) => dispatch(answerAction(data)),
    timeAction: (data) => dispatch(timeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
