simple-config
=============

Transform a configuration definition object into a configuration object based on user input. 

Use:
  
  function done(conf) {
  ...
  }
  
  simple-config(<conf-defs>, done);

Dependencies:

  document.body
  
Types:

    conf-defs ::= [<conf-def>*]
  
     conf-def ::= {
                   name : <conf-name>,
                   description : <string>,
                   options : [<conf-value>*]
                  }
      
         conf ::= {<conf-result>*}
  
  conf-result ::= <conf-name> : <conf-value>
  
   conf-value ::= <object>
   
    conf-name ::= <string>

