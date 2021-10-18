const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const {
	Pool
} = require('pg');
const connString =
	"postgres://kizzscuwlypsds:975cd2db81d87998b1e0c2b9160e96de27a33948bf165bfad23522e3942db793@ec2-52-6-29-180.compute-1.amazonaws.com:5432/deeur13jtk9q5e";

const pool = new Pool({
	user: 'kizzscuwlypsds',
	host: 'ec2-52-6-29-180.compute-1.amazonaws.com',
	database: 'deeur13jtk9q5e',
	password: '975cd2db81d87998b1e0c2b9160e96de27a33948bf165bfad23522e3942db793',
	port: 5432
});

pool.connect();

const query = `SELECT * from CASES`;
pool.query(query, (err, res) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('Connection successful');
	pool.end()
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Serve static files



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/result', function (req, res) {



	res.json('Test');
});
app.get('/nosupport', function (req, res) {
	res.sendFile(path.join(__dirname + '/nosupport.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`));