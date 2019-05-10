import { EventEmitter } from "events";
import modelLogin from "./Login";
import modelVoteQuestion from "./VoteQuestion";

class Question extends EventEmitter {
    constructor() {
        super();
        this.state = {
            questions: [{
                author: modelLogin.state.users[0],
                title: "Dependency Injection in Spring",
                text: "How does dependency injetion work in Java Spring?",
                date: new Date(),
                tags: ["dependency-injection", "spring"],
                votes: 0
            }, {
                author: modelLogin.state.users[1],
                title: "Leaks",
                text: "What are memory leaks and how can one fix them?",
                date: new Date(),
                tags: ["memory", "leaks"],
                votes: 0
            }],
            newQuestion: {
                author: {},
                title: "",
                text: "",
                date: new Date(),
                tags: "",
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

            allTags: ["memory", "leaks", "dependency-injection", "spring"],
            searchFieldTitle: "",
            searchFieldTag: "",
            questionsCopy: [{}],
            allowVote: false,
            isQuestionVoted: false


        };
        this.changeQuestionProperty("questionsCopy", this.state.questions);
    }

    addQuestion(author, title, text, tags, date, votes) {
        this.state = {
            ...this.state,
            questions: this.state.questions.concat([{
                author: author,
                title: title,
                text: text,
                tags: tags,
                date: date,
                votes: votes
            }])
        };
        this.emit("change", this.state);
    }

    addCopyQuestion(author, title, text, tags, date, votes) {
        this.state = {
            ...this.state,
            questionsCopy: this.state.questionsCopy.concat([{
                author: author,
                title: title,
                text: text,
                tags: tags,
                date: date,
                votes: votes
            }])
        };
        this.emit("change", this.state);
    }

    addTag(tag) {
        this.state = {
            ...this.state,
            allTags: this.state.allTags.concat(tag)
        };
        this.emit("change", this.state);
    }


    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            [property]: value
        };
        this.emit("change", this.state);
    }

    changeAQuestionFieldProperty(property, value, index) {
        this.state = {
            ...this.state,
            questions: {
                ...this.state.questions,
                [index]: {
                    ...this.state.questions[index],
                    [property]: value
                }
            }
        };
        this.emit("change", this.state);
    }

    sortQuestions() {

        this.changeQuestionProperty("questions", Object.keys(this.state.questions).map(key => this.state.questions[key]));
        this.changeQuestionProperty("questionsCopy", this.state.questions.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }

    filterByTags(searchFieldTag) {

        if (searchFieldTag !== "") {
            var filtered;
            var splitTags = searchFieldTag.trim().split(" ");
            if (splitTags.length === 1) {
                filtered = this.state.questionsCopy.filter(t => t.tags.includes(searchFieldTag.trim()));
                this.changeQuestionProperty("questionsCopy", filtered.sort((a, b) => b.date.getTime() - a.date.getTime()))
            }
            else {
                for (let i = 0; i < splitTags.length; i++) {
                    filtered = this.state.questionsCopy.filter(t => t.tags.includes(splitTags[i]));
                    this.changeQuestionProperty("questionsCopy", filtered.sort((a, b) => b.date.getTime() - a.date.getTime()))
                }
            }
        }
    }

    filterByTitle(searchFieldTitle) {
        var filtered = this.state.questionsCopy.filter(t => t.title.toLowerCase().includes(searchFieldTitle.toLowerCase()));
        this.changeQuestionProperty("questionsCopy", filtered.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }

    addNewTags(newTags) {

        for (let i = 0; i < newTags.length; i++) {
            if (!this.state.allTags.includes(newTags[i]))
                this.addTag(newTags[i]);
        }
    }

    handleVoteCount(currentQuestion, currentUser, voteText) {

        this.changeQuestionProperty("questions", Object.keys(this.state.questions).map(key => this.state.questions[key]));
        modelVoteQuestion.findVoteForQuestion(currentUser, currentQuestion, voteText);
        var index;
        if (this.state.allowVote) {
            for (let i = 0; i < this.state.questions.length; i++) {
                if (this.state.questions[i].title === currentQuestion.title) {
                    index = i;
                    break;
                }
            }
            if (!this.state.isQuestionVoted) {
                if (voteText === "up")
                    this.changeAQuestionFieldProperty("votes", currentQuestion.votes + 1, index);
                else
                    this.changeAQuestionFieldProperty("votes", currentQuestion.votes - 1, index);
            }
            else {
                if (voteText === "up")
                    this.changeAQuestionFieldProperty("votes", currentQuestion.votes + 2, index);
                else
                    this.changeAQuestionFieldProperty("votes", currentQuestion.votes - 2, index);
            }

            this.changeQuestionProperty("currentQuestion", this.state.questions[index]);
        }
    }

    updatePoints(questionToBeVoted){
        var questionIndex;
        for (let i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i] === questionToBeVoted)
                questionIndex = i;
                break;
        }
        modelVoteQuestion.updatePoints(questionToBeVoted, questionIndex);
    }

    deleteQuestion(questionToBeDeleted){

        this.state.questions.splice(this.state.questions.indexOf(questionToBeDeleted), 1);
      
    }
}

const question = new Question();

export default question;