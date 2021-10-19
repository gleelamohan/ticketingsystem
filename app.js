const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const axios = require('axios')

const {
	Client
} = require('pg');
const connectionString = 'postgres://kizzscuwlypsds:975cd2db81d87998b1e0c2b9160e96de27a33948bf165bfad23522e3942db793@ec2-52-6-29-180.compute-1.amazonaws.com:5432/deeur13jtk9q5e';
const client = new Client({
	connectionString: connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});
client.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Serve static files



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/update', function (req, res) {
	console.log(req.query.Id);
	let status = req.query.Status;
	let externalid = req.query.Id;
	axios
		.post('https://sdo-demo-main-16109844f55-16-17a51cea05a.secure.force.com/ticketservices/services/apexrest/Case', {
			Id: req.query.Id,
			Status: req.query.Status
		})
		.then(result => {
			console.log(`statusCode: ${result.status}`);
			//console.log(result);

			let qString = `UPDATE CASES SET Status ='${status}' where externalId='${externalid}'`;

			console.log(qString);
			client.query(qString, function (err, result) {
				console.log('after update');
				console.log(err);
				if (err) {
					console.log(err);
					res.status(400).send(err);

				}
				res.status(200).json('Update Success');

			});
		})
		.catch(error => {
			console.error(error);
		})
});


app.post('/insertcomment', function (req, res) {

	let tno = req.body.Id;
	let comment = req.body.comment;
	let uname = req.body.uname;

	client.query(`INSERT INTO COMMENTS (TicketNumber,Comment,UserName) VALUES (${tno},${comment},${uname})`, function (err, result) {
		if (err) {
			console.log(err);
			res.status(400).send(err);

		}
		res.status(200).json(result.rows);

	});


});

app.get('/result', function (req, res) {

	client.query('SELECT * FROM CASES', function (err, result) {
		if (err) {
			console.log(err);
			res.status(400).send(err);

		}
		res.status(200).json(result.rows);

	});

});
app.get('/nosupport', function (req, res) {
	res.sendFile(path.join(__dirname + '/nosupport.html'));
});

app.listen(port, () => console.log(`listening on port ${port}!`));