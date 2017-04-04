import React from 'react';
import request from 'superagent' ; 

var Specification = React.createClass({
	  render: function(){
	  	  var venue = this.props.venue ;	  	   
	  	  var association = venue.association.map(function(ass,index) {
              return (
              		 <dd key={index}>{ass}</dd>
                     ) ;
	  	      }) ;
          var display = (
            <div>
				<ul className="specs">
				  <li >
				    <span>Governinging Body</span>
				    <dl>
				      <dt>Affiliated To</dt>
				         {association}
				    </dl>
				  </li>				  
				  <li>
				    <span>Club Information</span>
				    <dl>
				      <dt>Name</dt>
				      <dd>{venue.name}</dd>
				      <dt>Venue Type</dt>
				      <dd>{venue.venue.type}</dd>
				      <dt>Website or Facebook URL</dt>
				      <dd>{venue.venue.link}</dd>					  
				    </dl>
				  </li>
				  <li>
				    <span>Venue Information</span>
				    <dl>
				      <dt>About the club & their venue</dt>
				      <dd>{venue.description}</dd>
				    </dl>
				  </li>
				  <li>
				    <span>Facilities available on-site</span>
				    <dl>
				      <dt>Parking</dt>
				      <dd>{venue.facilities.parking}</dd>
				      <dt>W/C</dt>
				      <dd>{venue.facilities.toilet}</dd>
				      <dt>Refreshments</dt>
				      <dd>{venue.facilities.refreshments}</dd>
				      <dt>Other</dt>
				      <dd>{venue.facilities.other}</dd>
				    </dl>
				  </li>	
				  <li>
				    <span>How to get there</span>
				    <dl>
				      <dt>Directions</dt>
				      <dd>{venue.directions}</dd>
				    </dl>
				  </li> 				  
				</ul>  
            </div>
	       )
	  	  return (
	  	       <div>
                  {display}
              </div>
	         );
      }
  });

//cosmetic. if parent folder of img renamed, link breaks
var ImagesSection = React.createClass({
	  render: function(){
	  	  var thumbImages = this.props.venue.images.map(function(img,index) {
              return (
              	    <li>
                       <img key={index} src={"/venueSpecs/" + img}
                           alt="missing" />
                    </li>
                    ) ;
	  	      } );
	  	  var mainImage = (
          	    <div className="venue-images">
				  <img src={"/venueSpecs/" + this.props.venue.images[0]} 
				        alt={this.props.venue.name}
				        className="venue" />
				</div>
                ) ;
	  	return (
	  		<div>
                   {mainImage}
			       <h1>{this.props.venue.name}</h1>
		           <p>{this.props.venue.description}</p>
		           <ul className="venue-thumbs">
		               {thumbImages}
		           </ul>
               </div>
               );
	  }
})

var VenueDetail = React.createClass({
	   getInitialState: function() {
           return { venue: null };
       },
	 componentDidMount: function() {
	    request.get(
	         '/venueSpecs/venues/' + this.props.params.id + '.json', 
	           function(err, res) {
	         	   var json = JSON.parse(res.text);
			       this.setState({ venue : json});
	             }.bind(this)
	         );
	  },
	  render: function(){
	      var display = <p>No venue information available</p> ; 
	  	  var venue = this.state.venue ;
          if (venue) {
  			display =  (
  				<div>
              	   <ImagesSection venue={venue} />
              	   <Specification  venue={venue} />  	 
                </div>
                )
          }
	  	  return (
	  	  	    <div>
                  {display}
                </div>
	            );
	  }
	});

export default VenueDetail;