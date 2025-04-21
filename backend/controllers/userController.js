const userModel = require('../models/userModel');

exports.createUser = (req, res) => {
  const newUser = req.body;
  userModel.createUser(newUser, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'User created successfully' });
    }
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  userModel.updateUser(id, updatedUser, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
};
