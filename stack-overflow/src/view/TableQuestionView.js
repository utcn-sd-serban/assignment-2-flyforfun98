import React from "react";
import '../styles/questionStyle.css';

const TableQuestionView = ({ questionsCopy, onQuestionClick}) => (

    <table id="foo" className="table table-hover">
        <tbody>
            {

                    questionsCopy.map((question, index) => (
                    <tr className="table-primary" key={index}>

                        <td><button className="score disabled">Votes<br />{question.votes}</button></td>
                        <td><button onClick={() => {onQuestionClick(index, question)}} className="nav-link">{question.title}</button> <br />
                            <button className="badge badge-pill badge-primary dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Tags</button>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {question.tags.map((tag, tagIndex) => (
                                    <div key={tagIndex}>
                                        {
                                            <span className="badge badge-pill badge-secondary">{tag}</span>
                                        }
                                    </div>))
                                }
                            </div>
                        </td>
                        <td>{question.date.toLocaleString()}</td>
                        <td><button className="score dropdown-toggle" type="button" data-toggle="collapse" data-target="#dropdown" aria-expanded="false" aria-controls="collapseExample">
                            User<br />{question.author.username}</button>
                            <div className="collapse" id="dropdown">
                                <button className="dropdown-item disabled">Points: {question.author.points}</button>
                                
                            </div>
                        </td>
                    </tr>))
            }
        </tbody>
    </table>
);

export default TableQuestionView;