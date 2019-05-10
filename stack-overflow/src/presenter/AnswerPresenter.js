import answer from "../model/Answer";
import modelLogin from "../model/Login";
import modelQuestion from "../model/Question";

class AnswerPresenter {

    onCreate() {
        var question = modelQuestion.state.currentQuestion;
        var author = modelLogin.state.currentUser;
        var text = answer.state.newAnswer.text;

        answer.addAnswer(author, text, new Date(), question, 0);
        answer.changeNewAnswerProperty("text", "");
        answer.sortAnswersByVotes();
    }

    onChange(property, value) {

        answer.changeNewAnswerProperty(property, value);
    }

    onChangeQuestion(property, value) {

        answer.changeCurrentQuestionProperty(property, value);
    }

    goBack() {

        window.location.assign("/#/questions/");
    }

    setAnswerModal(answerToBeEdited) {

        answer.changeAnswerProperty("answerToBeEdited", answerToBeEdited);
        answer.changeNewAnswerProperty("text", answerToBeEdited.text);
    }

    setQuestionModal(questionToBeEdited) { 

        modelQuestion.changeNewQuestionProperty("text", questionToBeEdited.text);
        console.log(questionToBeEdited.text);
       
    }

    onEdit(answerToBeEdited) {
        var index = answer.state.answers.indexOf(answerToBeEdited);
        var text = answer.state.newAnswer.text;
        answer.changeAnAnswerTextProperty("text", text, index);
        answer.changeNewAnswerProperty("text", "");
        answer.sortAnswersByVotes();
    }

    onDelete(answerToBeDeleted) {

        answer.deleteAnswer(answerToBeDeleted);
    }

    handleVoteAnswer(answerToBeVoted, voteText) {

        answer.handleVoteCount(answerToBeVoted, voteText);
        answer.updatePoints(answerToBeVoted);
        answer.sortAnswersByVotes();

    }

    handleVoteQuestion(currentQuestion, currentUser, voteText) {

        modelQuestion.handleVoteCount(currentQuestion, currentUser, voteText);
        if (modelQuestion.state.allowVote) {
            modelQuestion.sortQuestions();
            answerPresenter.goBack();
            answer.setAnswersToQuestion(currentQuestion);
        }

    }

    onEditQuestion(questionToBeEdited) {

        var index;
        for (let i = 0; i < modelQuestion.state.questions.length; i++)
            if (modelQuestion.state.questions[i].title === questionToBeEdited.title) {
                index = i;
                break;
            }

        modelQuestion.state.questions[index] = questionToBeEdited;
        for (let i = 0; i < answer.state.answers.length; i++) {
            if (answer.state.answers[i].question.title === questionToBeEdited.title)
                answer.changeAnAnswerTextProperty("question", modelQuestion.state.questions[index], i);
        }
    }

    onDeleteQuestion(questionToBeDeleted) {

        modelQuestion.deleteQuestion(questionToBeDeleted);
        answerPresenter.goBack();
    }

    banUser(user){
        
        modelLogin.banUser(user);
    }

    unbanUser(user){

        modelLogin.unbanUser(user);
    }
}

const answerPresenter = new AnswerPresenter();

export default answerPresenter;