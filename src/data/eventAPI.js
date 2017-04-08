import _ from 'lodash';

console.log ('init events')
var events = [
    {
        id: 1 ,
		"round": "IFAA Field",
        "venue": "Valley Bowmen",
        "date": "2017/04/23",
        "target_amt": "2x14"		
    },
    
    {	
		id: 2 ,
        "round": "IFAA UAR",
        "venue": "Wexford Archery",
        "date": "2017/05/07",
        "target_amt": "1x28"	
    },
    
    {
        id: 3 ,
		"round": "Hunting Trail",
        "venue": "South Cork Field Archers",
        "date": "2017/05/21"		,
        "target_amt": ">30"	
    },
    
    {
        id: 4 ,
		"round": "SBG",
        "venue": "Mayo Archery Club",
        "date": "2017/06/04",
        "target_amt": "1x36"	
    }
  ] ; 
//name = round // address = venue // phone_number = date // target_number = N/A column
var eventAPI = {
	 getAll : function() {
	     return events ;
	 },
	 add : function(r,v,d) {
      var len = events.length ;
      var newL_len = events.push({
         round: r, venue : v, date: d }) ;
      return newL_len > len ;
	 },
   delete : function(k) {
       var elements = _.remove(events, 
           function(event) {
                 return event.date === k;
              });
       return elements; 
   },   
	 update : function(key,r,v,d) {
	    var index = _.findIndex(events, function(event) {
	         return event.date === key;
	      } );      
	    if (index !== -1) {
	       events.splice(index, 1, {round: r, venue: v, date: d});
         return true ;
	      }
      return false ;
	 }
  }
  export default eventAPI ;