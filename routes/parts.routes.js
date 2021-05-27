const {Router} = require('express');
const Parts = require('../models/Parts');
const Car = require('../models/Car');
const {check, validationResult} = require('express-validator');
const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const part = await Parts.findById({_id: req.params.id}).populate('car');
        res.status(200).json(part)
    } catch(e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Parts.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({message: 'Part was deleted successfully'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post(
    '/create',
    [
        check('name', 'Bad part name').exists(),
        check('vendor', 'Bad vendor code').exists(),
        check('carId', 'Bad car id').exists(),
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

            const {name, vendor, carId} = req.body;

            const candidate = await Parts.findOne({vendor});
            if (candidate) {
                return res.status(400).json({message: 'This part is already used'})
            }

            const part = new Parts({name, vendor, car: carId})
            await part.save();

            const car = await Car.findById({_id: carId});
            car.parts.push(part)
            await car.save()

            return res.status(201).json({message: 'part was created'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

module.exports = router;