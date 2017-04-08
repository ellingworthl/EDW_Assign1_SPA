import React from 'react';
import api from './data/eventAPI';
import buttons from './content/eventButtons';

//name = round // address = venue // phone_number = date // target_number = N/A column
//need to sort to have date (ph) added under DATE and round (name) added under ROUND

//Contact = Event
//Contacts = Events

    var EventForm = React.createClass({
        getInitialState: function() {
           return { round: '', venue: '', date : ''};
       },
       handleRoundChange: function(e) {
            this.setState({round: e.target.value});
       },
       handleVenueChange: function(e) {
           this.setState({venue: e.target.value});
       },
       handleDateChange: function(e) {
           this.setState({date: e.target.value});
       },
       handleSubmit: function(e) {
        e.preventDefault();
        var round = this.state.round.trim();
        var venue = this.state.venue.trim();
        var date = this.state.date.trim();
        if (!round || !venue || !date) {
          return;
        }
        this.props.addHandler(round,venue,date);
        this.setState({round: '', venue: '', date: ''});
       },  
       render: function(){
          return (
            <tr>
              <td>
              <input type="text" className="form-control" 
                     placeholder="Event Type"
                     value={this.state.round}
                     onChange={this.handleRoundChange}
              />
              </td>
              <td>
              <input type="text" className="form-control"
                     placeholder="Host Club/Venue"
                     value={this.state.venue}
                     onChange={this.handleVenueChange}
              />
              </td>
              <td>
              <input type="text" className="form-control" 
                     placeholder="Date (YYYY/MM/DD)"
                     value={this.state.date}
                     onChange={this.handleDateChange}
              />
              </td>
              <td>
              <input type="button" className="btn btn-primary" value="Add"
                       onClick={this.handleSubmit} />
              </td>
            </tr>
            )
        }
      });

    var Event = React.createClass({
          getInitialState : function() {
             return {
              status : '',
              round: this.props.event.round,
              venue: this.props.event.venue,
              date: this.props.event.date
             } ;
          },
          handleDelete : function() {
             this.setState({ status : 'del'} )
          },
          handleEdit : function() {
              this.setState({ status : 'edit'} )
          }, 
          handleConfirm : function(e) { 
              this.props.deleteHandler(this.props.event.date) ;//Handler uses the key / k
          },    
          handleCancel : function() {
             this.setState({ status : '', 
                   round: this.props.event.round,
                   venue: this.props.event.venue,
                   date: this.props.event.date} ) ;
            }, 
          handleSave : function(e) {
              e.preventDefault();
              var round = this.state.round.trim();
              var venue = this.state.venue.trim();
              var date = this.state.date.trim();
              if (!round || !venue || !date) {
                return;
              }
                            this.setState({status : ''} )
              this.props.updateHandler(this.props.event.date,
                       round,venue,date);// this.props.event.date part of the key

            }, 
          handleRoundChange: function(e) {
              this.setState({round: e.target.value});
            },
          handleVenueChange: function(e) {
              this.setState({venue: e.target.value});
            },
          handleDateChange: function(e) {
              this.setState({date: e.target.value});
            },
          render: function(){
               var activeButtons = buttons.normal ;
               var leftButtonHandler = this.handleEdit ;
               var rightButtonHandler = this.handleDelete ;
               var fields = [
                     <td key={'round'} >{this.state.round}</td>,
                      <td key={'venue'}>{this.state.venue}</td>,
                      <td key={'date'}>{this.state.date}</td>
                   ] ;
              if (this.state.status === 'del' ) {
                   activeButtons = buttons.delete ;
                   leftButtonHandler = this.handleCancel;
                   rightButtonHandler = this.handleConfirm ;
              } else if (this.state.status === 'edit' ) {
                   activeButtons = buttons.edit ;
                   leftButtonHandler = this.handleSave;
                   rightButtonHandler = this.handleCancel ;
                   fields = [
                      <td key={'round'}><input type="text" className="form-control"
                         value={this.state.round}
                         onChange={this.handleRoundChange} /> </td>,
                      <td key={'venue'}><input type="text" className="form-control"
                         value={this.state.venue}
                         onChange={this.handleVenueChange} /> </td>,
                      <td key={'date'}><input type="text" className="form-control"
                         value={this.state.date}
                         onChange={this.handleDateChange} /> </td>,
                   ] ;
               }
              return (
                    <tr >
                      {fields}
                      <td>
                          <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                 value={activeButtons.leftButtonVal}
                                 onClick={leftButtonHandler} />
                      </td>
                      <td>
                         <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                               value={activeButtons.rightButtonVal} 
                               onClick={rightButtonHandler} />
                      </td>
                      </tr>
                   ) ;
            }
          });

    var EventList = React.createClass({
          render: function(){
              var eventRows = this.props.events.map(function(event){
                  return (
                   <Event key={event.date}  event={event} 
                       deleteHandler={this.props.deleteHandler} 
                       updateHandler={this.props.updateHandler} />
                    ) ;
                }.bind(this) );
              return (
                  <tbody >
                      {eventRows}
                      <EventForm 
                           addHandler={this.props.addHandler}/>
                  </tbody>
                ) ;
            }
          });

//TABLE FORMAT		  
// ORIG: <table className="table table-bordered">	
// ALT FORMATS:http://allenfang.github.io/react-bootstrap-table/example.html#basic  
    var EventsTable = React.createClass({
          render: function(){
              return (
				<table className="table table-striped table-hover table-condensed">
                    <thead>
                      <tr>
                      <th>EVENT</th>
                      <th>VENUE</th>
                      <th>DATE</th>
                      <th></th>
                      <th></th>
                      </tr>
                    </thead>
                      <EventList events={this.props.events} 
                          deleteHandler={this.props.deleteHandler} 
                          addHandler={this.props.addHandler}
                           updateHandler={this.props.updateHandler}  />
                </table>
                );
          }
      });

//name = date // address = venue // phone_number = round // target_number = N/A column
      var EventApp = React.createClass({
          deleteEvent : function(k) {
             api.delete(k);
             this.setState( {} ) ;
          },
          addEvent : function(r,v,d) {
             api.add(r,v,d) ;
             this.setState({});
          },
          updateEvent : function(key,r,v,d) {
              if (api.update(key,r,v,d) )  { 
                  this.setState({});  
              }             
          },  
          render: function(){
              var events = api.getAll() ; 
              return (    
                    <div>
                       <h1>Upcoming Archery Events</h1>
					   <p>Country-wide competitions are listed here. </p>
					   <p>Check regularly for new events and updates to any published events.</p>
                       <EventsTable events={events} 
                          deleteHandler={this.deleteEvent}
                          addHandler={this.addEvent} 
                          updateHandler={this.updateEvent}  />
                    </div>
              );
          }
      });
	  
export default EventApp;