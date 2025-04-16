// amazon_tools.js
// Reference: https://stackoverflow.com/a/5801971
// ========
module.exports = {
    extractASIN: function (url) {
        try {
            let result = url.match(/^(.*https:\/\/.*\/dp\/)(.*)(\?*.*)$/);
            console.log("amazon-debug 30");  
      
            console.log("amazon-urlRegex[0]: " + result[0]);
            console.log("amazon-urlRegex[1]: " + result[1]);
            console.log("amazon-urlRegex[2]: " + result[2]);
            console.log("amazon-urlRegex[3]: " + result[3]);
            console.log("amazon-debug 32");
            
            if ( result == null ){
              console.log("amazon-debug 31");
              console.log("amazon-urlRegex: null");
            } else {
              for(var i = 0; i < result.length; ++i){
                console.log("amazon-urlRegex[i]: i: " + i + " result[i]" + result[i]);
              }
        
        
              console.log("amazon-urlRegex[0]: " + result[0]);
              console.log("amazon-urlRegex[1]: " + result[1]);
              console.log("amazon-urlRegex[2]: " + result[2]);
              console.log("amazon-urlRegex[3]: " + result[3]);
              console.log("amazon-debug 32");
            }
            console.log("amazon-debug 33");
        
        
        
        
            let asid = result[2];
            console.log("amazon-debug 50");
        
            if ( asid == null ){
              // some_variable is either null or undefined
              console.log("amazon-asid: null|undefined");
              return null;
            } else {
              console.log("amazon-asid: " + asid);
              return asid;
            }
          }
          catch(err) {      
            console.log("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
            console.error("amazon-debug [ERROR] err.name: " + err.name + " err.message: " + err.message);
            debugger;
          } 
    }
    //,
    // bar: function () {
    //   // whatever
    // }
  };