import express from 'express'
import bodyParser from 'body-parser'
import dotenv from  'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'
import LocalStrategy from 'passport-local'
import flash from 'connect-flash'
import {router} from './routes/users.js'
import User from './models/usermodel.js'
//soy un comentario
const app =express()
//morgan para mirar las peticiones 
app.use(morgan('dev'))
//obtenemos los datos del formulario
app.use(bodyParser.urlencoded({extended:true}))

//motor de plantilla EJS
app.set('view engine','ejs')
//para el uso de la carpate de public
app.use(express.static('public'))

//rutas
app.use(router)
//datos del env
dotenv.config({path:'./config.env'})

//conexion de la base de datos
mongoose.connect(process.env.DATABASE,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex :true
})
.then(mensaje=>{
    console.log('se conecto a la base')
})

// app.use(passport.initialize())
// app.use(passport.session())
//passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));

//middleware de mensaje flash
// app.use(flash())

//configurar los mensaje globales
//app.use(())


app.listen(process.env.PORT,()=>{
    console.log('servidor inciado')
})
