'user strict'

import User from '../user/user.model.js'
import {encrypt, checkPassword, checkUpdate} from '../utils/validator.js'
import Course from '../course/course.model.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'test function is running' })
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let course = await Course.findOne({ _id: data.course })
        if (!course) return res.status(404).send({ message: 'course not found' })
        let user = new User(data)
        await user.save()
        return res.send({ message: `Registered successfully, can be logged with username ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`, 
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}



