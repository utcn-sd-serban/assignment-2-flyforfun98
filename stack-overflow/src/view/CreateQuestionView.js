import React from "react";
import '../styles/questionStyle.css';

const CreateQuestionView = ({ onCreate, onChange, title, text, tags, allTags }) => (
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
                            onChange={e => onChange("title", e.target.value)} />
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
                            value={text} onChange={e => onChange("text", e.target.value)}></textarea>

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
);
export default CreateQuestionView