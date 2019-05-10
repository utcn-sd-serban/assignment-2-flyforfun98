import React from "react";
import '../styles/loginStyle.css';

const LoginView = ({ username, password, onCreate, onChange, onLogging, isUserBanned }) => (
    <div>
        <div className="container">
            <h2>Welcome to Stack Overflow</h2>
            <div className="card card-primary">
                <div className="card-header">Get Into Your Account!</div>
                <div className="card-block">


                    <h2>Sign In!</h2>
                    <div>
                        <label className="label">Username: </label>

                        <input className="input" placeholder="Your username.." value={username}
                            onChange={e => onChange("username", e.target.value)} />
                        <br />
                        <br />
                        <label className="label">Password: </label>

                        <input className="input" type="password" placeholder="Your password.." value={password}
                            onChange={e => onChange("password", e.target.value)} />
                        <br />

                        <button type="button" className="btn btn-primary btn-lg" data-dismiss='#loginModal' data-toggle="modal" data-target="#loginModal" onClick={onLogging}>Login</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={onCreate}>Register</button>

                    </div>
                </div>
            </div>
        </div>

    </div>
);

export default LoginView;