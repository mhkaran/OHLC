const queue = require('./queue')
const events = require('events');
global.securityTimeTrade={}

setInterval(() => {
    while(queue.size()!=0)
    {
        let data =  queue.read();

        let securityName = data.sym;

        let trades = global.hashtable.get(securityName);

        if (trades){
            if ((Number(global.securityTimeTrade[securityName].time)+14)-Number(data.TS2.toString().substr(0,10))>=0){
                
                let lastTrade = trades[trades.length-1]
                let high = Number(data.P)>=Number(lastTrade.h)?Number(data.P):Number(lastTrade.h)
                let low = Number(data.P)>=Number(lastTrade.l)?Number(lastTrade.l):Number(data.P)
                trades.push({"o":lastTrade.o,"h":high,"l":low,"c":0,"volume":(parseFloat(lastTrade.volume) + parseFloat(data.Q)),
                "event":"ohlc_notify","symbol"
                :lastTrade.symbol,"bar_num":lastTrade.bar_num});
                global.securityTimeTrade[securityName].trade=data.P;
                
                global.hashtable.put(securityName,trades);

                global.broadcast(securityName);

            }
            else{
                let lastTrade = trades[trades.length-1]
                lastTrade.c=global.securityTimeTrade[securityName].trade;

                
                let timediff = (Number(data.TS2.toString().substr(0,10)-Number(global.securityTimeTrade[securityName].time)+14));
                console.log(timediff)
                for(let i=timediff; i>=0; i=i-15){
                    let bar_num= trades[trades.length-1].bar_num+1;
                    trades.push({"event":"ohlc_notify","symbol":securityName,"bar_num":bar_num});
                }

                trades.push({"o":data.P,"h":data.P,"l":data.P,"c":0,"volume":data.Q,"event":"ohlc_notify","symbol"
                :securityName,"bar_num": trades[trades.length-1].bar_num})

                global.hashtable.put(securityName,trades);

                global.securityTimeTrade[securityName]={time:data.TS2.toString().substr(0,10),trade:data.P};

                global.broadcast(securityName);

            }
       }
        else{
            trades=[]
            trades.push({"event":"ohlc_notify","symbol":securityName,"bar_num":1});

            trades.push({"o":data.P,"h":data.P,"l":data.P,"c":0,"volume":data.Q,"event":"ohlc_notify","symbol"
                :securityName,"bar_num":1})

            global.hashtable.put(securityName,trades);

            global.securityTimeTrade[securityName]={time:data.TS2.toString().substr(0,10),trade:data.P};

            global.broadcast(securityName);
        }
    } 
        
    for (const key of Object.keys(global.securityTimeTrade)) 
    {
        let trades = global.hashtable.get(key);
         
        let lastTrade = trades[trades.length-1]
        lastTrade.c=global.securityTimeTrade[key].trade;
        
        global.hashtable.put(key,trades);

        global.broadcast(key);

        delete global.securityTimeTrade[key];
    }

},5000);


