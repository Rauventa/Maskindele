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
        res.status(500).json({message: 'Something went wrong'})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const car = await Car.find({_id: req.params.id}).populate('parts');

        res.status(200).json(car)
    } catch(e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        await Car.findOneAndDelete({_id: req.params.id})
        res.status(200).json({message: 'Car was deleted successfully'})
    } catch(e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})


router.post(
    '/create',
    [
        check('brand', 'Bad brand name').exists(),
        check('model', 'Bad model name').exists(),
        check('win', 'Bad WIN number').exists(),
        check('year', 'Bad year').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data'
                })
            }

            const {brand, model, win, year, description} = req.body;

            const candidate = await Car.findOne({brand, model, year});
            if (candidate) {
                return res.status(400).json({message: 'This car is already used'})
            }

            await new Car({
                brand, model, win, year, description
            }).save()

            res.status(201).json({message: 'Car created'});
        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

module.exports = router;