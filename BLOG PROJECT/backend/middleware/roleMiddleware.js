exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ status: 'fail', message: 'Access denied' });
    }
    next();
  };
};
