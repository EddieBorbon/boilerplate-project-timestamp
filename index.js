// index.js
// where your node app starts

// Initialize project
const express = require('express');
const app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files
app.use(express.static('public'));

// Basic route for homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First example API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice API endpoint
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  // If no date parameter, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // If it's a number (Unix timestamp), parse it as an integer
    if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Try to parse as a date string
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on the port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
