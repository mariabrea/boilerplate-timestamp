// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  const requestedDate = req.params.date;
  // if (requestedDate.includes("-")) { //valid date
  //   console.log("date");
  //   const dateGMT = new Date(requestedDate);
  //   const unixDate = dateGMT.getTime();
  //   const utcDate = dateGMT.toUTCString();
  //   if (!unixDate || !utcDate){
  //     res.json({ error : "Invalid Date" });
  //   } else{
  //     res.json({"unix": unixDate, "utc":utcDate});
  //   }
  // } else{ //timestamp
  //   console.log("timestamp");
  //   const dateUTC= new Date(parseInt(requestedDate));
  //   const unixDate = dateUTC.getTime();
  //   const utcDate = dateUTC.toUTCString();
  //   if (!unixDate || !utcDate){
  //     res.json({ error : "Invalid Date" });
  //   } else{
  //     res.json({"unix": unixDate, "utc": utcDate});
  //   }
  // }
  let date;
  if (!new Date(requestedDate) && !new Date(parseInt(requestedDate))){
    res.json({ error : "Invalid Date" });
  } else {
    if (requestedDate.includes("-")) { //valid date
      console.log("date");
      date = new Date(requestedDate);
    } else{ //timestamp
      console.log("timestamp");
      date= new Date(parseInt(requestedDate));
    }
    const unixDate = date.getTime();
    const utcDate = date.toUTCString();
    if (!unixDate || !utcDate){
      res.json({ error : "Invalid Date" });
    } else{
      res.json({"unix": unixDate, "utc": utcDate});
    }
  }
  
});

app.get("/api", function (req, res) {
  const nowDate = new Date(Date.now());
  res.json({"unix": nowDate.getTime(), "utc": nowDate.toUTCString()});
});


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000.")
});
