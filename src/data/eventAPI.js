import _ from 'lodash';

console.log ('init events')
var events = [
    {
        id: 1 ,
		"name": "23-Apr-17",
        "address": "Valley Bowmen",
        "phone_number": "IFAA Field",
        "target_number": "2x14"		
    },
    
    {	
		id: 2 ,
        "name": "07-May-17",
        "address": "Wexford Archery",
        "phone_number": "IFAA UAR",
        "target_number": "1x"	
    },
    
    {
        id: 3 ,
		"name": "21-May-17",
        "address": "South Cork Field Archers",
        "phone_number": "Hunting Trail"		,
        "target_number": ">30"	
    },
    
    {
        id: 4 ,
		"name": "04-Jun-17",
        "address": "Mayo Archery Club",
        "phone_number": "SBG",
        "target_number": "1x36"	
    }
  ] ; 
//name = date // address = venue // phone_number = round // target_number = N/A column
//make key the date (was phone_number)
var eventAPI = {
	 getAll : function() {
	     return events ;
	 },
	 add : function(n,a,p) {
      var len = events.length ;
      var newL_len = events.push({
         name: n, address : a, phone_number: p }) ;
      return newL_len > len ;
	 },
   delete : function(k) {
       var elements = _.remove(events, 
           function(event) {
                 return event.phone_number === k;
              });
       return elements; 
   },   
	 update : function(key,n,a,p) {
	    var index = _.findIndex(events, function(event) {
	         return event.phone_number === key;
	      } );      
	    if (index !== -1) {
	       events.splice(index, 1, {name: n, address: a, phone_number: p});
         return true ;
	      }
      return false ;
	 }
  }
  export default eventAPI ;