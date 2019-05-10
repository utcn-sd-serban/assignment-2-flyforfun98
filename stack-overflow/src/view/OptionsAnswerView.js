import React from "react";
import '../styles/questionStyle.css';
import '../styles/answerStyle.css';

const OptionsAnswerView = ({ goBack }) => (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav answer-navbar">
                <li className="nav-item answer-item">
                    <button className="nav-link" onClick={goBack}>Go Back</button>
                </li>
                <li className="nav-item answer-item">
                    <button className="nav-link" data-toggle="modal" data-target="#createAnswerModal">Add Answer</button>
                </li>


            </ul>
        </div>
    </nav>

);

export default OptionsAnswerView;