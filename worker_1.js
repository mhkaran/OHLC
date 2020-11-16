const fs = require('fs'); 
const readline = require('readline'); 
const queue = require('./queue');

setImmediate(async ()=>{
const file = readline.createInterface({ 
input: fs.createReadStream('trades.txt'), 
output: process.stdout, 
terminal: false
}); 
  
file.on('line', (line) => { 
    try{
        let data = JSON.parse(line);
        
        if (data.constructor != {}.constructor) throw 'invalid object';
        if (data.sym) throw 'Invalid security name';
        if (data.P) throw 'Invalid trade price';
        if (data.Q) throw 'Invalid trade quantity';
        if (data.TS2)throw 'Invalid trade timestamp';
        queue.add(line);
    }
    catch(ex)
    {
        //can we catch the global level exception here
    }
}); 
})


