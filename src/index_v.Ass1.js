import React from 'react';
import ReactDOM from 'react-dom';
//import ReviewApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import '../src/css/bootstrap.css';


//new import requirements for routing changes
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//import NavBar from './content/NavBar';
//import Footer from './content/Footer';
import Landing from './content/Landing';
import Main from './content/Main';
import About from './content/About';
import ReviewApp from './ReviewApp';
import CommentView from './commentPage'
import RegisterApp from './registerApp';
import VenueApp from './VenueApp';


// ReactDOM.render statement for routing
     ReactDOM.render(
         (
          <Router history={browserHistory} >
            <Route path="/" component={Main}>
               <IndexRoute component={Landing}/>
               <Route path='about' component={About} />
               <Route path='reviews' component={ReviewApp} />
               <Route path= 'posts/:postId' component={CommentView} />
               <Route path='venues' component={VenueApp} />
               <Route path='register' component={RegisterApp} />
            </Route>
          </Router>
        ),
          document.getElementById('root')
      );
