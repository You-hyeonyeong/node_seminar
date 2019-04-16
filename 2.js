const moduleArr = [7, 2, "Hello World", 11, "node", "Server",8,1];
const checkNumber = require('./module');
const {odd, even} = require('./number');

    for(var i = 0; i < moduleArr.length; i++){
        checkNumber(moduleArr[i]);
      }  