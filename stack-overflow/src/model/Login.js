import { EventEmitter } from "events";

class Login extends EventEmitter
{
    constructor() {
        super();
        this.state = {
            users: [{
                username: "flyforfun98",
                password: "kicv51mk45",
                points: 13
            }, {
                username: "flavius1",
                password: "parola1",
                points: -5
            }],
            newUser: {
                username: "",
                password: "",
                points: 0
            },

            invalidLogin: true,
            invalidRegister: true,

            currentUser: {
                username: "",
                password: "",
                points: 0
            }


        };
    }


    addUser(username, password, points) {
        this.state = {
            ...this.state,
            users: this.state.users.concat([{
                username: username,
                password: password,
                points: points
            }])
        };
        this.emit("change", this.state);
    }

    changeNewUserProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeCurrentUserProperty(property, value) {
        this.state = {
            ...this.state,
            currentUser: {
                ...this.state.currentUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeLoginProperty(property, value) {
        this.state = {
            ...this.state,
            [property]: value
            
        };
        this.emit("change", this.state);
    }

    verifyLoginUser(username, password)
    {
        var ok = true;
        var points = 0;
        for(let i = 0; i < this.state.users.length; i++)
        {
            var user = this.state.users[i];
            if(user.username === username && user.password === password)
            {
                ok = false;
                points = user.points;
            }
        }  
        if(ok)
            this.changeLoginProperty("invalidLogin", true);
        else
        {
            this.changeLoginProperty("invalidLogin", false);
            this.changeCurrentUserProperty("username", username);
            this.changeCurrentUserProperty("password", password);
            this.changeCurrentUserProperty("points", points);
        }
    }

    verifyRegisterUser(username, password)
    {
        var ok = false;
        for(let i = 0; i < this.state.users.length; i++)
        {
            var user = this.state.users[i];
            if(user.username === username || user.password === password || username === "" || password === "")
            {
                ok = true;
            }
        }
        if(ok)
            this.changeLoginProperty("invalidRegister", true);
        else
            this.changeLoginProperty("invalidRegister", false);
       
    }
}

const login = new Login();

export default login;