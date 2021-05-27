const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');
const Parts = require('../models/Parts');
const router = Router();

// router.get('/', async (req, res) => {
//     try {
//         const order = await Order.find()
//         res.status(200).json(order)
//     } catch(e) {
//         res.status(500).json({message: 'Something went wrong'})
//     }
// })
//
//
// router.get('/:id', async (req, res) => {
//     try {
//         const order = await Order.findById({_id: req.params.id})
//         res.status(200).json(order)
//     } catch(e) {
//         res.status(500).json({message: 'Something went wrong'})
//     }
// })

router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({message: 'Order was deleted successfully'})
    } catch(e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post(
    '/create',
    [
        check('status', 'Bad order status').exists(),
        check('userId', 'Bad user id').exists(),
        check('parts', 'Invalid parts list').exists(),
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

            const {status, userId, parts} = req.body;

            const partsList = await Parts.find({_id: {$in: parts}})

            const order = new Order({status, parts: partsList})
            await order.save()

            const user = await User.findById({_id: userId})
            user.orders.push(order)
            await user.save()

            return res.status(201).json({message: 'Order was created'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)


module.exports = router;