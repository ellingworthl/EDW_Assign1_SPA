import _ from 'lodash';

console.log ('init contacts')
var contacts = [
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
	 delete : function(k) {
       var elements = _.remove(contacts, 
           function(contact) {
                 return contact.phone_number === k;
              });
       return elements; 
	 },
	 getAll : function() {
	     return contacts ;
	 },
	 add : function(n,a,p) {
      var len = contacts.length ;
      var newL_len = contacts.push({
         name: n, address : a, phone_number: p }) ;
      return newL_len > len ;
	 },
	 update : function(key,n,a,p) {
	    var index = _.findIndex(contacts, function(contact) {
	         return contact.phone_number === key;
	      } );      
	    if (index !== -1) {
	       contacts.splice(index, 1, {name: n, address: a, phone_number: p});
         return true ;
	      }
      return false ;
	 }
  }
  export default eventAPI ;