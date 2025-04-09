const User = require('../models/User');
const { HTTPUnauthorizedError, HTTPBadRequestError } = require('../utils/httpErrors');

exports.update = async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) throw new HTTPUnauthorizedError('User not found');

  await User.findByIdAndUpdate(userId, {
    email: email,
  }, { new: true });
  if (!user) throw new HTTPBadRequestError('Invalid user data');
  
  res.json({ message: 'Profile updated', user: { email: user.email, name: user.name } });
};
