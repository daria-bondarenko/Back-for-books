const bcrypt = require('bcryptjs');
const updateTokens = require('../helpers/helpersFunction');

const User = require('../../db/models/user/index');

module.exports.createNewUser = async (req, res) => {
  const {email, password} = req.body;
  const rexexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/igm;

  if (rexexp.test(email)) {
    const candidate = await User.findOne({email});

    if (candidate) {
      res.status(404).json({
        message: 'Такой пользователь уже существует'
      })
    } else {
      const salt = bcrypt.genSaltSync(10);
      const newUser = new User({
        email,
        password: bcrypt.hashSync(password, salt)
      })

      try {
        await newUser.save();
        const user = await User.find({email});
        const {accessToken, refreshToken} = await updateTokens(user[0]._id);

        res.status(200).json({
          email,
          accessToken,
          refreshToken
        })
      } catch (e) {
        res.status(409).json({
          message: 'Что-то пошло не так, попробуй еще раз :)'
        })
      }
    }
  } else {
    res.status(400).json({
      message: 'Логин не корректный'
    })
  }


};

module.exports.signIn = async (req, res) => {
  const {email, password} = req.body;
  const candidate = await User.findOne({email});

  try {
    if (!candidate) {
      res.status(401).json({message: "Нет такого юзера..."})
    }
    const isValid = bcrypt.compareSync(password, candidate.password);
    if (isValid) {
      const tokens = await updateTokens(candidate._id);
      res.json(tokens);
    } else {
      res.status(401).json({message: 'Проверь пароль...'})
    }
  } catch (e) {
    res.status(500).json({message: e.message})
  }
}