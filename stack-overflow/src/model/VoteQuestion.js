import { EventEmitter } from "events";
import modelQuestion from "./Question";
import modelLogin from "./Login";

class VoteQuestion extends EventEmitter {
    constructor() {
        super();
        this.state = {
            votedQuestions: [{

               
            }],
        };
    }

    addVotedQuestion(userGivesVote, userGetsVote, questionVoted, voteType) {
        this.state = {
            ...this.state,
            votedQuestions: Object.keys(this.state.votedQuestions).concat([{
                userGivesVote: userGivesVote,
                userGetsVote: userGetsVote,
                questionVoted: questionVoted,
                voteType: voteType
            }])
        };
        this.emit("change", this.state);
    }

    changeQuestionVoteProperty(property, value, index) {
        this.state = {
            ...this.state,
            votedQuestions: {
                ...this.state.votedQuestions,
                [index]: {
                    ...this.state.votedQuestions[index],
                    [property]: value
                }
            }
        };
        this.emit("change", this.state);
    }

    findVoteForQuestion(userGivesVote, questionToBeVoted, voteText) {

        var isQuestionVoted = false;
        var differentQuestionVote = false;
        var index;
        for (let i = 0; i < Object.keys(this.state.votedQuestions).length; i++) {

            var votedQuestion = this.state.votedQuestions[i];

            if (votedQuestion.userGivesVote === userGivesVote &&
                votedQuestion.questionVoted.author === questionToBeVoted.author && votedQuestion.questionVoted.text === questionToBeVoted.text &&
                votedQuestion.questionVoted.date === questionToBeVoted.date && votedQuestion.questionVoted.tags === questionToBeVoted.tags &&
                votedQuestion.questionVoted.title === questionToBeVoted.title) {
                if (votedQuestion.voteType !== voteText) {

                    differentQuestionVote = true;
                    index = i;
                }

                isQuestionVoted = true;
                break;
            }
        }

        modelQuestion.changeQuestionProperty("allowVote", differentQuestionVote || !isQuestionVoted);
        modelQuestion.changeQuestionProperty("isQuestionVoted", isQuestionVoted);
        if (!isQuestionVoted)
            this.addVotedQuestion(userGivesVote, questionToBeVoted.author, questionToBeVoted, voteText);

        else
            if (differentQuestionVote)
                this.changeQuestionVoteProperty("voteType", voteText, index);

    }

    updatePoints(questionToBeVoted, questionIndex) {

        this.changeVoteQuestionProperty("votedQuestions", Object.keys(this.state.votedQuestions).map(key => this.state.votedQuestions[key]));
        var downVotes = this.state.votedQuestions.filter(v => v.voteType === "down" && questionToBeVoted === v.questionVoted).length;
        var upVotes = this.state.votedQuestions.filter(v => v.voteType === "up" && questionToBeVoted === v.questionVoted).length;

        var downVotesScore = downVotes * 2;
        var upVotesScore = upVotes * 5;

        
        var index 
        for (let i = 0; i < Object.keys(modelLogin.state.users).length; i++)
            if (questionToBeVoted.author.username === modelLogin.state.users[i].username) {
                index = i;
                break;
            }
        modelLogin.changeUserPointsProperty(questionToBeVoted.author.points + upVotesScore - downVotesScore, index);
        modelQuestion.changeAQuestionFieldProperty("author", modelLogin.state.users[index], questionIndex);
        modelLogin.changeLoginProperty("users", Object.keys(modelLogin.state.users).map(key => modelLogin.state.users[key]));
        console.log(index);
        console.log( modelLogin.state.users[index]);
        console.log( modelLogin.state.users);
    }
}

const voteQuestion = new VoteQuestion();

export default voteQuestion;