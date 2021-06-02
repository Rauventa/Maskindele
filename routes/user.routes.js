const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Parts = require('../models/Parts');
const router = Router();

router.post(
  '/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов')
      .isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const {name, surname, phone, email, password, repeat, role} = req.body;

      const candidate = await User.findOne({email});
      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь уже существует'})
      }

      if (password === repeat) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({name, surname, phone, email, password: hashedPassword, role});

        await user.save();

        res.status(201).json({message: 'Пользователь создан'});
      } else {
        res.status(400).json({message: 'Пароли не совпадают'})
      }

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const {email, password} = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      );

      res.status(200).json({token, userId: user.id, name: user.name, surname: user.surname, role: user.role});

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
);

router.post(
    '/parts',
    async (req, res) => {
      try {
        const {userId} = req.body;

        const parts = await Parts.find({'owner': userId}).populate('car').populate('customer');
        res.status(200).json(parts)
      } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
      }
    }
)

router.post(
    '/customer',
    async (req, res) => {
      try {
        const {userId} = req.body;

        const parts = await Parts.find({'customer': userId}).populate('car').populate('owner');
        res.status(200).json(parts)
      } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
      }
    }
)

module.exports = router;