import express from 'express'
import path  from 'path'
import bodyParser from 'body-parser'

import dotenv from  'dotenv'



import mongoose from 'mongoose'
import flash from 'connect-flash'
import session from 'express-session'



import passport from 'passport'


import morgan from 'morgan'

import LocalStrategy from 'passport-local'

import {router} from './routes/users.js'
const app =express()
app.use(morgan('dev'))

import User from './models/usermodel.js'
dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex :true
})
.then(mensaje=>{
    console.log('se conecto a la base')
})

app.use(session({
    secret:'secreto',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()))
//en la base esta la persona con email pepe@gmail.com es true


app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    res.locals.error=req.flash(('error'))
    res.locals.currentUser=req.user
    next()
})


app.use(bodyParser.urlencoded({extended:true}))


app.set('view engine','ejs')

app.use(express.static('public'))


app.use(router)


app.listen(process.env.PORT,()=>{
    console.log('servidor inciado')
})




