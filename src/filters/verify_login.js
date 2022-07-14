const conection = require('../conection');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_Secret');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json('Token não informado.');

    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, jwtSecret);
            
        const queryVerificacao = "SELECT * FROM usuarios WHERE id = $1";
        const { rows, rowsCount } = await conection.query(queryVerificacao, [id]);
        
        if (rowsCount === 0) {
            return res.status(404).json("Usuário não encontrado");
        }

        
        const { senha, ...usuario } = rows[0];

        req.usuario = usuario;

        next();

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = verificaLogin;