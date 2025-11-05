// Import dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; 
// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release();
  }
});
// --- API Routes ---

app.post('/api/auth/signup', async (req, res) => {
  console.log('📝 Signup request received:', { name: req.body.name, email: req.body.email });
  
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    console.log('❌ Validation failed: Missing fields');
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Validation failed: Invalid email format');
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    console.log('🔍 Checking if user exists...');
    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('🔒 Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('💾 Inserting user into database...');
    // Insert user
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    console.log('✅ User created successfully:', { id: newUser.id, email: newUser.email });

    console.log('🔑 Generating JWT token...');
    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    console.log('✅ Signup successful');
    // Return token and user info
    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('❌ Signup Error Details:', {
      message: err.message,
      stack: err.stack,
      code: err.code
    });

    // More specific error messages
    if (err.code === '42P01') {
      return res.status(500).json({ message: 'Database table does not exist' });
    } else if (err.code === '23505') {
      return res.status(400).json({ message: 'User already exists' });
    } else if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Database connection failed' });
    }
    
    res.status(500).json({ message: 'Server error occurred' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  console.log('🔐 Login request received:', { email: req.body.email });
  
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    console.log('❌ Validation failed: Missing email or password');
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    console.log('🔍 Looking up user in database...');
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('📊 Query result:', { userFound: userResult.rows.length > 0 });

    if (userResult.rows.length === 0) {
      console.log('❌ User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    console.log('✅ User found:', { id: user.id, email: user.email, hasPassword: !!user.password_hash });

    // Check if password exists in database
    if (!user.password_hash) {
      console.log('❌ No password hash found for user');
      return res.status(500).json({ message: 'Account setup incomplete' });
    }

    console.log('🔒 Comparing passwords...');
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log('🔍 Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('🔑 Generating JWT token...');
    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    console.log('✅ Login successful for user:', user.email);
    return res.json({ 
      token, 
      user: { 
        id: user.id,
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    console.error('❌ Login Error Details:', {
      message: err.message,
      stack: err.stack,
      code: err.code
    });
    
    // More specific error messages
    if (err.code === '42P01') {
      return res.status(500).json({ message: 'Database table does not exist' });
    } else if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Database connection failed' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(500).json({ message: 'Token generation failed' });
    }
    
    res.status(500).json({ message: 'Server error occurred during login' });
  }
});


// 🛡️ Middleware to extract and verify JWT
const authenticateUser = (req, res, next) => {
  console.log('🔐 Authentication middleware called');
  console.log('📝 Headers:', req.headers);
  
  const authHeader = req.headers.authorization;
  console.log('🎫 Auth header:', authHeader);
  
  if (!authHeader) {
    console.log('❌ No authorization header found');
    return res.status(401).json({ message: 'Unauthorized: Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    console.log('❌ No token found in authorization header');
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    console.log('🔍 Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified for user:', decoded.userId);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};

// ✅ GET cart items for logged-in user
app.get('/api/cart', authenticateUser, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.status(200).json({ items: result.rows });
  } catch (err) {
    console.error('Database error while fetching cart:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ✅ POST item to cart for user
app.post('/api/cart', authenticateUser, async (req, res) => {
  const { id, title, author, price, image, pdf_url } = req.body;

  if (!id || !title || !price) {
    return res.status(400).json({ error: 'Missing required fields: id, title, price' });
  }

  try {
    const existingItem = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2',
      [req.userId, id]
    );

    if (existingItem.rows.length > 0) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = $1 AND item_id = $2',
        [req.userId, id]
      );
      res.status(200).json({ message: 'Item quantity updated in cart' });
    } else {
      await pool.query(
        `INSERT INTO cart_items (user_id, item_id, title, author, price, quantity, image_url, pdf_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [req.userId, id, title, author, price, 1, image, pdf_url]
      );
      res.status(201).json({ message: 'Item added to cart' });
    }
  } catch (err) {
    console.error('Database error while adding to cart:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ✅ DELETE item from user's cart
app.delete('/api/cart/:itemId', authenticateUser, async (req, res) => {
  const { itemId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM cart_items WHERE item_id = $1 AND user_id = $2',
      [itemId, req.userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Database error while removing from cart:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ✅ Clear user's cart
app.delete('/api/cart', authenticateUser, async (req, res) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [req.userId]);
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error('Database error while clearing cart:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ✅ Get all purchased books (for user)
app.get('/api/purchased-books', authenticateUser, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM purchased_books WHERE user_id = $1 ORDER BY purchase_date DESC',
      [req.userId]
    );
    res.status(200).json({ books: result.rows });
  } catch (err) {
    console.error('Database error while fetching purchased books:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ✅ POST /checkout - move user's cart items to purchases
app.post('/api/checkout', authenticateUser, async (req, res) => {
  console.log('🛒 Checkout request for user:', req.userId);
  
  try {
    console.log('🔍 Fetching cart items...');
    const cartItems = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1',
      [req.userId]
    );

    console.log('📊 Cart items found:', cartItems.rows.length);

    if (cartItems.rows.length === 0) {
      console.log('❌ Cart is empty');
      return res.status(400).json({ error: 'Cart is empty' });
    }

    console.log('💾 Processing cart items...');
    
    // Use transaction for data consistency
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (const item of cartItems.rows) {
        console.log('📝 Processing item:', item.title);
        await client.query(
          `INSERT INTO purchased_books (user_id, item_id, title, author, price, quantity, image_url, pdf_url, purchase_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
          [req.userId, item.item_id, item.title, item.author, item.price, item.quantity, item.image_url, item.pdf_url]
        );
      }

      console.log('🗑️ Clearing cart...');
      await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.userId]);

      await client.query('COMMIT');
      console.log('✅ Transaction completed successfully');

      res.status(200).json({ 
        message: 'Checkout successful', 
        itemsProcessed: cartItems.rows.length 
      });
    } catch (transactionError) {
      await client.query('ROLLBACK');
      throw transactionError;
    } finally {
      client.release();
    }

  } catch (err) {
    console.error('❌ Checkout error details:', {
      message: err.message,
      stack: err.stack,
      code: err.code
    });
    
    // More specific error handling
    if (err.code === '42P01') {
      return res.status(500).json({ error: 'Database table does not exist' });
    } else if (err.code === '23505') {
      return res.status(400).json({ error: 'Duplicate purchase detected' });
    } else if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ✅ GET /profile - get user profile information
app.get('/api/profile', authenticateUser, async (req, res) => {
  console.log('👤 Profile request for user:', req.userId);
  
  try {
    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    console.log('✅ Profile fetched for:', user.email);
    
    res.status(200).json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error('❌ Profile fetch error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT /profile - update user profile information
app.put('/api/profile', authenticateUser, async (req, res) => {
  console.log('📝 Profile update request for user:', req.userId);
  
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    console.log('❌ Validation failed: Missing name or email');
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Validation failed: Invalid email format');
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if email is already taken by another user
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 AND id != $2',
      [email, req.userId]
    );

    if (existingUser.rows.length > 0) {
      console.log('❌ Email already taken by another user');
      return res.status(400).json({ message: 'Email is already taken' });
    }

    console.log('💾 Updating user profile...');
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
      [name, email, req.userId]
    );

    if (result.rows.length === 0) {
      console.log('❌ User not found during update');
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = result.rows[0];
    console.log('✅ Profile updated successfully for:', updatedUser.email);

    res.status(200).json({ 
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        created_at: updatedUser.created_at
      }
    });
  } catch (err) {
    console.error('❌ Profile update error:', err.message);
    
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email is already taken' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ DELETE /profile - delete user account (optional feature)
app.delete('/api/profile', authenticateUser, async (req, res) => {
  console.log('🗑️ Account deletion request for user:', req.userId);
  
  try {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Delete user's purchased books
      await client.query('DELETE FROM purchased_books WHERE user_id = $1', [req.userId]);
      
      // Delete user's cart items
      await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.userId]);
      
      // Delete user account
      const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING email', [req.userId]);
      
      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'User not found' });
      }
      
      await client.query('COMMIT');
      console.log('✅ Account deleted successfully for:', result.rows[0].email);
      
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (transactionError) {
      await client.query('ROLLBACK');
      throw transactionError;
    } finally {
      client.release();
    }
    
  } catch (err) {
    console.error('❌ Account deletion error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start server
app.listen(PORT, async () => {
  try {
    // Test the connection
    await pool.query('SELECT NOW()');
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
});