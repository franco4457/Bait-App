const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [{ model: Image, attribute: ['url'] }],
    });
    if (!user) throw new Error('User not found');
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
