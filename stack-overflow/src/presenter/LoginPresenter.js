import model from "../model/Login";

class LoginPresenter{

    onCreate() {

        var username = model.state.newUser.username;
        var password = model.state.newUser.password;

        model.verifyRegisterUser(username, password);

        if (!model.state.invalidRegister) {
            model.addUser(username, password, 0);
            model.changeNewUserProperty("username", "");
            model.changeNewUserProperty("password", "");
            window.location.assign("#/");
        }
    }

    onLogging() {

        var username = model.state.newUser.username;
        var password = model.state.newUser.password;

       
        model.verifyLoginUser(username, password);

        if (!model.state.invalidLogin) {
            model.changeNewUserProperty("username", "");
            model.changeNewUserProperty("password", "");
            window.location.assign("#/questions");

        }
        else
            model.changeLoginProperty("invalidLogin", false); 
    }

    onChange(property, value) {
        model.changeNewUserProperty(property, value);
    }

}

const loginPresenter = new LoginPresenter();

export default loginPresenter;