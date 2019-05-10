import { EventEmitter } from "events";
import modelLogin from "./Login";
import modelQuestion from "./Question";
import modelVoteAnswer from "./VoteAnswer";

class Answer extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answers: [{
                author: modelLogin.state.users[0],
                text: "The general concept behind dependency injection is called Inversion of Control",
                date: new Date(),
                question: modelQuestion.state.questions[0],
                votes: 0
            }, {
                author: modelLogin.state.users[1],
                text: "A space leak occurs when a computer program uses more memory than necessary",
                date: new Date(),
                question: modelQuestion.state.questions[1],
                votes: 0
            }, {
                author: modelLogin.state.users[0],
                text: "A memory leak is a type of resource leak that occurs when a computer program incorrectly manages memory allocations",
                date: new Date(),
                question: modelQuestion.state.questions[1],
                votes: 0
            }],
            newAnswer: {
                author: {},
                text: "",
                date: new Date(),
                question: {},
                votes: 0
            },

            currentQuestion: {
                author: {},
                title: "",
                text: "",
                date: "",
                tags: "",
                votes: ""
            },

            currentUser: {
                username: "",
                password: "",
                points: 0
            },

            answersCopy: [{}],
            answerToBeEdited: {},
            allowVote: false,
            isAnswerVoted: false,
            questionText: "",
            questionToBeEdited: {}
        };

        this.changeAnswerProperty("answersCopy", this.state.answers);

    }

    addAnswer(author, text, date, question, votes) {
        this.state = {
            ...this.state,
            answers: this.state.answers.concat([{
                author: author,
                text: text,
                date: date,
                question: question,
                votes: votes
            }])
        };

        this.emit("change", this.state);
    }

    changeNewAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeAnswersFieldProperty(property, value) {
        this.state = {
            ...this.state,
            answers: {
                ...this.state.answers,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeCurrentQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            currentQuestion: {
                ...this.state.currentQuestion,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeAnAnswerTextProperty(property, value, index) {
        this.state = {
            ...this.state,
            answers: {
                ...this.state.answers,
                [index]: {
                    ...this.state.answers[index],
                    [property]: value
                }
            }
        };
        this.emit("change", this.state);
    }

    changeAnAnswerCopyTextProperty(property, value, index) {
        this.state = {
            ...this.state,
            answersCopy: {
                ...this.state.answersCopy,
                [index]: {
                    ...this.state.answersCopy[index],
                    [property]: value
                }
            }
        };
        this.emit("change", this.state);
    }

    changeAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            [property]: value
        };
        this.emit("change", this.state);
    }

    sortAnswersByVotes() {

        this.changeAnswerProperty("answers", Object.keys(this.state.answers)
            .map(key => this.state.answers[key]));
        this.changeAnswerProperty("answersCopy", this.state.answers
            .filter(answer => answer.question === this.state.currentQuestion)
            .sort((a, b) => b.votes - a.votes));
    }

    handleVoteCount(answerToBeVoted, voteText) {

        modelVoteAnswer.findVoteForAnswer(this.state.currentUser, answerToBeVoted, voteText);
        if (this.state.allowVote) {
            var index = this.state.answers.indexOf(answerToBeVoted);
            if (!this.state.isAnswerVoted) {
                if (voteText === "up")
                    this.changeAnAnswerTextProperty("votes", answerToBeVoted.votes + 1, index);
                else
                    this.changeAnAnswerTextProperty("votes", answerToBeVoted.votes - 1, index);
            }
            else {
                if (voteText === "up")
                    this.changeAnAnswerTextProperty("votes", answerToBeVoted.votes + 2, index);
                else
                    this.changeAnAnswerTextProperty("votes", answerToBeVoted.votes - 2, index);
            }
        }
    }

    updatePoints(answerToBeVoted){

        var answerIndex;
        for (let i = 0; i < this.state.answers.length; i++) {
            if (this.state.answers[i] === answerToBeVoted)
                answerIndex = i;
                break;
        }
        modelVoteAnswer.updatePoints(answerToBeVoted, answerIndex);
        
    }

    deleteAnswer(answerToBeDeleted) {

        this.state.answers.splice(this.state.answers.indexOf(answerToBeDeleted), 1);
        this.sortAnswersByVotes();

    }

    setAnswersToQuestion(currentQuestion) {
        for (let i = 0; i < this.state.answers.length; i++) {
            if (this.state.answers[i].question === currentQuestion)
                this.changeAnAnswerTextProperty("question", modelQuestion.state.currentQuestion, i);
        }
    }
}

const answer = new Answer();

export default answer;