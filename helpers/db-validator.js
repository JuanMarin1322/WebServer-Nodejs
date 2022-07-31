const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido =async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol){

            throw new Error(`El rol ${rol} no está registrado en la BD`);
    }

}

const emailExiste = async correo  => {

    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
            throw new Error(`El correo: ${correo} ya está registrado `);
    }

}

const idExiste = async id  => {

    const existeID = await Usuario.findById(id);
    if ( !existeID){
            throw new Error(`El ID: ${id} no se encuentra en la base de datos `);
    }

}


module.exports={
    esRolValido,
    emailExiste,
    idExiste
}

