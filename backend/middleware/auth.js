const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No authorization header' });

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid authorization format' });

    const token = parts[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id }; // minimal user info
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
