import { EventEmitter } from "events";

class Login extends EventEmitter
{
    constructor() {
        super();
        this.state = {
            users: [{
                username: "flyforfun98",
                password: "kicv51mk45",
                points: 0,
                userStatus: "ALLOWED",
                userPermission: "ADMIN"
            }, {
                username: "flavius1",
                password: "parola1",
                points: 0,
                userStatus: "BANNED",
                userPermission: "USER"
            }],
            newUser: {
                username: "",
                password: "",
                points: 0,
                userStatus: "ALLOWED",
                userPermission: "USER"
            },

            invalidLogin: true,
            invalidRegister: true,

            currentUser: {
                username: "",
                password: "",
                points: 0,
                userStatus: "ALLOWED",
                userPermission: ""
            }


        };
    }


    addUser(username, password, points) {
        this.state = {
            ...this.state,
            users: this.state.users.concat([{
                username: username,
                password: password,
                points: points,
                userStatus: "ALLOWED",
                userPermission: "USER"
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

    changeUserPointsProperty(value, index) {
        this.state = {
            ...this.state,
            users: {
                ...this.state.users,
                [index]:{
                    ...this.state.users[index],
                    points: value
                }
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
        var permission;
        for(let i = 0; i < this.state.users.length; i++)
        {
            var user = this.state.users[i];
            if(user.username === username && user.password === password && user.userStatus === "ALLOWED")
            {
                ok = false;
                points = user.points;
                permission = user.userPermission;
                this.changeLoginProperty("isUserBanned", false);
            }
            else{
                if(user.userStatus === "BANNED")
                    this.changeLoginProperty("isUserBanned", true);
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
            this.changeCurrentUserProperty("userPermission", permission);
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

    banUser(user){

        user.userStatus = "BANNED";
    }

    unbanUser(user){

        user.userStatus = "ALLOWED";
    }
}

const login = new Login();

export default login;