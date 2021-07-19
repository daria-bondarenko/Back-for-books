const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../db/models/user/index');
const keys = require('../../../config/keys')

module.exports.createNewUser = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    res.status(404).json({
      message: 'Такой пользователь уже существует'
    })
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save().then(result => {
        User.find({email: req.body.email}).then(result => {
        })
        const token = jwt.sign({
          email: req.body.email,
          userId: result._id
        }, keys.jwt, {expiresIn: 60 * 60});

        res.status(200).json({
          email: req.body.email,
          token: `Bearer ${token}`
        })
      });
    } catch (e) {
      res.status(409).json({
        message: 'Что-то пошло не так, попробуй еще раз :)'
      })
    }
  }
};

module.exports.authUser = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60});

      res.status(200).json({
        email: req.body.email,
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({message: 'Пароль не правильный'});
    }
  } else {
    res.status(404).json({message: 'Такого юзера нет'})
  }
};