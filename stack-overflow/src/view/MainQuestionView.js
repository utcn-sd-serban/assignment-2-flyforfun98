import React from "react";
import '../styles/questionStyle.css';
import OptionsQuestionView from "./OptionsQuestionView";
import TableQuestionView from "./TableQuestionView";
import CreateQuestionView from "./CreateQuestionView";

const MainQuestionView = ({ questionsCopy, onCreate, onChange, onChangeQuestion,  onQuestionClick, onFilterByTitle, onFilterByTags, searchFieldTitle, searchFieldTag, showQuestions, logOut, title, text, tags, allTags }) => (
    <div>
        <div className="container-question" >
            <div className="card-question card-primary">
                <div className="card-header">Ask or Click on a Question!</div>
                <div className="card-block">
                    <OptionsQuestionView onChangeQuestion={onChangeQuestion}
                                         onFilterByTitle={onFilterByTitle}
                                         onFilterByTags={onFilterByTags}
                                         searchFieldTitle={searchFieldTitle}
                                         searchFieldTag={searchFieldTag}
                                         showQuestions={showQuestions}
                                         logOut={logOut}
                                         allTags={allTags}/>,
                    <h2><br />{"Questions"}<br /><br /></h2>
                    <TableQuestionView questionsCopy={questionsCopy}
                                       onQuestionClick={onQuestionClick}/>
                    <CreateQuestionView onCreate={onCreate} 
                                        onChange={onChange}
                                        title={title}
                                        text={text}
                                        tags={tags}
                                        allTags={allTags}/>
                    
                </div>
            </div>
        </div>
    </div>

);

export default MainQuestionView;