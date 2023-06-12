import express from 'express'
const router=express.Router()
import passport from 'passport'
import crypto from 'crypto'
import async from 'async'
import nodemailer from 'nodemailer'






import User from '../models/usermodel.js'




function eselUsuario(req,res){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error_msg','por favor logueate en la pagina')
    res.redirect('login')
}
//Get

router.get('/login',(req,res)=>{
    res.render('users/login')
 })

 router.get('/registrar',eselUsuario,(req,res)=>{
    res.render('users/registrar')
})

router.get('/loguot',(req,res)=>{
    req.logOut()
      req.flash('success_msg','Se cerro la sesion')
       res.redirect('/login')
    })
    
    router.get('/olvide',(req,res)=>{
        res.render('users/olvide')
    })
    
    //get cambiarpassword
    
    
    
    router.get('/alluser',eselUsuario,(req,res)=>{
       User.find({})
           .then(users=>{
               res.render('users/alluser',{users:users})
            })
            .catch(error=>{
               req.flash('error_msg','Error',error)
               res.redirect('users/alluser')
    
            })
    })
    

    //get editar usuario

    router.get('/edituser/:id',(req,res)=>{
       let buscarId={_id:req.params.id}
       User.findOne(buscarId)
           .then(user=>{
               res.render('users/edituser',{user:user})
           })
           .catch(error=>{
            req.flash('error_msg','Error',error)
            res.redirect('users/allusers')
           })
       
       
    })
    
    //POST
    

router.post('/login',passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/login',
    failureFlash:'email o password invalidos. Intente nuevamente!!'
}))





router.post('/registrar',(req,res)=>{
    
    let{nombre,email,password}=req.body;
    let userData={
        nombre:nombre,
        email:email
    }

    User.register(userData,password,(error,user)=>{
        if(error){
            req.flash('error_msg','Error',error)

            res.redirect('/registrar')
        }
       req.flash('success_msg','Cuenta creada')
        res.render('users/login')
    })

})
//cerrar sesion

 router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard')
 })

 

//todos los usuarios



router.delete('/eliminar/users/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.deleteOne(buscarId)
    .then(user=>{
        req.flash('success_msg','usuario eliminado')
        res.redirect('users/allusers')
    })
    .catch(error=>{
        req.flash('error_msg','ERROR:',error)
        res.redirect('users/allusers')

    })
})

//cambiar contraseña de un usuario registrado
router.post('/cambiarcontrasenia',(req,res)=>{
   if(req.body.password!==req.body.confirmpassword){
    //distintos password
    req.redirect('/cambiarcontrasenia')
   }
   //que tengo q saber la persona por email
   User.findOne({email:req.user.email})
    .then(dato=>{
        dato.setPassword(req.body.password,error=>{
            dato.save()
            .then(info=>{
                req.flash('success_msg','el password fue cambiado')
                res.redirect('/cambiarcontrasenia')
            })
        })
        .catch(error=>{
            req.flash('error_msg','ERROR:',error)
            res.redirect('/cambiarcontrasenia')
        })
    })
    
})


export {router}
