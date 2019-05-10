import React from "react";
import '../styles/questionStyle.css';
import '../styles/answerStyle.css';
import OptionsAnswerView from "./OptionsAnswerView";
import TableAnswerView from "./TableAnswerView";
import CreateAnswerView from "./CreateAnswerView";
import QuestionContentView from "./QuestionContentView";
import EditAnswerView from "./EditAnswerView";
import EditQuestionView from "./EditQuestionView";

const MainAnswerView = ({ text, answersCopy, onCreate, onChange, goBack, currentQuestion, currentUser, onDelete, onEdit, setAnswerModal, answerToBeEdited,
    handleVoteAnswer, handleVoteQuestion, onDeleteQuestion, onEditQuestion, onChangeQuestion, setQuestionModal, banUser, unbanUser }) => (
        <div>
           
            <div className="container-question">
                <div className="card-question card-primary">
                    <div className="card-header">Ask or Click on a Question!</div>
                    <div className="card-block">

                        <OptionsAnswerView
                            goBack={goBack} />,
                    <h4><br />{currentQuestion.title}<br /><br /></h4>
                        <QuestionContentView
                            currentQuestion={currentQuestion}
                            currentUser={currentUser}
                            handleVoteQuestion={handleVoteQuestion}
                            onDeleteQuestion={onDeleteQuestion}
                            setQuestionModal={setQuestionModal}
                            banUser={banUser}
                            unbanUser={unbanUser} />
                        <h2><br />{"Answers"}<br /><br /></h2>
                        <TableAnswerView
                            answersCopy={answersCopy}
                            currentUser={currentUser}
                            onDelete={onDelete}
                            setAnswerModal={setAnswerModal}
                            handleVoteAnswer={handleVoteAnswer}
                            banUser={banUser}
                            unbanUser={unbanUser} />
                        <CreateAnswerView
                            text={text}
                            onCreate={onCreate}
                            onChange={onChange} />
                        <EditAnswerView
                            onEdit={onEdit}
                            onChange={onChange}
                            answerToBeEdited={answerToBeEdited}
                            text={text} />
                        <EditQuestionView
                            onEditQuestion={onEditQuestion}
                            onChangeQuestion={onChangeQuestion}
                            questionToBeEdited={currentQuestion}
                            text={currentQuestion.text} />
                    </div>
                </div>
            </div>
        </div>

    );

export default MainAnswerView;