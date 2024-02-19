'use strict'

import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'
import Course from './course.model.js'

export const testC = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'test function is running' })
}

export const save = async (req, res) => {
    try{
        let data =  req.body
        let course = new Course(data)
        await course.save()
        return res.send({message: `saved course succesfully ${course.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saved'})
    }
}