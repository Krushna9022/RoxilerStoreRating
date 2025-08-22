const db = require('../config/db');

// 1. Submit New Rating
exports.submitRating = (req, res) => {
  const userId = req.user.id;
  const { store_id, value } = req.body;
  // console.log(typeof(value)+"value "+value);
  

  if (!store_id || !value || value < 1 || value > 5) {
    return res.status(400).json({ msg: 'Invalid store ID or rating value' });
  }

  // Check if user already rated this store
  const checkQuery = `SELECT * FROM ratings WHERE user_id = ? AND store_id = ?`;
  db.query(checkQuery, [userId, store_id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error' });

    if (result.length > 0) {
      return res.status(400).json({ msg: 'You have already rated this store' });
    }

    const insertQuery = `
      INSERT INTO ratings (user_id, store_id, value)
      VALUES (?, ?, ?)
    `;
    db.query(insertQuery, [userId, store_id, value], (err) => {
      if (err) {
        console.error('Error inserting rating:', err);
        return res.status(500).json({ msg: 'Failed to submit rating' });
      }

      res.status(201).json({ msg: 'Rating submitted successfully' });
    });
  });
};

// 2. Update Existing Rating
exports.updateRating = (req, res) => {
  const userId = req.user.id;
  const ratingId = req.params.id;
  const { value } = req.body;

  if (!value || value < 1 || value > 5) {
    return res.status(400).json({ msg: 'Rating value must be between 1 and 5' });
  }

  const checkQuery = `SELECT * FROM ratings WHERE id = ? AND user_id = ?`;

  db.query(checkQuery, [ratingId, userId], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error' });

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Rating not found or access denied' });
    }

    const updateQuery = `UPDATE ratings SET value = ?, updated_at = NOW() WHERE id = ?`;
    db.query(updateQuery, [value, ratingId], (err) => {
      if (err) {
        console.error('Error updating rating:', err);
        return res.status(500).json({ msg: 'Failed to update rating' });
      }

      res.json({ msg: 'Rating updated successfully' });
    });
  });
};


// Get ratings for stores owned by current user
exports.getRatingsForOwner = (req, res) => {
  const ownerId = req.user.id;

  const query = `
    SELECT 
      s.id AS store_id,
      s.name AS store_name,
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      r.value AS rating,
      r.created_at
    FROM stores s
    JOIN ratings r ON s.id = r.store_id
    JOIN users u ON r.user_id = u.id
    WHERE s.owner_id = ?
    ORDER BY s.id, r.created_at DESC
  `;

  db.query(query, [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching ratings for owner:', err);
      return res.status(500).json({ msg: 'Server error' });
    }

    // Group by store for easier frontend display (optional)
    const grouped = {};
    results.forEach(row => {
      if (!grouped[row.store_id]) {
        grouped[row.store_id] = {
          store_id: row.store_id,
          store_name: row.store_name,
          ratings: []
        };
      }
      grouped[row.store_id].ratings.push({
        user_id: row.user_id,
        user_name: row.user_name,
        user_email: row.user_email,
        rating: row.rating,
        created_at: row.created_at
      });
    });

    res.json(Object.values(grouped));
  });
};
