//Import to library
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
//Application initialization, this server can accept requests from different domains.
const app = express();
app.use(cors());
//Create a connection to the MySQL database using mysql.createconnection.
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '106326',
  database: 'crowdfunding_db',
});
//When a client initiates a GET request to the fundraisers, the route executes an SQL query that retrieves all the campaigns 
//whose campaign status is "active" and returns data in JSON format. If an error occurs in the query, error messages are returned.
app.get('/fundraisers', (req, res) => {
  const sql = 'SELECT * FROM fundraisers WHERE is_active = TRUE';
  connection.query(sql, (error, data) => {
    if (error) {
      console.error('Query error:', error);
      return res.status(500).json({ message: 'Error retrieving data' });
    }
    res.json(data);
  });
});
//Process a GET request to /fundraisers/: ID, get the ID of a specific crowdfunding campaign through the URL parameter,
// and query the database. If no corresponding activity is found, an error status is returned.
app.get('/fundraisers/:id', (req, res) => {
  const fundraiserId = req.params.id;
  const sql = 'SELECT * FROM fundraisers WHERE fundraiser_id = ?';
  connection.query(sql, [fundraiserId], (error, result) => {
    if (error) {
      console.error('Query error:', error);
      return res.status(500).json({ message: 'Error retrieving data' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Fundraiser not found' });
    }
    res.json(result[0]);
  });
});
//Process GET requests to /search, dynamically building SQL queries based on query parameters such as organizer, city, 
//and category. Use the LIKE syntax to support fuzzy matching. If no result is found, an error status is returned.
app.get('/search', (req, res) => {
  const { organizer, city, category } = req.query;
  let sql = 'SELECT * FROM fundraisers WHERE is_active = TRUE';
  let filters = [];

  if (organizer) {
    sql += ' AND organizer LIKE ?';
    filters.push(`%${organizer}%`);
  }

  if (city) {
    sql += ' AND city LIKE ?';
    filters.push(`%${city}%`);
  }

  if (category) {
    sql += ' AND category_id = ?';
    filters.push(category);
  }

  connection.query(sql, filters, (error, results) => {
    if (error) {
      console.error('Search query error:', error);
      return res.status(500).json({ message: 'Error processing search' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No matching fundraisers found' });
    }
    res.json(results);
  });
});

