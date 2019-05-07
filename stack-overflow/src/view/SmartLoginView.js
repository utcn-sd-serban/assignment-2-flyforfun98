import React, { Component } from "react";
import model from "../model/Login";

import LoginView from "./LoginView";
import loginPresenter from "../presenter/LoginPresenter";

const mapModelStateToComponentState = modelState => ({
    username: modelState.newUser.username,
    password: modelState.newUser.password,
    isUserBanned: modelState.isUserBanned
});

export default class SmartLoginView extends Component {
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
            
            <LoginView
                onCreate={loginPresenter.onCreate}
                onChange={loginPresenter.onChange}
                onLogging={loginPresenter.onLogging}
                username={this.state.username}
                password={this.state.password}
                isUserBanned={this.isUserBanned}/>
        );
    }
}