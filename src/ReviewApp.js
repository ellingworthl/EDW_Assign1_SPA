import React from 'react';
import _ from 'lodash';
import api from './data/stubAPI';

//new import to support routing
import { Link } from 'react-router';

var Form = React.createClass({
   getInitialState: function() {
       return { title: '', link: ''};
    },
    handleTitleChange: function(e) {
       this.setState({title: e.target.value});
     },
     handleLinkChange: function(e) {
        this.setState({link: e.target.value});
     },
     handleSubmit : function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var link = this.state.link.trim();
        if (!title ) {
            return;
        }
        this.props.addHandler(title,link );
        this.setState({title: '', link: ''});
     },

     render : function() {
       return (
         <form style={{marginTop: '30px'}}>
            <h3>Add a new post</h3>
            <div className="form-group">
              <input type="text"
                className="form-control" placeholder="REVIEW TITLE"
                value={this.state.title}
                onChange={this.handleTitleChange} ></input>
            </div>

            <div className="form-group">
              <input type="text"
                 className="form-control" placeholder="RELATED LINK"
                 value={this.state.link}
                 onChange={this.handleLinkChange} ></input>
            </div>

            <button type="submit" className="btn btn-primary"
                 onClick={this.handleSubmit} >Post</button>
          </form>
        );
      }
   });

//react router tag "Link to" added to replace "a href=" HTML hyperlink tag
var NewsItem = React.createClass({
    handleVote : function() {
      this.props.upvoteHandler(this.props.post.id);
    },
    render : function() {
var lineStyle = {
     fontSize: '20px', marginLeft: '10px'  };
var cursor = { cursor: 'pointer' } ;
var line ;
    if (this.props.post.link ) {
       line = <a href={this.props.post.link} >
                    {this.props.post.title} </a> ;
    } else {
       line = <span>{this.props.post.title} </span> ;
    }
      return (
      <div >
        <span className="glyphicon glyphicon-thumbs-up" 
            style={cursor} 
            onClick={this.handleVote} ></span>
            {this.props.post.upvotes}
          <span style={lineStyle} >{line}<span>
            <Link to={'/posts/' + this.props.post.id }>Comments</Link>
          </span>
        </span>
      </div>  
    );
  }
}) ;

var NewsList = React.createClass({
    render : function() {  
      var items = this.props.posts.map(function(post,index) {
         return <NewsItem key={index} post={post} 
            upvoteHandler={this.props.upvoteHandler}  /> ;
        }.bind(this) )
    return (
      <div>
        {items}
      </div>
    );
  }
}) ;  

var ReviewApp = React.createClass({ 
    componentWillUnmount: function() {
       api.persist() ;
    },
    addPost : function(t,l) {   
      if (api.add(t,l)) {  
         this.setState({});
      }
    }, 
    incrementUpvote : function(id) {
      api.upvote(id) ;
      this.setState({});
    },    
    render: function(){
        var posts = _.sortBy(api.getAll(), function(post) {
                return - post.upvotes;
             }
          );
        return (
           <div >		   
      <h1>Reviews and feedback</h1>
      <p>Please find below a selection of reviews and links related to Field Archery.  Reviews are sorted by most popular ('thumbs-up').</p>
       
               <NewsList posts={posts} 
                    upvoteHandler={this.incrementUpvote} />
               <Form addHandler={this.addPost}  />
          </div>
        );
    }
});

export default ReviewApp;
