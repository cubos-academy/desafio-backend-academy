const conection = require('../conection');
const senhaSecreta = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_Secret');

const pwd = senhaSecreta();

const login = async (req, res) => {
    const  { email, senha } = req.body;

    if(!email || !senha) {
        return res.status(401).json('Para fazer o login, informar email e senha');
    }

    try{
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const usuario = await conection.query(query, [email]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Email ou senha incorretos.');
        }

        const usuarioEncontrado = usuario.rows[0];

        const resultado = await pwd.verify(
            Buffer.from(senha), 
            Buffer.from(usuarioEncontrado.senha, 'hex')
        );

        switch(resultado) {
            case senhaSecreta.INVALID_UNRECOGNIZED_HASH:
            case senhaSecreta.INVALID:
                return res.status(400).json("Email ou senha invalidos.");
            case senhaSecreta.VALID:
                break;
            case senhaSecreta.VALID_NEEDS_REHASH:
                try{
                    const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
                    const query = ('UPDATE usuarios set senha = $1 WHERE email = $2');
                    await conection.query(query, [hash, email]);
                } catch {};      
            break;  
        }


        const token = jwt.sign( 
            {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            }, jwtSecret, {
            expiresIn: "2h"
        });

        const { senha: senhaUsuario, ...dadosUsuario } = usuarioEncontrado
        
        return res.status(200).json({usuario: dadosUsuario, token});

    } catch (e){
        return res.status(400).json(e.message);
    }
};



module.exports = login;