const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// JWT middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    next();
  } catch {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-site-name.netlify.app'], // Change this to your actual Netlify domain
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'portfolio_contact',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      'INSERT INTO contact_form (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for contacting!',
      html: `
        <div>
          <h2>Hi ${name},</h2>
          <p>Thanks for your message: "${message}".</p>
          <p>I'll get back to you soon!</p>
          <p>Best regards,<br>Your Portfolio Site</p>
        </div>
      `
    });

    res.status(201).json({ success: true, message: 'Form submitted and email sent' });
  } catch (err) {
    console.error('Contact Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Admin: get all contact form submissions
app.get('/api/submissions', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_form ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Submissions Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch submissions' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
