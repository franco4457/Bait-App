const { Local, User } = require('../../db');// eslint-disable-line

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics,
  } = req.body;
  try {
    // const user = await User.findByPk(req.userId);
    const newLocal = await Local.create({
      name, location, schedule, email,
    });
    await newLocal.createCharacteristic(characteristics);
    // await user.addLocal(newLocal);
    return res.status(201).json({ success: true, local: newLocal });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
