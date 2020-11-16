# Welcome to OHLC demo 

## to run this demo locally 

- `npm i` run this command in command prompt or gt bash to get all packges locally.

- `npm run start` run this command to up the server. 

- for the client subscrption page, open http://localhost:8080/client to verify the output

- Here i have used trades.txt file for old transaction record, we can add more transaction on this file or we can    use api to fetch for live transaction trade.

- there is 5 mins of wait after server gets up for all the client to get record, if we want then we can modifty      the logic for new connected user to get revious record. just need to maintain a list with connected client
  with some flag.

 - instead of file read we can go for multiple file read form a folder and move to archive folder once read          complete
 
 ## assumptions 

 - first bar start with first trade but there is no time over for a day, an example current there is opening time    and closing time of trade in BSE and NSE here no closing time until last trade finds.

 - all the trade record are provide in sorted position only.


 



