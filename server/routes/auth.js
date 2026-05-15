const express = require('express');
const { verifyPassword, requireAuth } = require('../middleware/auth');

const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!ADMIN_PASSWORD_HASH) {
  console.warn(
    '⚠️  Warning: ADMIN_PASSWORD_HASH is not set. Admin routes will not work. Run: npm run hash-password'
  );
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (username !== ADMIN_USER) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!ADMIN_PASSWORD_HASH) {
      return res.status(500).json({ error: 'Admin authentication not configured' });
    }

    const isValid = await verifyPassword(password, ADMIN_PASSWORD_HASH);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.authenticated = true;
    req.session.user = username;
    res.json({ success: true, user: username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.session.user, authenticated: true });
});

// GET /api/auth/status
router.get('/status', (req, res) => {
  res.json({
    authenticated: !!(req.session && req.session.authenticated),
    user: req.session?.user || null,
  });
});

module.exports = router;
