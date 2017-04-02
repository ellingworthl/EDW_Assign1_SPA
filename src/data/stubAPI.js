import _ from 'lodash';

var posts = null ;
if ( localStorage.getItem('posts') ) {
     posts = JSON.parse(localStorage.getItem('posts')) ;
     localStorage.setItem('updated',false ) ;
} else { 
    posts = [
     {  id: 1 ,
        title : 'IFAF is great for Field Archery in Ireland',
        link : 'http://ifaf.ie/wordpress/',
        forename : 'Marion',
        surname : 'Hood',
        association : 'IFAF',
        comments : [],
        upvotes : 10
      },
     { 
        id: 2,
        title : 'International Field Archery Assn: Q1 2017 newsletter is out!',
        link : 'http://www.ifaa-archery.org/index.php/ifaa-newsletters/2017',
        forename : 'William',
        surname : 'Tell',
        association : 'FAAS',
        comments : [],
        upvotes : 9
      },
      { 
        id: 3,
        title : 'Membership in NFAS (UK) nearing 10k',
        link : 'http://www.nfas.net/home.asp',
        forename : 'Rob',
        surname : 'Hood',
        association : 'EFAA',
        comments : [],
        upvotes : 5
      },
      { 
        id: 4,
        title : 'New site with loads of FREE online archery games. Great fun.',
        link : 'http://www.bgames.com/archery-games/',
        forename : 'Friar',
        surname : 'Tuck',
        association : 'AAE',
        comments : [],
        upvotes : 2
      }
  ] ;
  localStorage.setItem('posts', JSON.stringify(posts)) ;
  localStorage.setItem('updated', false ) ;
}
 
  var stubAPI = {
     getAll : function() {
        return posts ;
      },
     add : function(t,l) {
          var id = 1 ;
          var last = _.last(posts) ;
          if (last) {
             id = last.id + 1 ;
          }
          var len = posts.length ;
          var newL_len = posts.push({ 
          	'id': id,  
             title: t, link : l, username: '', comments: [], upvotes: 0 }) ;
           localStorage.setItem('updated', true ) ;
           return newL_len > len ;
          },
     upvote : function(id) {
         var index = _.findIndex(posts, 
         	  function(post) {
                return post.id === id;
              } );   
         if (index !== -1) {                 
              posts[index].upvotes += 1 ;
              localStorage.setItem('updated', true ) ;
              return true ;
            }
          return false ;
       },
     getPost : function(id) {
         var result = null ;
         var index = _.findIndex(posts, function(post) {
                return post.id === id;
                } );     
         if (index !== -1) {                 
            result = posts[index];
                }
        return result ;
        },
     addComment : function(postId,c,n) {
        var post = this.getPost(postId ) ;
        var id = 1 ;
        var last = _.last(post.comments) ;
        if (last) {
           id = last.id + 1 ;
        }
        post.comments.push({ 'id': id,  
                 comment: c , author: n, upvotes: 0 } ) ;
        localStorage.setItem('updated', true ) ;
        },
     upvoteComment : function(postId,commentId) {
        var post = this.getPost(postId ) ;
        var index = _.findIndex(post.comments, function(c) {
                  return c.id === commentId;
                } );  
         if (index !== -1) {                 
             post.comments[index].upvotes += 1 ;
             localStorage.setItem('updated', true ) ;
            }

      },
      persist: function() {
        if (localStorage.getItem('updated') === 'true') { 
          localStorage.setItem('updated',false ) ;
          localStorage.setItem('posts', JSON.stringify(posts)) ;
        }
      }
  }
export default stubAPI ;