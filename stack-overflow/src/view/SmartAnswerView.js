import React, { Component } from "react";
import model from "../model/Answer";
import MainAnswerView from "./MainAnswerView";
import answerPresenter from "../presenter/AnswerPresenter";
import questionModel from "../model/Question";
import loginModel from "../model/Login";

const mapAnswerModelStateToComponentState = (answerState, props) => (
    
    answerState.answers[props.match.params.index]
);

const mapModelStateToComponentState = modelState => ({
    
    text: modelState.newAnswer.text,
    answersCopy: modelState.answersCopy,
    currentQuestion: modelState.currentQuestion,
    currentUser: modelState.currentUser,
    answerToBeEdited: modelState.answerToBeEdited
   
});


export default class SmartAnswerView extends Component {
    constructor(props) {
        super(props);
        this.state = mapModelStateToComponentState(model.state, props);
        this.listener = answerState => this.setState(mapAnswerModelStateToComponentState(answerState, this.props));
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState, this.props));
        model.addListener("change", this.listener);
    }

    componentDidUpdate(prev) {
        if (prev.match.params.index !== this.props.match.params.index) {
            this.setState(mapModelStateToComponentState(model.state, this.props));
        }
    }

    componentDidMount() {
      
        model.changeAnswerProperty("currentQuestion", questionModel.state.currentQuestion);
        model.changeAnswerProperty("currentUser", loginModel.state.currentUser);
        model.sortAnswersByVotes();    
       
    } 

    componentWillUnmount() {
        model.removeListener("change", this.listener);
    }


    render() {
        return (
           
            <MainAnswerView
                 goBack={answerPresenter.goBack}
                 onCreate={answerPresenter.onCreate}
                 onChange={answerPresenter.onChange}
                 onChangeQuestion={answerPresenter.onChangeQuestion}
                 onDelete={answerPresenter.onDelete}
                 onEdit={answerPresenter.onEdit}
                 setAnswerModal={answerPresenter.setAnswerModal}
                 setQuestionModal={answerPresenter.setQuestionModal}
                 handleVoteAnswer={answerPresenter.handleVoteAnswer}
                 handleVoteQuestion={answerPresenter.handleVoteQuestion}
                 onDeleteQuestion={answerPresenter.onDeleteQuestion}
                 onEditQuestion={answerPresenter.onEditQuestion}
                 banUser={answerPresenter.banUser}
                 unbanUser={answerPresenter.unbanUser}
                 answersCopy={this.state.answersCopy}
                 text={this.state.text}
                 currentQuestion={this.state.currentQuestion}
                 currentUser={this.state.currentUser}
                 answerToBeEdited={this.state.answerToBeEdited}
                />

        );
    }
}