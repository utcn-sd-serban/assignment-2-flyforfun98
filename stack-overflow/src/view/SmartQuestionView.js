import React, { Component } from "react";
import model from "../model/Question";

import QuestionView from "./QuestionView";
import questionPresenter from "../presenter/QuestionPresenter";

const mapModelStateToComponentState = modelState => ({
    questions: modelState.questions,
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
            
            <QuestionView
                onCreate={questionPresenter.onCreate}
                showQuestions={questionPresenter.showQuestions}
                onChange={questionPresenter.onChange}
                onChangeQuestion={questionPresenter.onChangeQuestion}
                onFilterByTitle={questionPresenter.onFilterByTitle}
                onFilterByTags={questionPresenter.onFilterByTags}
                searchFieldTitle={this.state.searchFieldTitle}
                searchFieldTag={this.state.searchFieldTag}
                logOut={questionPresenter.logOut}
                questions={this.state.questions}
                title={this.state.title}
                text={this.state.text}
                tags={this.state.tags}
                allTags={this.state.allTags} />
        );
    }
}