import question from "../model/Question";
import modelLogin from "../model/Login";

class QuestionPresenter {

    

    onCreate() {
        
        var author = modelLogin.state.currentUser;
        var title = question.state.newQuestion.title;
        var text = question.state.newQuestion.text;
        var tags;

        if(question.state.newQuestion.tags.length !== 0)
        {
            tags = question.state.newQuestion.tags.split(" ");
            question.addNewTags(tags);
        }
        else
            tags = [];

        question.addQuestion(author, title, text, tags, new Date() , 0);
        question.addCopyQuestion(author, title, text, tags, new Date() , 0);

        question.changeNewQuestionProperty("title", "");
        question.changeNewQuestionProperty("text", "");
        question.changeNewQuestionProperty("tags", "");
        

        question.sortQuestions();
    }

    onChangeQuestion(property, value) {
       
        question.changeQuestionProperty(property, value);
    }    


    onChange(property, value) {
       
            question.changeNewQuestionProperty(property, value);
    }

    logOut()
    {
        modelLogin.changeLoginProperty("currentUser", "");
        window.location.assign("/#/");
    }

    showQuestions()
    {
        question.sortQuestions();
    }

    onFilterByTitle()
    {
        var searchFieldTitle = question.state.searchFieldTitle;
        question.filterByTitle(searchFieldTitle);
        question.changeQuestionProperty("searchFieldTitle", "");
    
    }

    onFilterByTags()
    {
        var searchFieldTag = question.state.searchFieldTag;
        question.filterByTags(searchFieldTag);
        question.changeQuestionProperty("searchFieldTag", "");

    }

    onQuestionClick(index, currentQuestion) {
        
        question.changeQuestionProperty("currentQuestion", currentQuestion);
        window.location.assign("#/questions/question/" + index);
    }
}

const questionPresenter = new QuestionPresenter();

export default questionPresenter;