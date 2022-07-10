const conection = require('../conection');
const senhaSecreta = require('secure-password');



const pwd = senhaSecreta();

const resgistrarUsuario = async(req, res) =>{
    const { nome, email, senha } = req.body;

    if(!nome || !email || !senha) {
        return res.status(400).json('Os campos nome, email e senha são obrigatórios!');
    }

    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rowCount: userRows} = await conection.query(query, [email]);

        if (userRows > 0) {
            return res.status(401).json('Já existe usuário cadastrado com o e-mail informado');
        }          
    } catch (e) {
        return res.status(400).json(e.message);
    };

    try {
       
        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
        
        const queryRegistrarUsuario = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
        const resgistrarUsuario = await conection.query(queryRegistrarUsuario, [ nome, email, hash]);

        if (resgistrarUsuario.rowCount === 0) {
            return res.status(400).json('Erro na inserção');
        }

        const query = "SELECT * FROM usuarios WHERE email = $1";
        const usuario = await conection.query(query, [email]);

        const usuarioEncontrado = usuario.rows[0];

        const { senha: senhaUsuario, ...dadosUsuario } = usuarioEncontrado;
        
        return res.status(201).json({usuario: dadosUsuario});

        
    
    } catch (e) {
        return res.status(500).json(e.message);
    };
};

const detalharUsuario = async (req, res) => {
    const { usuario } = req;
    
    try {

        const queryEncontrarUsuario = 'SELECT * FROM usuarios  WHERE id = $1';
        const { rows } = await conection.query(queryEncontrarUsuario, [usuario.id]);
        
        const usr = rows[0];
        const { senha: senhaUsuario, ...dadosUsuario } = usr;
        
        return res.status(200).json(dadosUsuario);
                
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { usuario } = req;

    if (!token) {
        return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    }

    try {
                
        const queryAtualizar = "UPDATE usuarios SET nome = $1, senha = $2, email = $3";
        const usuarioAtualizar = await conection.query(queryAtualizar, [nome, senha, email]);

        if (usuarioAtualizar.rowCount === 0) {
            return res.status(400).json("Não foi possível realizar atualização");

        }
        
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rowCount: usuarioRows} = await conection.query(query, [usuario.email]);
    
        if (usuarioRows > 0) {
            return res.status(401).json('Já existe usuário cadastrado com o e-mail informado');
        }     
        
        return res.status(201);
    
    } catch (e) {
        return res.status(500).json(e.message);
    }    
} 

module.exports = { 
    resgistrarUsuario,
    detalharUsuario,
    atualizarUsuario,
}