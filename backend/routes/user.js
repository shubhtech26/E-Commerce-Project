import express from 'express';
import User from '../models/userModel.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'a dummy dashboard'})
})

router.get('/login', (req, res) => {
    res.json({msg: 'Login'})
})

router.get('/register', (req, res) => {
    res.json({msg: 'register'})
})

router.post('/registration', async (req, res) => {
    const { firstName, lastName } = req.body

    try {
        const user = await User.create({firstName, lastName })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
})

export default router;