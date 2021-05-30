const {Router} = require('express');
const Car = require('../models/Car');
const Parts = require('../models/Parts');
const {check, validationResult} = require('express-validator');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const cars = await Car.find({}).populate('parts');
        res.status(200).json(cars)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const car = await Car.find({_id: req.params.id}).populate('parts');
        res.status(200).json(car)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        await Car.findOneAndDelete({_id: req.params.id})
        res.status(200).json({message: 'Машина была успешно удалена'})
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/parts', async (req, res) => {
    try {
        const {carId} = req.body;

        const parts = await Parts.find({ 'car': carId }).populate( 'owner')
        res.status(200).json(parts)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})


router.post(
    '/create',
    [
        check('brand', 'Некорректное имя бренла').exists(),
        check('model', 'Некорректное имя модели').exists(),
        check('win', 'Некорректный WIN номер').exists(),
        check('year', 'Некорректный год').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные'
                })
            }

            const {brand, model, win, year, description} = req.body;

            const candidate = await Car.findOne({brand, model, year});
            if (candidate) {
                return res.status(400).json({message: 'Такая машина уже существует'})
            }

            await new Car({
                brand, model, win, year, description
            }).save()

            res.status(201).json({message: 'Машина успешно создана'});
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router;