const db = require('./dbModel');

exports.createUser = (user, callback) => {
  const query = 'INSERT INTO users (name, email, phone_number, password) VALUES (?, ?, ?, ?)';
  db.query(query, [user.name, user.email, user.phone_number, user.password], callback);
};

exports.updateUser = (id, user, callback) => {
  const query = 'UPDATE users SET name = ?, email = ?, phone_number = ?, password = ? WHERE id = ?';
  db.query(query, [user.name, user.email, user.phone_number, user.password, id], callback);
};
