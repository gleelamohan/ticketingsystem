const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const {
	Client
} = require('pg');
const connectionString = 'postgres://kizzscuwlypsds:975cd2db81d87998b1e0c2b9160e96de27a33948bf165bfad23522e3942db793@ec2-52-6-29-180.compute-1.amazonaws.com:5432/deeur13jtk9q5e';
const client = new Client({
	connectionString: connectionString,
	ssl: false
});
client.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Serve static files



app.get('/', function (req, res) {
	client.query('SELECT * FROM cases', function (err, result) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		}
		res.status(200).send(result.rows);
	});
});

app.get('/result', function (req, res) {

	client.query('SELECT * FROM CASES', function (err, result) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		}
		res.status(200).send(result.rows);
	});

});
app.get('/nosupport', function (req, res) {
	res.sendFile(path.join(__dirname + '/nosupport.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`));