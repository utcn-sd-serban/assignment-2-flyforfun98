import React from "react";
import '../styles/questionStyle.css';
import '../styles/answerStyle.css';
import { Icon } from '@iconify/react';
import chevronUp from '@iconify/react/octicon/chevron-up';
import chevronDown from '@iconify/react/octicon/chevron-down';
import trashcan from '@iconify/react/octicon/trashcan';
import pencil from '@iconify/react/octicon/pencil';


const QuestionContentView = ({ currentQuestion, currentUser, handleVoteQuestion, setQuestionModal, onDeleteQuestion, banUser, unbanUser }) => (
    <div className="row">
        <div className="question-vote column">
            <div>
                <button className="score disabled">Votes<br />{currentQuestion.votes}</button>
                <br />
                {currentUser.username !== currentQuestion.author.username &&
                    <button className="icon-button" onClick={() => handleVoteQuestion(currentQuestion, currentUser, "up")}> <Icon className="icon" icon={chevronUp} /></button>}
                <br />
                {currentUser.username !== currentQuestion.author.username &&
                    <button className="icon-button" onClick={() => handleVoteQuestion(currentQuestion, currentUser, "down")}> <Icon className="icon" icon={chevronDown} /></button>}
            </div>
        </div>
        <div className="card question-content fixed">
            {currentQuestion.date.toLocaleString()}
            <div className="card-body ">
                <div className="form-group green-border-focus">
                    <label form="exampleFormControlTextarea5"></label>
                    <textarea className="form-control" id="exampleFormControlTextarea5" rows="9"
                        value={currentQuestion.text} disabled></textarea>
                </div>
            </div>
        </div >
        <div className="question-options column">
            <button className="score dropdown-toggle" type="button" data-toggle="collapse" data-target="#dropdown" aria-expanded="false" aria-controls="collapseExample">
                User<br />{currentQuestion.author.username}</button>
            <div className="collapse" id="dropdown">
                <button className="dropdown-item disabled">Points: {currentQuestion.author.points}</button>
                {(currentUser.userPermission === "ADMIN" && currentQuestion.author.userStatus === "ALLOWED") &&
                    <button type="button" className="btn btn-danger" onClick={() => banUser(currentQuestion.author)}>Ban</button>}
                {(currentUser.userPermission === "ADMIN" && currentQuestion.author.userStatus === "BANNED") &&
                    <button type="button" className="btn btn-success" onClick={() => unbanUser(currentQuestion.author)}>Unban</button>}
            </div>

            <div className="score-divider" />
            {currentUser.userPermission === "ADMIN" &&
                <button className="icon-button" type="button" data-toggle="modal" data-target="#editQuestionModal"
                    onClick={() => setQuestionModal(currentQuestion)}> <Icon className="icon-edit-delete" icon={pencil} /></button>}
            <br />
            <br />
            {currentUser.userPermission === "ADMIN" &&
                <button className="icon-button" onClick={() => onDeleteQuestion(currentQuestion)}> <Icon className="icon-edit-delete" icon={trashcan} /></button>}
        </div>
    </div>
);

export default QuestionContentView;