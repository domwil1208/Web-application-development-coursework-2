exports.requireOrganiser = (req, res, next) => {
    if (req.session.userId && req.session.role === 'organiser') {
      return next();
    }
    res.redirect('/login');
  };
  