const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs'); // For password hashing
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // MySQL server
  user: 'root', // MySQL username
  password: '', // MySQL password
  database: 'dbcivilify', // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Login route to check email and password
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the client exists in the database
  const query = `SELECT * FROM CLIENT WHERE email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      const client = results[0];

      // Compare passwords using bcrypt
      bcrypt.compare(password, client.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Error comparing passwords' });
        }

        if (isMatch) {
          return res.status(200).json({ success: true, clientId: client.client_id, name: client.name });
        } else {
          return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
      });
    } else {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
