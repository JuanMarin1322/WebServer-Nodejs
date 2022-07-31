const { response} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');


const usuariosGet = async (req, res = response) => {
    
    // const {q,nombre,f='No F' }= req.query;
    const query = { estado : true};

    //Sacar parametros e la URL 
     const { limite = 5 ,desde = 0 }  = req.query;

    //  const usuarios = await Usuario.find( query)
    //         .skip(Number(desde))
    //         .limit(Number(limite));

    //  const total = await Usuario.countDocuments( query);

     const [ total, usuarios] = await Promise.all([ 
        Usuario.countDocuments( query),
        Usuario.find( query)
            .skip(Number(desde))
            .limit(Number(limite))
         
    ]);

    res.json({
        msg:"get API - Controlador",

        total,
        usuarios
        // q,
        // nombre,
        // f

        });
    }
      
const usuariosPut =  async (req, res = response) => {

    const { id } = req.params;

    const { _id, password,google, correo, ...resto } = req.body;


    //Validar contra base de datos 

    if( password ){

        const salt = bcryptjs.genSaltSync();
        resto.password =bcryptjs.hashSync( password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.json({
        msg:"Put API - Controlador",
        usuario
        });
    }
 
const usuariosPost =  async  (req, res = response) => {

    const { nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol});


    //Verificar que el correo existe

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password =bcryptjs.hashSync( password, salt);
    
    //Guardar en base de datos
    await usuario.save();
    
    res.json({
        msg:"Post API - Controlador",
        usuario
        });
    }   

const usuariosDelete =  async (req, res = response) => {
    
    const { id } = req.params;

    //Fisicamente lo borramos

    // NO ES RECOMENDADO ELIMIANR UN USUARIO DE LA ABSE DE DATOS MEJOR DAR DE BAJA
    // const usuario = await Usuario.findByIdAndDelete( id );


    //Cambiar estadod el usuario

    const usuario = await Usuario.findByIdAndUpdate( id,{ estado:false });

    res.json({
        msg:"Delete API - Controlador",
        usuario

        });
    }  

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}   


