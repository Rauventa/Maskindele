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
        res.status(200).json({message: 'Запчасть была успешно удалена'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.put(
    '/reserve',
    async (req, res) => {
        try {
            const {customerId, partId} = req.body;

            await Parts.findOneAndUpdate({_id: partId}, {status: 1, customer: customerId});
            res.status(201).json({message: 'Деталь забронирована'});
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.put(
    '/sold/:id',
    async (req, res) => {
        try {
            await Parts.findOneAndUpdate({_id: req.params.id}, {status: 2});
            res.status(201).json({message: 'Деталь продана'});
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post(
    '/create',
    [
        check('name', 'Некорректное имя детали').exists(),
        check('vendor', 'Некорректный код вендора').exists(),
        check('price', 'Некорректная цена детали').exists(),
        check('owner', 'Некорректный айди владельца').exists(),
        check('car', 'Некорректный айди машины').exists(),
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

            const {name, vendor, price, owner, car} = req.body;

            const part = new Parts({name, vendor, status: 0, price, car, owner})
            await part.save();

            return res.status(201).json({message: 'Запчать усаешно создана'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router;