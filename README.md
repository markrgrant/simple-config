<<<<<<< HEAD
The configure module takes the pathname of a configuration file
and adds a sequence of views
to the DOM. After receiving user input, the nodes are removed
and an array of variable name - value pairs is returned.  

To include the module: 

<script src="path/to/configures.js"></script> 

var conf = configure('path/to/config');

=======
simple-config
=============

Transform a configuration definition object into a configuration object based on user input. 

Use
---
```javascript
  function done(conf) {
  ...
  }
  
  simple-config(conf-defs, done);
```

Dependencies
------------

  document.body
  
  document.createElement
  
  document.onkeydown
  
  node.appendChild
  
  node.removeChild
  
Types
-----
```javascript
    conf-defs = [conf-def*]
  
     conf-def = {
                   name : conf-name,
                   description : String,
                   options : [conf-value*]
                  }
      
         conf = {conf-result*}
  
  conf-result = conf-name : conf-value
  
   conf-value = Object
   
    conf-name = String
```
>>>>>>> 8417041648961972c3572bf0e246d945747e756c
