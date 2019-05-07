import React from "react";
import '../styles/questionStyle.css';

const OptionsQuestionView = ({onChangeQuestion, onFilterByTitle, onFilterByTags, searchFieldTitle, searchFieldTag, showQuestions, logOut, allTags }) => (
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
);
export default OptionsQuestionView;