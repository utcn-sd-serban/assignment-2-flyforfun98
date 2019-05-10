import React from "react";
import '../styles/questionStyle.css';
import '../styles/answerStyle.css';


const EditAnswerView = ({ onEdit, onChange, answerToBeEdited, text }) => (

    <div id="editAnswerModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content" >
                <div className="modal-header">
                    <h4 className="col-12 modal-title text-center">Modify the Answer!</h4>
                </div>
                <div className="modal-body">
                    <br />
                    <br />
                    <div className="form-group green-border-focus">
                        <label form="exampleFormControlTextarea5">Text</label>
                        <textarea className="form-control" id="exampleFormControlTextarea5" rows="7"
                            value={text} onChange={e => onChange("text", e.target.value)}></textarea>
                    </div>

                </div>
                <div className="modal-footer" id="answerButtonsModal">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => onEdit(answerToBeEdited)}>Save</button>
                    <div className="divider" />
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => onChange("text", "")}>Close</button>
                </div>
            </div>

        </div>
    </div>


);

export default EditAnswerView;