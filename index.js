import express from 'express'
import bodyParser from 'body-parser'
import dotenv from  'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'

import userRoutes from ('./routes/users')



const app =express()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:true}))
//app.set('view',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'))




 app.get('/',(req,res)=>{
    res.render('pages/index')
 })

app.use(userRoutes)

app.listen(3035,()=>{
    console.log('servidor inciado')
})