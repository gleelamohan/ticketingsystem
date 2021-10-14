const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));// Serve static files



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/result', function (req, res) {
	res.sendFile(path.join(__dirname + '/result.html'));
});
app.get('/nosupport', function (req, res) {
	res.sendFile(path.join(__dirname + '/nosupport.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`)); 

