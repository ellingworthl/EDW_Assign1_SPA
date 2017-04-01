import React from 'react';
import request from 'superagent' ; 

var Specification = React.createClass({
	  render: function(){
	  	  var phone = this.props.phone ;	

          var display = (
			
			<div className="container">
				<dd>{phone.name}</dd>

				<dd>{phone.facilities.parking}</dd>
				<dd>{phone.facilities.toilet}</dd>
				<dd>{phone.facilities.refreshments}</dd>
				<dd>{phone.facilities.other}</dd> 

				//<dd>{phone.id}</dd>

				//<dd>{phone.images}</dd>

				//<dd>{phone.venue.type}</dd>
				//<dd>{phone.venue.link}</dd>

				//<dd>{phone.directions}</dd>		
						
				//<dd>{phone.description}</dd>

				//<dd>{phone.amenities.accommodation}</dd>
				//<dd>{phone.amenities.shop}</dd>
				//<dd>{phone.amenities.garage}</dd>

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