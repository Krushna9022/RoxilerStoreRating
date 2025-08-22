const db = require('../config/db');

// 1. Add a new store
exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;
    // console.log(req.body);
    
  // Validation
  if (!name || !owner_id) {
    return res.status(400).json({ msg: 'Name and owner_id are required' });
  }

  const insertQuery = `
    INSERT INTO stores (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertQuery, [name, email, address, owner_id], (err, result) => {
    if (err) {
      console.error('Error inserting store:', err);
      console.log(err);
      
      return res.status(500).json({ msg: 'Failed to add store' });
    }

    res.status(201).json({ msg: 'Store added successfully' });
  });
};

// 2. View all stores with average rating and filters
exports.getAllStores = (req, res) => {
  const { name = '', email = '', address = '' } = req.query;

  const query = `
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,
      u.name AS owner_name,
      u.email AS owner_email,
      IFNULL(AVG(r.value), 0) AS average_rating
    FROM stores s
    JOIN users u ON s.owner_id = u.id
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? AND s.email LIKE ? AND s.address LIKE ?
    GROUP BY s.id
    ORDER BY s.name ASC
  `;

  const filters = [`%${name}%`, `%${email}%`, `%${address}%`];

  db.query(query, filters, (err, results) => {
    if (err) {
      console.error('Error fetching stores:', err);
      return res.status(500).json({ msg: 'Failed to fetch store list' });
    }

    res.json(results);
  });
};



// GET /api/stores?name=abc&address=xyz
exports.listStores = (req, res) => {
  const { name = '', address = '' } = req.query;
  const userId = req.user.id;
  const role = req.user.role;

  const filters = [`%${name}%`, `%${address}%`, userId];

  const query = `
    SELECT 
      s.id,
      s.name,
      s.address,
      ROUND(AVG(r.value), 1) AS average_rating,
      ${
        role === 'user'
          ? `(SELECT value FROM ratings WHERE store_id = s.id AND user_id = ?) AS user_rating`
          : `NULL AS user_rating`
      }
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? AND s.address LIKE ?
    GROUP BY s.id
    ORDER BY s.name ASC
  `;

  // Order of parameters depends on role
  const params = role === 'user' ? [userId, ...filters.slice(0, 2)] : filters.slice(0, 2);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching stores:', err);
      return res.status(500).json({ msg: 'Failed to fetch stores' });
    }

    res.json(results);
  });
};
