import React from "react";
import '../styles/questionStyle.css';
import '../styles/answerStyle.css';
import { Icon } from '@iconify/react';
import chevronUp from '@iconify/react/octicon/chevron-up';
import chevronDown from '@iconify/react/octicon/chevron-down';
import trashcan from '@iconify/react/octicon/trashcan';
import pencil from '@iconify/react/octicon/pencil';



const TableAnswerView = ({ answersCopy, currentUser, onDelete, setAnswerModal, handleVoteAnswer, unbanUser, banUser }) => (

    <table id="foo" className="table table-hover">
        <tbody>
            {
                answersCopy.map((answer, index) => (
                    <tr className="table-primary" key={index}>
                        <td>
                            <div>
                                <button className="score disabled">Votes<br />{answer.votes}</button>
                                <br />
                                {answer.date.toLocaleString()}
                                <br />
                                {currentUser.username !== answer.author.username &&
                                    <button className="icon-button" onClick={() => handleVoteAnswer(answer, "up")}> <Icon className="icon" icon={chevronUp} /></button>
                                }
                                <br />
                                {currentUser.username !== answer.author.username &&
                                    <button className="icon-button" onClick={() => handleVoteAnswer(answer, "down")}> <Icon className="icon" icon={chevronDown} /></button>
                                }
                            </div>
                        </td>
                        <td className="text-column">
                            <div className="form-group green-border-focus">
                                <label form="exampleFormControlTextarea5"></label>
                                <textarea className="form-control" id="answerFormControlTextarea5" rows="7"
                                    value={answer.text} disabled> </textarea>
                            </div>
                        </td>

                        <td><button className="score dropdown-toggle" type="button" data-toggle="collapse" data-target="#dropdown" aria-expanded="false" aria-controls="collapseExample">
                            User<br />{answer.author.username}</button>
                            <div className="collapse" id="dropdown">
                                <button className="dropdown-item disabled">Points: {answer.author.points}</button>
                                {(currentUser.userPermission === "ADMIN" && answer.author.userStatus === "ALLOWED") &&
                                    <button type="button" className="btn btn-danger" onClick={() => banUser(answer.author)} >Ban</button>}
                                {(currentUser.userPermission === "ADMIN" && answer.author.userStatus === "BANNED") &&
                                    <button type="button" className="btn btn-success" onClick={() => unbanUser(answer.author)}>Unban</button>}
                            </div>

                            <div className="score-divider" />

                            {(currentUser.userPermission === "ADMIN" || currentUser.username === answer.author.username) &&
                                <button className="icon-button" type="button" data-toggle="modal" data-target="#editAnswerModal"
                                    onClick={() => setAnswerModal(answer)} >

                                    <Icon className="icon-edit-delete" icon={pencil} />
                                    <br /></button>
                            }
                            <br />
                            <br />
                            {(currentUser.userPermission === "ADMIN" || currentUser.username === answer.author.username) &&
                                <button className="icon-button" type="button" onClick={() => onDelete(answer)}> <Icon className="icon-edit-delete" icon={trashcan} /></button>
                            }

                        </td>
                    </tr>))
            }
        </tbody>
    </table>

);

export default TableAnswerView;