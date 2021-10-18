const {
  Pool
} = require('pg');
const assert = require('assert');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://kizzscuwlypsds:975cd2db81d87998b1e0c2b9160e96de27a33948bf165bfad23522e3942db793@ec2-52-6-29-180.compute-1.amazonaws.com:5432/deeur13jtk9q5e',
  ssl: {
    rejectUnauthorized: false,
  }
});

const constructQuery = (client, sql) => {
  return client.query(sql);
};

const parseMessages = (res) => {
  if (res.rowCount === 0) {
    return [];
  }
  assert(res);
  return res.rows.map((row) => {
    return {
      message: row.message,
      source: row.source
    };
  });
};

const fetchMessages = () => {
  const selectMessages = `Select Id, TicketNumber,Subject,Description,Status, CustomerName,ExternalId from cases`;

  // Prevent SQL injection using parametrized queries
  return pool.connect()
    .then((client) => {

      return constructQuery(client, selectMessages)
        .then((res) => {
          console.log('******** SUCCESS ************');
          console.log(res);
          client.release();


          return res;
        })
        .catch((err) => {
          client.release();
          // eslint-disable-next-line no-console
          console.error(err.stack);
        });
    });
};

const insertMessage = (message) => {

  console.log(message);

  var msg = JSON.parse(message);

  console.log(msg.source);
  console.log(msg.message);

  const insertMsg = `Insert into rabbit_queue values ('${msg.message}', '${msg.source}')`;

  return pool.connect()
    .then((client) => {
      client.query(insertMsg).then((res) => {
        client.release();

      });
    });
};

module.exports = {
  fetchMessages,
  insertMessage
};