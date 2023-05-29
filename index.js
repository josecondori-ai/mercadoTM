import express from 'express'
import bodyParser from 'body-parser'
import dotenv from  'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'

import {router} from './routes/users.js'




const app =express()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:true}))
//app.set('view',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(router)

// ruta para ver como queda el diseño
//  app.get('/',(req,res)=>{
//     res.render('admin/dashboard')
//  })


 
// app.use(userRoutes)

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATABASE,{

})


app.listen(process.env.PORT,()=>{
    console.log('servidor inciado')
})