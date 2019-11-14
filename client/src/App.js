import React from 'react';
import {
  HashRouter as Router, 
  Route
} from 'react-router-dom';
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import './App.css';
import TagList from "./components/Tag/TagList";
import TagNew from "./components/Tag/TagNew";
import TagEdit from "./components/Tag/TagEdit";
import QuestionList from "./components/Question/QuestionList";
import QuestionNew from "./components/Question/QuestionNew";
import QuestionEdit from "./components/Question/QuesitonEdit";
import AnswerList from "./components/Answer/AnswerList";
import AnswerEdit from "./components/Answer/AnswerEdit";
import AnswerNew from "./components/Answer/AnswerNew";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={PostList} />
        <Route exact path="/posts/new" component={NewPost} />

        <Route exact path="/tags" component={TagList} />
        <Route exact path="/tags/new" component={TagNew} />
        <Route exact path="/tags/edit/:id" component={TagEdit} />

        <Route exact path="/questions" component={QuestionList} />
        <Route exact path="/questions/new" component={QuestionNew} />
        <Route exact path="/questions/edit/:id" component={QuestionEdit} />

        <Route exact path="/answers" component={AnswerList} />
        <Route exact path="/answers/:question_id/new" component={AnswerNew} />
        <Route exact path="/answers/edit/:id" component={AnswerEdit} />
      </div>
    </Router>
  );
}

export default App;