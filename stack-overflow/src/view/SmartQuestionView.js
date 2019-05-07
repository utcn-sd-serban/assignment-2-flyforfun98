import React, { Component } from "react";
import model from "../model/Question";

import MainQuestionView from "./MainQuestionView";
import questionPresenter from "../presenter/QuestionPresenter";

const mapModelStateToComponentState = modelState => ({
    questionsCopy: modelState.questionsCopy,
    title: modelState.newQuestion.title,
    text: modelState.newQuestion.text,
    tags: modelState.newQuestion.tags,
    allTags: modelState.allTags,
    searchFieldTitle: modelState.searchFieldTitle,
    searchFieldTag: modelState.searchFieldTag
});


export default class SmartQuestionView extends Component {
    constructor() {
        super();
        this.state = mapModelStateToComponentState(model.state);
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        model.addListener("change", this.listener);
    }

    componentWillUnmount() {
        model.removeListener("change", this.listener);
    }

    
    render() {
        return (
            
            <MainQuestionView
                onCreate={questionPresenter.onCreate}
                onQuestionClick={questionPresenter.onQuestionClick}
                showQuestions={questionPresenter.showQuestions}
                onChange={questionPresenter.onChange}
                onChangeQuestion={questionPresenter.onChangeQuestion}
                onFilterByTitle={questionPresenter.onFilterByTitle}
                onFilterByTags={questionPresenter.onFilterByTags}
                setQuestionModal={questionPresenter.setQuestionModal}
                onEditQuestion={questionPresenter.onEditQuestion}
                searchFieldTitle={this.state.searchFieldTitle}
                searchFieldTag={this.state.searchFieldTag}
                logOut={questionPresenter.logOut}
                questionsCopy={this.state.questionsCopy}
                title={this.state.title}
                text={this.state.text}
                tags={this.state.tags}
                allTags={this.state.allTags} />
        );
    }
}