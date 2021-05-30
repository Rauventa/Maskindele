const {Router} = require('express');
const Parts = require('../models/Parts');
const {check, validationResult} = require('express-validator');
const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const part = await Parts.findById({_id: req.params.id}).populate('car');
        res.status(200).json(part)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Parts.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({message: 'Part was deleted successfully'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

//TODO - reserve query

router.post(
    '/create',
    [
        check('name', 'Bad part name').exists(),
        check('vendor', 'Bad vendor code').exists(),
        check('price', 'Bad part price').exists(),
        check('owner', 'Bad owner id').exists(),
        check('car', 'Bad car id').exists(),
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

            const {name, vendor, price, owner, car} = req.body;

            const part = new Parts({name, vendor, status: 0, price, car, owner})
            await part.save();

            return res.status(201).json({message: 'part was created'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router;