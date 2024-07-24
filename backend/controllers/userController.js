import User from '../models/userModel.js'

// create users
const createUser = async (req, res) => {
    const { firstName, lastName } = req.body

    try {
        const user = await User.create({firstName, lastName })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}

//get all users
const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// single user
const getUser = async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}


export default createUser;