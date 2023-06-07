import express from 'express'
const router=express.Router()
import passport from 'passport'





import User from '../models/usermodel.js'


//USUARIOS

router.get('/login',(req,res)=>{
    res.render('users/login')
 })

 router.get('/registrar',(req,res)=>{
    res.render('users/registrar')
})
router.get('/loguot',(req,res)=>{
    req.logOut()
      // req.flash('success_msg','Se cerro la sesion')
       //enviar o mostrar mensaje de salida de sesion
       res.redirect('/login',{salio:salio})
    })

    router.get('/olvide',(req,res)=>{
        res.render('users/olvide')
     })
    




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
            // req.flash('error_msg','ERROR:'+error)
            res.redirect('/registrar')
        }
    //    req.flash('success_msg','Cuenta creada')
        res.render('users/login')
    })

})
//cerrar sesion

 router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard')
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
        .catch(error=>{
            //mensaje del error
            res.redirect('users/allusers')
        })
    
    
 })

router.delete('/eliminar/users/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.deleteOne(buscarId)
    .then(user=>{
        //mensaje se borro con exito
        res.redirect('users/allusers')
    })
    .catch(error=>{
        //mensaje error en la base
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
                //mensaje todo ok
                res.redirect('/cambiarcontrasenia')
            })
        })
        .catch(error=>{
            //mensaje error
            res.redirect('/cambiarcontrasenia')
        })
    })
    
})
/*fetch('llamo a la api') 
then(response=>response)
*/


//  export default router

export {router}
