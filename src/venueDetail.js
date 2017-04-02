import React from 'react';
import request from 'superagent' ; 

var Specification = React.createClass({
	  render: function(){
	  	  var phone = this.props.phone ;	  	   
	  	  var association = phone.association.map(function(ass,index) {
              return (
              		 <dd key={index}>{ass}</dd>
                     ) ;
	  	      }) ;
          var display = (
            <div>
				<ul className="specs">
				  <li>
				    <span>Club Information</span>
				    <dl>
				      <dt>Name</dt>
				      <dd>{phone.name}</dd>
				      <dt>Venue Type</dt>
				      <dd>{phone.venue.type}</dd>
				      <dt>Website or Facebook URL</dt>
				      <dd>{phone.venue.link}</dd>					  
				    </dl>
				  </li>
				  <li >
				    <span>Governinging Body</span>
				    <dl>
				      <dt>Affiliated To</dt>
				         {association}
				    </dl>
				  </li>
				  <li>
				    <span>Venue Information</span>
				    <dl>
				      <dt>About the club & their venue</dt>
				      <dd>{phone.description}</dd>
				    </dl>
				  </li>
				  <li>
				    <span>Facilities available on-site</span>
				    <dl>
				      <dt>Parking</dt>
				      <dd>{phone.facilities.parking}</dd>
				      <dt>W/C</dt>
				      <dd>{phone.facilities.toilet}</dd>
				      <dt>Refreshments</dt>
				      <dd>{phone.facilities.refreshments}</dd>
				      <dt>Other</dt>
				      <dd>{phone.facilities.other}</dd>
				    </dl>
				  </li>	
				  <li>
				    <span>How to get there</span>
				    <dl>
				      <dt>Directions</dt>
				      <dd>{phone.directions}</dd>
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

var ImagesSection = React.createClass({
	  render: function(){
	  	  var thumbImages = this.props.phone.images.map(function(img,index) {
              return (
              	    <li>
                       <img key={index} src={"/phoneSpecs/" + img}
                           alt="missing" />
                    </li>
                    ) ;
	  	      } );
	  	  var mainImage = (
          	    <div className="phone-images">
				  <img src={"/phoneSpecs/" + this.props.phone.images[0]} 
				        alt={this.props.phone.name}
				        className="phone" />
				</div>
                ) ;
	  	return (
	  		<div>
                   {mainImage}
			       <h1>{this.props.phone.name}</h1>
		           <p>{this.props.phone.description}</p>
		           <ul className="phone-thumbs">
		               {thumbImages}
		           </ul>
               </div>
               );
	  }
})

var VenueDetail = React.createClass({
	   getInitialState: function() {
           return { phone: null };
       },
	 componentDidMount: function() {
	    request.get(
	         '/phoneSpecs/phones/' + this.props.params.id + '.json', 
	           function(err, res) {
	         	   var json = JSON.parse(res.text);
			       this.setState({ phone : json});
	             }.bind(this)
	         );
	  },
	  render: function(){
	      var display = <p>No venue information available</p> ; 
	  	  var phone = this.state.phone ;
          if (phone) {
  			display =  (
  				<div>
              	   <ImagesSection phone={phone} />
              	   <Specification  phone={phone} />  	 
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