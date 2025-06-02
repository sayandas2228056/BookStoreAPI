const express = require('express');
const router = express.Router();

// Simple in-memory user storage (in production, use a database)
let users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    role: "customer",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    username: "admin",
    email: "admin@bookstore.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString()
  }
];

// GET /api/users - Get all users
router.get('/', (req, res) => {
  try {
    // Remove sensitive data before sending
    const safeUsers = users.map(({ id, username, email, name, role, createdAt }) => ({
      id, username, email, name, role, createdAt
    }));
    
    res.json({
      success: true,
      data: safeUsers,
      count: safeUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET /api/users/:id - Get a specific user
router.get('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Remove sensitive data
    const { id, username, email, name, role, createdAt } = user;
    
    res.json({
      success: true,
      data: { id, username, email, name, role, createdAt }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST /api/users - Create a new user
router.post('/', (req, res) => {
  try {
    const { username, email, name, role = 'customer' } = req.body;
    
    // Basic validation
    if (!username || !email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and name are required'
      });
    }
    
    // Check if username or email already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      username,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Remove sensitive data from response
    const { id, username: uname, email: uemail, name: uname2, role: urole, createdAt } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { id, username: uname, email: uemail, name: uname2, role: urole, createdAt }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Update a user
router.put('/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const { username, email, name, role } = req.body;
    
    // Check if username or email conflicts with other users
    if (username || email) {
      const conflictUser = users.find(u => u.id !== userId && (u.username === username || u.email === email));
      if (conflictUser) {
        return res.status(409).json({
          success: false,
          message: 'Username or email already exists'
        });
      }
    }
    
    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...(username && { username }),
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role })
    };
    
    users[userIndex] = updatedUser;
    
    // Remove sensitive data from response
    const { id, username: uname, email: uemail, name: uname2, role: urole, createdAt } = updatedUser;
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: { id, username: uname, email: uemail, name: uname2, role: urole, createdAt }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: { id: deletedUser.id, username: deletedUser.username }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

module.exports = router;