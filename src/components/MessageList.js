import React, { Component } from "react";
import Message from "./Messages";
import { connect } from "react-redux";
import { continuewithConverstaion, contentEditableAction, askCategoryAction, numberOfTimesQuestionAskedAction, selectedCategory, confirmQuestionAction, whattocallAction, knowMoreAction, askQuestionAction, answerSatisfactionAction } from "./stateManagement/actions/conversationFlowUpdate";
import {
  startFetchingAction,
  stopFetchingAction,
} from "./stateManagement/actions/fetchingAction";
import chatIconUrl from "../assets/chat-bot.svg";
// import API from "../utils/API";

class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      lastMessage: "",
    };
  }

  // yes = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Yes" },
  //   });
  //   this.props.startFetching();
  //   // this.props.contentEditableAction(true);
  //   this.props.continuewithConverstaion(true);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Let’s get acquainted....can you add in your name?" },
  //     });
  //     this.props.contentEditableAction(true);
  //   }, 1000)
  //   this.props.whattocallAction("name");
  // };

  // no = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "No" },
  //   });
  //   this.props.startFetching();
  //   this.props.contentEditableAction(false);
  //   this.props.continuewithConverstaion(true);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Oh! Okay. We wish you a nice day." },
  //     })
  //   }, 1000)
  // };

  // terminology = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Terminology" },
  //   });
  //   this.props.askQuestionAction(false);
  //   this.props.knowMoreAction(false);
  //   this.props.contentEditableAction(true);
  //   this.props.whattocallAction("terminology");
  // };

  // question = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Question" },
  //   });
  //   this.props.askQuestionAction(false);
  //   this.props.contentEditableAction(true);
  //   this.props.knowMoreAction(false);
  //   this.props.whattocallAction("question");
  // };

  // answerSatisfactionYes = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Yes" },
  //   });
  //   this.props.startFetching();
  //   this.props.contentEditableAction(false);
  //   this.props.answerSatisfactionAction(false);
  //   this.props.continuewithConverstaion(true);
  //   var data = new FormData();
  //   data.append("category", this.props.selectedCategoryType);
  //   data.append("question", this.props.askedQuestion);
  //   data.append("answer", this.props.answer);
  //   data.append("satisfied", true);
  //   API.post("/saveData", data).then(() => { }).catch(() => { })
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Fantastic! So glad I could assist you today." },
  //     });
  //     if (this.props.numberOfTimesQuestionAsked === 1) {
  //       this.props.onSubmit({
  //         type: "text",
  //         author: "them",
  //         data: { text: "If you enter your email contact, I can send you this Answer in a few moments." },
  //         whattodo: "callApi"
  //       });
  //       this.props.whattocallAction("email");
  //       this.props.contentEditableAction(true);
  //     }
  //     else {
  //       this.props.onSubmit({
  //         type: "text",
  //         author: "them",
  //         data: { text: "Thanks for checking in with MoneyPAL. Feel free to come back anytime." },
  //       });
  //       this.props.onSubmit({
  //         type: "text",
  //         author: "them",
  //         data: { text: "See you soon! Stay well……" },
  //       });
  //     }
  //   }, 1000)
  //   // this.props.knowMoreAction(true);
  // };

  // answerSatisfactionNo = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "No" },
  //   });
  //   this.props.startFetching();
  //   this.props.contentEditableAction(false);
  //   this.props.knowMoreAction(false);
  //   this.props.answerSatisfactionAction(false);
  //   var data = new FormData();
  //   data.append("category", this.props.selectedCategoryType);
  //   data.append("question", this.props.askedQuestion);
  //   data.append("answer", this.props.answer);
  //   data.append("satisfied", false);
  //   API.post("/saveData", data).then(() => { }).catch(() => { })
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Can you restate your question differently?" },
  //     });
  //     this.props.whattocallAction("takequestion");
  //     this.props.contentEditableAction(true);
  //   }, 1000)
  // };

  // knowMoreYes = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Yes" },
  //   });
  //   this.props.numberOfTimesQuestionAskedAction(this.props.numberOfTimesQuestionAsked + 1)
  //   this.props.startFetching();
  //   this.props.contentEditableAction(false);
  //   this.props.answerSatisfactionAction(false);
  //   this.props.knowMoreAction(false);
  //   if (this.props.numberOfTimesQuestionAsked > 1) {
  //     setTimeout(() => {
  //       this.props.stopFetching()
  //       this.props.onSubmit({
  //         type: "text",
  //         author: "them",
  //         data: { text: "If you want to ask more questions, please run the session again." },
  //       });
  //       this.props.contentEditableAction(false);
  //     }, 1000)
  //   }
  //   else {
  //     setTimeout(() => {
  //       this.props.stopFetching()
  //       this.props.onSubmit({
  //         type: "text",
  //         author: "them",
  //         data: { text: "Great! For each session, I am ready to respond to 2 questions. Please ask your question?" },
  //       });
  //     }, 1000)
  //     this.props.whattocallAction("takequestion");
  //     this.props.contentEditableAction(true);
  //     // this.props.askQuestionAction(true);
  //   }
  // };

  // knowMoreNo = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "No" },
  //   });
  //   this.props.startFetching();
  //   this.props.knowMoreAction(false);
  //   this.props.contentEditableAction(false);
  //   this.props.answerSatisfactionAction(false);
  //   // this.props.continuewithConverstaion(true);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Thanks for checking in with MoneyPAL. Feel free to come back anytime." },
  //     });
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "See you soon! Stay well……" },
  //     });
  //   }, 1000)
  // };

  // category = (category) => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: category },
  //   });
  //   this.props.startFetching();
  //   this.props.selectedCategory(category);
  //   this.props.askCategoryAction(false);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: `I understand your question as: ${this.props.askedQuestion}` },
  //     });
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Is this your question?" },
  //     });
  //     this.props.confirmQuestionAction(true);
  //   }, 1000)
  // };

  // questionConfirmedAsNo = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "No" },
  //   });
  //   this.props.confirmQuestionAction(false);
  //   this.props.startFetching();
  //   this.props.contentEditableAction(false);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Can you restate your question differently?" },
  //     });
  //     this.props.whattocallAction("takequestion");
  //     this.props.contentEditableAction(true);
  //   }, 1000)
  // };

  // questionConfirmedAsYes = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Yes" },
  //   });
  //   this.props.startFetching();
  //   this.props.confirmQuestionAction(false);
  //   this.props.contentEditableAction(false);
  //   if (this.props.selectedCategoryType === "Glossary of Terms") {
  //     this.props.whattocallAction("terminology");
  //   }
  //   else {
  //     this.props.whattocallAction("question");
  //   }
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Super...let me look into my library." },
  //       whattodo: "callapi"
  //     });
  //   }, 1000)
  // };

  // yesSubscribe = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "Yes" },
  //   });
  //   this.props.startFetching();
  //   this.props.askQuestionAction(false);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "https://moneypal.com" },
  //     });
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Do you have any other question?" },
  //     });
  //     this.props.knowMoreAction(true);
  //   }, 1000)
  // };

  // noSubscribe = () => {
  //   this.props.onSubmit({
  //     type: "text",
  //     author: "me",
  //     data: { text: "No" },
  //   });
  //   this.props.startFetching();
  //   this.props.askQuestionAction(false);
  //   setTimeout(() => {
  //     this.props.stopFetching()
  //     this.props.onSubmit({
  //       type: "text",
  //       author: "them",
  //       data: { text: "Do you have any other question?" },
  //     });
  //     this.props.knowMoreAction(true);
  //   }, 1000)
  // };
  onButtonClick = (res) => {
    this.props.onSubmit({
      type: "text",
      author: "them",
      data: { text: res.title, payload: res.payload, buttons: this.props.buttons },
    });
    setTimeout(() => {
      this.props.onSubmit({
        type: "text",
        author: "me",
        data: { text: res.title, payload: res.payload },
        whattodo: "callapi"
      });
    }, 1)
  }
  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  returningConversationFlow() {
    // const { conversationContinue, askQuestionType, confirmQuestionType, askCategoryType, answerSatisfaction, knowMore } = this.props;
    const { askQuestionType, buttons } = this.props;
    // if (!conversationContinue) {
    //   return (
    //     <div className="yesno-btn">
    //       {/* <button onClick={this.yes}>Yes</button>
    //       <button onClick={this.no}>No</button> */}
    //     </div>
    //   );
    // }
    if (askQuestionType) {
      return (
        <div className="cat-btn">
          {buttons && buttons.map((res) => <button key={res.title} className="nthBtn" onClick={() => this.onButtonClick(res)}>{res.title}</button>)}
        </div>
      );
    }
    // if (confirmQuestionType) {
    //   return (
    //     <div className="yesno-btn">
    //       <button onClick={this.questionConfirmedAsYes}>Yes</button>
    //       <button onClick={this.questionConfirmedAsNo}>No</button>
    //     </div>
    //   );
    // }
    // if (askCategoryType) {
    //   return (
    //     <div className="cat-btn">
    //       <button onClick={() => this.category("General Finance")}>General Finance</button>
    //       <button className="nthBtn" onClick={() => this.category("Insurance")}>Insurance</button>
    //       <button className="nthBtn" onClick={() => this.category("Islamic Finance")}>Islamic Finance</button>
    //       <button className="nthBtn" onClick={() => this.category("Takaful")}>Takaful</button>
    //       <button onClick={() => this.category("Glossary of Terms")}>Glossary of Terms</button>
    //     </div>
    //   );
    // }
    // if (answerSatisfaction) {
    //   return (
    //     <div className="yesno-btn">
    //       <button onClick={this.answerSatisfactionYes}>Yes</button>
    //       <button onClick={this.answerSatisfactionNo}>No</button>
    //     </div>
    //   );
    // }
    // if (knowMore) {
    //   return (
    //     <div className="yesno-btn">
    //       <button onClick={this.knowMoreYes}>Yes</button>
    //       <button onClick={this.knowMoreNo}>No</button>
    //     </div>
    //   );
    // }
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
              {/* <p className="typing">Typing...</p> */}
              <div className="typing-loader"></div>
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
  askCategoryType: state.askCategoryType,
  askedQuestion: state.askedQuestion,
  confirmQuestionType: state.confirmQuestionType,
  selectedCategoryType: state.selectedCategoryType,
  answerSatisfaction: state.answerSatisfaction,
  answer: state.answer,
  numberOfTimesQuestionAsked: state.numberOfTimesQuestionAsked,
  knowMore: state.knowMore,
  buttons: state.buttons,
});

const mapDispatchToProps = (dispatch) => ({
  startFetching: () => dispatch(startFetchingAction),
  stopFetching: () => dispatch(stopFetchingAction),
  continuewithConverstaion: (data) => dispatch(continuewithConverstaion(data)),
  whattocallAction: (data) => dispatch(whattocallAction(data)),
  confirmQuestionAction: (data) => dispatch(confirmQuestionAction(data)),
  contentEditableAction: (data) => dispatch(contentEditableAction(data)),
  askCategoryAction: (data) => dispatch(askCategoryAction(data)),
  numberOfTimesQuestionAskedAction: (data) => dispatch(numberOfTimesQuestionAskedAction(data)),
  selectedCategory: (data) => dispatch(selectedCategory(data)),
  askQuestionAction: (data) => dispatch(askQuestionAction(data)),
  knowMoreAction: (data) => dispatch(knowMoreAction(data)),
  answerSatisfactionAction: (data) => dispatch(answerSatisfactionAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
