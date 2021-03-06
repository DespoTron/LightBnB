const { response, query } = require('express');
const { Pool } = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// SQL IMPLEMENTATION
const getUserWithEmail = function(email) {
  return pool.query('SELECT * FROM users WHERE email = $1;', [email])
    .then((response) => {
      if (response.rows.length === 0) {
        // console.log(response)
        // console.log(response.rows.length)
        return null;
      }
      // console.log(response.rows[0])
      return response.rows[0];
    })
}

exports.getUserWithEmail = getUserWithEmail;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// SQL Implementation
const getUserWithId = function(id) {
  return pool.query('SELECT * FROM users WHERE id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    })
}
 
exports.getUserWithId = getUserWithId;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

 // SQL IMPLEMENTATION
const addUser = function(user) {
  return pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;', [user.name, user.email, user.password])
    .then((response) => {
      return response.rows[0];
  })
}

exports.addUser = addUser;

/// Reservations
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// SQL IMPLEMENTATION 
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1 
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows);
}

exports.getAllReservations = getAllReservations;

/// Properties
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// SQL implementation
const getAllProperties = function(options, limit = 10) {
  // 1 
  // Setup an array to hold params that may be available for query
  const queryParams = [];
  // 2
  // Start the query with all info that comes before the WHERE clause
  // default sql query
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  // Check if a city has been passed in as an option. 
  // Add the city to the params array and create a WHERE clause for the city
  //    we can use length of the array to dynamically get the $n(same as $1) placeholder number
  //    the % syntax for the LIKE clase must be part ofthe params not the query
  // adds city to query
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  // adds minimum price per night to query
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    if (options.city) {
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
    }
  }

  // adds maximum price per night to query
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night*100}`);
    if (options.city || options.minimum_price_per_night) {
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
    }
  }

  // adds owner_id to query -> used in my listing
  if(options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (options.city || options.minimum_price_per_night || options.maximum_price_per_night) {
      queryString += `AND owner_id = $${queryParams.length} `;
    } else {
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
  }
  
  // adds minimum rating to query
  if(options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // adds limit to query
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

// SQL IMPLEMENTATION
const addProperty = function(property) {

  // starting params are empty
  const queryParams = [];
  for (const key in property) {
    queryParams.push(property[key])
  }

  const queryString = `
  INSERT INTO properties 
    (title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url,
    street, country, city, province, post_code, owner_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  return pool.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  })

}

exports.addProperty = addProperty;
