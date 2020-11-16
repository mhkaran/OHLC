let fifo = require('queue-fifo');

class Queue {
    
    constructor(){
        this.fifo = new fifo();
    }

    add(data){
        this.fifo.enqueue(data);
    }

    read(){
        let data = this.fifo.peek();
        this.fifo.dequeue();
        return data;
    }
    size(){
        return this.fifo.size();
    }
}
let queue = new Queue();
module.exports = queue


