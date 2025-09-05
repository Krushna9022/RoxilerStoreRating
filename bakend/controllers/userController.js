const db = require('../config/db');
const bcrypt = require('bcrypt');
exports.getDashboardStats = (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM stores) AS total_stores,
      (SELECT COUNT(*) FROM ratings) AS total_ratings;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching admin stats:', err);
      return res.status(500).json({ msg: 'Server error' });
    }

    res.json(result[0]);
  });
};


//get all the users from db
exports.getAllUsers = (req, res) => {
  let { name = '', email = '', address = '', role = '' } = req.query;

  // Use % for LIKE queries
  name = `%${name}%`;
  email = `%${email}%`;
  address = `%${address}%`;
  role = role ? role : '%'; // if not provided, match all roles

  const query = `
    SELECT 
      id, name, email, address, role 
    FROM users 
    WHERE name LIKE ? AND email LIKE ? AND address LIKE ? AND role LIKE ?
    ORDER BY name ASC
  `;

  db.query(query, [name, email, address, role], (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ msg: 'Failed to fetch users' });
    }

    res.json(results);
  });
};


// admin to add storeowner 

exports.createStoreOwner = async (req, res) => {
  const { name, email, password ,address} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error' });

      if (result.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = `
        INSERT INTO users (name, email, password, address ,role)
        VALUES (?, ?, ?, ?,'store_owner')
      `;
      db.query(insertQuery, [name, email, hashedPassword,address], (err) => {
        if (err) return res.status(500).json({ msg: 'Failed to create store owner' });

        res.status(201).json({ msg: 'Store owner created successfully', email, password });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};




//  Password validation regex
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/;
exports.updatePassword = (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ msg: 'Both current and new passwords are required' });
  }

  if (!PASSWORD_REGEX.test(newPassword)) {
    return res.status(400).json({
      msg: 'Password must be 8-16 characters and include at least one uppercase letter and one special character',
    });
  }

  // Step 1: Get existing password hash
  const query = 'SELECT password FROM users WHERE id = ?';
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.error('Error fetching user password:', err);
      return res.status(500).json({ msg: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const hashedPassword = results[0].password;

    // Step 2: Compare current password
    const match = await bcrypt.compare(currentPassword, hashedPassword);
    if (!match) {
      return res.status(401).json({ msg: 'Current password is incorrect' });
    }

    // Step 3: Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: Update password
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(updateQuery, [newHashedPassword, userId], (err) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ msg: 'Failed to update password' });
      }

      res.json({ msg: 'Password updated successfully' });
    });
  });
};

