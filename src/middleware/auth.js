// middleware/auth.js
function isAdmin(req, res, next) {
    if (req.session && req.session.level === 1) {
      return next();
    } else {
      return res.status(403).json({ success: false, message: 'Anda tidak memiliki akses ke halaman ini' });
    }
  }
  
  module.exports = isAdmin;
  