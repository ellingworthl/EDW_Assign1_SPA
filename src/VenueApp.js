import React from 'react';
import _ from 'lodash';
//new import to support routing
import { Link } from 'react-router';
//import venue data
import Venues from './venueData';

var SelectBox = React.createClass({
    handleChange : function(e, type,value) {
         e.preventDefault();
         this.props.onUserInput( type,value);
    },
    handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
    },
    handleSortChange : function(e) {
        this.handleChange(e, 'sort', e.target.value);
    },
    render: function(){
         return (
           <div className="col-md-10">
           <input type="text" placeholder="Search" 
                        value={this.props.filterText}
                        onChange={this.handleTextChange} />
         Sort by:
             <select id="sort" value={this.props.order } 
                       onChange={this.handleSortChange} >
             <option value="name">Venue name</option>
             <option value="county">County</option>
         </select>
           </div>
          );
        }
     });

     //react router tag "Link " added to replace "a href" HTML hyperlink tag
     var VenueItem = React.createClass({
      render: function(){
        //console.log ('VenueItem');
        //console.log (this.props.venue.name);
        return (
        <li className="thumbnail venue-listing">
        <Link to={'/venues/' + this.props.venue.id} className="thumb">
        <img src={"/images/" + this.props.venue.imageUrl} 
        alt={this.props.venue.name} /> </Link>
        <Link to={'/venue/' + this.props.venue.id}> {this.props.venue.name}</Link>
        <p>{this.props.venue.snippet}</p>
        <p>{this.props.venue.county}</p>
        <p>{this.props.venue.phoneno}</p>
        </li>
        );
      }
    });

var FilteredVenueList = React.createClass({
render: function(){
//console.log ('FilteredVenueList');
//console.log (this.props.venues);
  var displayedVenues = this.props.venues.map(function(venue) {
    return <VenueItem key={venue.id} venue={venue} /> ;
  }) ;
  return (
          <div className="col-md-10">
            <ul className="venues">
                {displayedVenues}
            </ul>
          </div>
    ) ;
}
});

var VenueApp = React.createClass({
getInitialState: function() {
     return { search: '', sort: 'name' } ;
}, 
handleChange : function(type,value) {
      if ( type === 'search' ) {
          this.setState( { search: value } ) ;
        } else {
           this.setState( { sort: value } ) ;
        }
}, 
 render: function(){
     var list = Venues.filter(function(p) {
            return p.name.toLowerCase().search(
                   this.state.search.toLowerCase() ) !== -1 ;
              }.bind(this) );
     var filteredList = _.sortBy(list, this.state.sort) ;
     return (
        <div className="view-container">
        <div className="view-frame">
           <div className="container-fluid">
             <div className="row">
                <SelectBox onUserInput={this.handleChange } 
                       filterText={this.state.search} 
                       sort={this.state.sort} />
                 <FilteredVenueList venues={filteredList} />
            </div> 
            </div>                   
          </div>
        </div>
    );
  }
});

export default VenueApp;