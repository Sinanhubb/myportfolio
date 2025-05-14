const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS setup
const allowedOrigins = ['http://localhost:3000', 'https://sinanportfolioo.netlify.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// JWT middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://portfolio_data_0ma3_user:0DOKNQen1SouEXOm1EkQ028jPYOd3BNF@dpg-d0g3fck9c44c73f934r0-a/portfolio_data_0ma3',
});

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'htmlvjec@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'eoih qzhm vunf pmsc',
  },
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Portfolio backend is running!');
});

// Contact form route
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
          <p>Thank you for your message:</p>
          <blockquote>${message}</blockquote>
          <p>I'll be in touch soon.</p>
          <br><p>— Portfolio Site</p>
        </div>
      `
    });

    res.status(201).json({ success: true, message: 'Form submitted and email sent' });
  } catch (err) {
    console.error('❌ Contact Error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Admin login to generate JWT
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

// ✅ Fixed this route (was using non-existent 'submitted_at' column)
app.get('/api/submissions', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_form ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Submissions Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch submissions' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
