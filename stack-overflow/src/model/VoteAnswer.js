import { EventEmitter } from "events";
import modelAnswer from "./Answer";
import modelLogin from "./Login";

class VoteAnswer extends EventEmitter {
    constructor() {
        super();
        this.state = {
            votedAnswers: [{


            }],

            currentAnswerToVote: {}
        };

    
    }

    addVotedAnswer(userGivesVote, userGetsVote, answerVoted, voteType) {
        this.state = {
            ...this.state,
            votedAnswers: Object.keys(this.state.votedAnswers).concat([{
                userGivesVote: userGivesVote,
                userGetsVote: userGetsVote,
                answerVoted: answerVoted,
                voteType: voteType
            }])
        };
        this.emit("change", this.state);
    }

    changeVoteAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            [property]: value
        };
        this.emit("change", this.state);
    }

    changeAnswerVoteProperty(property, value, index) {
        this.state = {
            ...this.state,
            votedAnswers: {
                ...this.state.votedAnswers,
                [index]: {
                    ...this.state.votedAnswers[index],
                    [property]: value
                }
            }
        };
        this.emit("change", this.state);
    }

    findVoteForAnswer(userGivesVote, answerToBeVoted, voteText) {

        var isAnswerVoted = false;
        var differentAnswerVote = false;
        var index;
        for (let i = 0; i < Object.keys(this.state.votedAnswers).length; i++) {

            var votedAnswer = this.state.votedAnswers[i];

            if (votedAnswer.userGivesVote === userGivesVote &&
                votedAnswer.answerVoted.author === answerToBeVoted.author && votedAnswer.answerVoted.text === answerToBeVoted.text &&
                votedAnswer.answerVoted.date === answerToBeVoted.date && votedAnswer.answerVoted.question === answerToBeVoted.question) {
                if (votedAnswer.voteType !== voteText) {

                    differentAnswerVote = true;
                    index = i;
                }

                isAnswerVoted = true;
                break;
            }
        }

        modelAnswer.changeAnswerProperty("allowVote", differentAnswerVote || !isAnswerVoted);
        modelAnswer.changeAnswerProperty("isAnswerVoted", isAnswerVoted);
        if (!isAnswerVoted) {
            this.addVotedAnswer(userGivesVote, answerToBeVoted.author, answerToBeVoted, voteText);
            index = this.state.votedAnswers.length - 1;
        }
        else
            if (differentAnswerVote)
                this.changeAnswerVoteProperty("voteType", voteText, index);
    }

    updatePoints(answerToBeVoted, answerIndex) {

        this.changeVoteAnswerProperty("votedAnswers", Object.keys(this.state.votedAnswers).map(key => this.state.votedAnswers[key]));
        var downVotes = this.state.votedAnswers.filter(v => v.voteType === "down" && answerToBeVoted === v.answerVoted).length;
        var upVotes = this.state.votedAnswers.filter(v => v.voteType === "up" && answerToBeVoted === v.answerVoted).length;

        var downVotesScore = downVotes * 2;
        var upVotesScore = upVotes * 10;

        var index;
        for (let i = 0; i < Object.keys(modelLogin.state.users).length; i++)
            if (answerToBeVoted.author.username === modelLogin.state.users[i].username) {
                index = i;
                break;
            }
      
        modelLogin.changeUserPointsProperty(answerToBeVoted.author.points + upVotesScore - downVotesScore, index);
        modelAnswer.changeAnAnswerCopyTextProperty("author", modelLogin.state.users[index], answerIndex);
        modelAnswer.changeAnAnswerTextProperty("author", modelLogin.state.users[index], answerIndex);
        modelLogin.changeLoginProperty("users", Object.keys(modelLogin.state.users).map(key => modelLogin.state.users[key]));
      
        console.log(index);
        console.log( answerToBeVoted.author.points);
        console.log( modelAnswer.state.answers[answerIndex].author.points);
        console.log( modelAnswer.state.answersCopy[answerIndex].author.points);
    }
}

const voteAnswer = new VoteAnswer();

export default voteAnswer;