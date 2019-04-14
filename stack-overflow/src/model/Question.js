import { EventEmitter } from "events";
import modelLogin from "./Login";
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
                votes: 5
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
                tags: [],
                votes: 0

            },

            allTags: ["memory", "leaks", "dependency-injection", "spring"],
            searchFieldTitle: "",
            searchFieldTag: "",
            copyQuestions: [{}]

        };
        this.changeQuestionProperty("copyQuestions", this.state.questions);
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
            copyQuestions: this.state.copyQuestions.concat([{
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

    sortQuestions() {

        this.changeQuestionProperty("questions", this.state.copyQuestions.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }

    filterByTags(searchFieldTag) {//arr.filter(f => !brr.includes(f));
        // let filtered = this.state.questions.filter(t => t.tags.includes(searchFieldTag));
        if (searchFieldTag !== "") {
            var filtered;
            var splitTags = searchFieldTag.trim().split(" ");
            if (splitTags.length === 1) {
                filtered = this.state.questions.filter(t => t.tags.includes(searchFieldTag.trim()));
                this.changeQuestionProperty("questions", filtered.sort((a, b) => b.date.getTime() - a.date.getTime()))
            }
            else {
                for (let i = 0; i < splitTags.length; i++) {
                    filtered = this.state.questions.filter(t => t.tags.includes(splitTags[i]));
                    this.changeQuestionProperty("questions", filtered.sort((a, b) => b.date.getTime() - a.date.getTime()))
                }
            }
        }
    }

    filterByTitle(searchFieldTitle) {
        var filtered = this.state.questions.filter(t => t.title.toLowerCase().includes(searchFieldTitle.toLowerCase()));
        this.changeQuestionProperty("questions", filtered.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }

    addNewTags(newTags) {
        //for (let i = 0; i < newTags.length; i++) {
        //   for (let j = 0; j < allTags.length; j++) {

        // }
        //}
        for (let i = 0; i < newTags.length; i++) {
            if(!this.state.allTags.includes(newTags[i]))
                this.addTag(newTags[i]);
        }
    }
}

const question = new Question();

export default question;