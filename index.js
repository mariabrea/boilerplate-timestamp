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
  let date;
  console.log(new Date(requestedDate));
  console.log(new Date(parseInt(requestedDate)));
  if (new Date(requestedDate) == "Invalid Date" && new Date(parseInt(requestedDate)) == "Invalid Date"){
    res.json({ error : "Invalid Date" });
  } else {
    console.log("not invalid")
    if (new Date(requestedDate) != "Invalid Date") {
      console.log("date");
      date = new Date(requestedDate);
      
    } else {
      console.log("timestamp");
      date= new Date(parseInt(requestedDate));
    }
    const unixDate = date.getTime();
    const utcDate = date.toUTCString();
    // if (!unixDate || !utcDate){
    //   res.json({ error : "Invalid Date" });
    // } else{
      res.json({"unix": unixDate, "utc": utcDate});
    // }
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
