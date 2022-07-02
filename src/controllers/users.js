const conection = require('../conection');
const securePassword = require('secure-password');

const pwd = securePassword();

const registerUser = async(req, res) =>{
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json('Os campos name, email e password sao obrigatórios!');
    }

    try {
        //verificacao de cadastro existente

        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rowCount: userRows} = await conection.query(query, [email]);

        if (userRows > 0) {
            return res.status(400).json('Já existe usuário cadastrado com o e-mail informado');
        }          
    } catch {
        return res.status(500).json('Erro');
    };

    try {
        //cadastrar usuario
        //criar hash com senha
        const hash = await pwd.hash(Buffer.from.password).toString('hex');
        //insert
        const query = 'INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)';
        const registerUser = await conection.query(query, [name, email, hash]);

        if (registerUser.rowCount === 0) {
            return res.status(400).json('Erro na inserção');
        }

        return res.status(201).json('user.id', 'user.nome', 'user.email')
        //verificar autenticacao c/ token

    } catch (e) {
        return res.status(500).json(e.message);
    };
}

module.exports = registerUser;