import React from "react";
import '../styles/questionStyle.css';

const QuestionView = ({ questions, onCreate, onChange, onChangeQuestion, onFilterByTitle, onFilterByTags, searchFieldTitle, searchFieldTag, showQuestions, logOut, title, text, tags, allTags }) => (
    <div>
        <div className="container-question">
            <div className={`card-question card-primary`}>
                <div className="card-header">Ask or Click on a Question!</div>
                <div className="card-block">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={logOut}>Log Out</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={showQuestions}>Show Questions <span className="sr-only">(current)</span></button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-toggle="modal" data-target="#createQuestionModal">Add Question</button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Tags</button>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {allTags.map((tag, tagIndex) => (
                                            <div key={tagIndex}>
                                                {
                                                    <button className="badge badge-pill badge-secondary" value={searchFieldTag}
                                                        onClick={() => onChangeQuestion("searchFieldTag", searchFieldTag.concat(tag + ' '))}>{tag}</button>
                                                }
                                            </div>))
                                        }
                                    </div>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" placeholder="Search by tag.."
                                    onChange={e => onChangeQuestion("searchFieldTag", e.target.value)} value={searchFieldTag} />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={onFilterByTags} >Go!</button>
                            </form>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" placeholder="Search by title.."
                                    onChange={e => onChangeQuestion("searchFieldTitle", e.target.value)} value={searchFieldTitle} />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={onFilterByTitle} >Go!</button>
                            </form>
                        </div>
                    </nav>

                    <h2><br />{"Questions"}<br /><br /></h2>
                    <table id="foo" className="table table-hover">
                        <tbody>
                            {

                                questions.map((question, index) => (
                                    <tr className="table-primary" key={index}>

                                        <td><button className="score disabled">Votes<br />{question.votes}</button></td>
                                        <td><button className="nav-link">{question.title}</button> <br />
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

                    <div id="createQuestionModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content" >
                                <div className="modal-header">
                                    <h4 className="col-12 modal-title text-center">Add a Question!</h4>
                                </div>
                                <div className="modal-body">
                                    <label>Title: </label>
                                    <br />
                                    <form>
                                    <input className="input" value={title}
                                        onChange={e => onChange("title", e.target.value)}/>
                                    </form>
                                    <br />
                                    <br />
                                    <label>Tags: </label>
                                    <br />
                                    <input className="input-tags" value={tags} 
                                        onChange={e => onChange("tags", e.target.value)} />
                                    <div className="divider" />
                                    <button className="dropdown-toggle badge badge-pill badge-warning dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Tags</button>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {allTags.map((tag, tagIndex) => (
                                            <div key={tagIndex}>
                                                {
                                                    <button className="badge badge-pill badge-secondary" value={tags} 
                                                        onClick={() => onChange("tags", tags.concat(tag + ' '))}>{tag}</button>
                                                }
                                            </div>))
                                        }
                                    </div>

                                    <br />
                                    <br />
                                    <div className="form-group green-border-focus">
                                        <label form="exampleFormControlTextarea5">Text</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea5" rows="7"
                                            value={text}  onChange={e => onChange("text", e.target.value)}></textarea>

                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={onCreate} data-dismiss="modal">Create</button>
                                    <div className="divider" />
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default QuestionView;