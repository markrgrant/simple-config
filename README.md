simple-config
=============

Transform a configuration definition object into a configuration object based on user input. 

Use
---
```javascript
  function done(conf) {
  ...
  }
  
  configure(conf-defs, done);
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
