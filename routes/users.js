import express from 'express'
const router=express.Router()

//import User from '../models/usermodel.js'





router.get('/login',(req,res)=>{
    res.render('users/login')
 })

 //cerrar sesion
 router.get('/loguot',(req,res)=>{
    req.logOut()
    //enviar o mostrar mensaje de salida de sesion
    res.redirect('/login')
 })

 router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard')
 })

 router.get('/olvide',(req,res)=>{
    res.render('users/olvide')
 })

//todos los usuarios
 router.get('/alluser',(req,res)=>{
    User.find({})
        .then(users=>{
            res.render('users/alluser',{users:users})
        })
        .catch(error=>{
            //mensaje del error para administrador
            res.redirect('users/alluser')

        })
 })


 router.get('/edituser/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.findOne(buscarId)
        .then(user=>{
            res.render('/users/edituser',{user:user})
        })
    
    
 })
//  export default router

export {router}
