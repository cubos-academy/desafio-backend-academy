const conection = require('../conection');


const listarCategorias = async (req, res) => {
    const { usuario } = req;
       
    try{

               
        const queryEncontrarCategorias = await conection.query(`
        SELECT categoria_id FROM transacoes t 
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = 1`);
        const encontrarCategorias = conection.query(queryEncontrarCategorias, [usuario.id]);
            return res.status(200).json(encontrarCategorias);

    } catch (e) {
        return res.status(500).json(e.message);
    }
};

const listarTransacoes = async (req, res) => {
    const { usuario } = req;

    if (!token) {
        return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    }

    try {
                
        const queryEncontrarTransacoes = `
        SELECT * FROM transacoes t  
        LEFT JOIN categorias c ON t.categoria_id = c.id && t.categoria_nome = c.nome
        LEFT JOIN usuarios u ON t.usuario_id = u.id
        WHERE usuario_id = $1
        `;
        const encontrarTransacoes = await conection.query(queryEncontrarTransacoes, [usuario.id]);
        
        if (encontrarTransacoes.rowCount === 0) {
            return res.status(404).json('Transação não econtrada')
        };
        
        
        const { rows: transacoes } = await conection.query(encontrarTransacoes);
            return res.status(200).json(transacoes);

    } catch (e) {
        return res.status(500).json(e.message);
    }
    
};

const detalharTransacao = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    if (!token) {
        return res.status(401).json("Para acessar este recurso, um token de autenticação válido deve ser enviado.");
    }

    if (!id) {
        return res.status(404).json("Transação não encontrada.");
    }


    try {
        const queryEncontrarTransacao = `
        SELECT * FROM transacoes t  
        LEFT JOIN categorias c ON t.categoria_id = c.id && t.categoria_nome = c.nome  
        LEFT JOIN usuarios u ON t.usuario_id = u.id
        WHERE id = $1, usuario_id = $2
        `;
        const encontrarTransacao= await conection.query(queryEncontrarTransacao, [id, usuario.id]);

        if (transacaoEncontrada.rowCount === 0) {
            return res.status(404).json('Transação não econtrada')
        };
         
        const { rows: transacao } = await conection.query(encontrarTransacao);
            return res.status(200).json(transacao);
        
            
    } catch(e) {
        return res.status(500).json(e.message);
    }
    
};

const cadastrarTransacao = async (req, res) => {
    const { usuario } = req;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!token) {
        return res.status(401).json("Para acessar este recurso, um token de autenticação válido deve ser enviado.");
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json("Todos os campos obrigatórios devem ser informados.")
    }

    const queryEncontrarCategorias = "SELECT * FROM transacoes WHERE categoria_id = $1";
    const queryCategoriasEncontradas = await conection.query(queryEncontrarCategorias, [categoria_id]);

    if (queryCategoriasEncontradas.rows != categoria_id) {
        return res.status(404).json("categoria_id não encontrada.");
    }
    
    if (tipo != "entrada" || tipo != "saida") {
        return res.status(400).json("Por favor, informe se o tipo de transação é uma entrada ou uma saida.");
    }   
    
    try {
          
        const queryRegistrarTransacao = 'INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo) VALUES ($1, $2, $3, $4, $5)';
        const resgistrarTransacao = await conection.query(queryRegistrarTransacao, [descricao, valor, data, categoria_id, tipo]);

        if (resgistrarTransacao.rowCount === 0) {
            return res.status(400).json('Erro na inserção');
        }
        
        const queryTransacaoCadastrada = `
        SELECT * FROM transacoes t  
        LEFT JOIN usuarios u ON t.usuario_id = u.id && t.categoria_id = c.id
        LEFT JOIN categorias c ON 
        LEFT JOIN categorias c ON t.categoria_nome = c.nome
        WHERE usuario_id = $1 
        `
        const transacaoEncontrada = conection.query(queryTransacaoCadastrada, [usuario.id])
        const  { rows: transacao } = await conection.query(transacaoEncontrada);
            
        return res.status(201).json(transacao);
    
        } catch(e) {
        return res.status(500).json(e.message);
    }

}

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id } = req.body;
    const { usuario } = req;

    if (!token) {
        return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    }

    const queryEncontrarCategorias = "SELECT * FROM transacoes WHERE categoria_id = $1";
    const queryCategoriasEncontradas = await conection.query(queryEncontrarCategorias, [categoria_id]);

    if (queryCategoriasEncontradas.rowCount === 0) {
        return res.status(404).json("categoria_id não encontrada.");
    }
    
    if (tipo != "entrada" || tipo != "saida") {
        return res.status(400).json("Por favor, informe se o tipo de transação é uma entrada ou uma saida.");
    }   
    

    try {
        
        const queryTrasacaoExistente = 'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2';
        const transacaoExistente = await conection.query(queryTrasacaoExistente, [id, usuario.id]);

        if (transacaoExistente.rowCount === 0) {
            return res.status(404).json('Transação não econtrada')
        };
        
        const queryAtualizacao = "UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4";
        const transacaoAtualizada = await conection.query(queryAtualizacao, [descricao, valor, data, categoria_id]);

        if (transacaoAtualizada.rowCount === 0) {
            return res.status(400).json("Não foi possível realizar atualização.");

        }
              
        return res.status(201);
    
    } catch (e) {
        return res.status(500).json(e.message);
    }    
} 

const deletarTransacao = async (req, res) => {
    const { usuario } = req;

    if (!token) {
        return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    }

    try {
               
        const queryEncontrarTransacao = 'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2';
        const encontrarTransacao = await conection.query(queryEncontrarTransacao, [id, usuario.id]);

        if (encontrarTransacao.rowCount === 0) {
            return res.status(404).json('Transação não econtrada')
        };

        const { rowCount } = await conection.query('DELETE FROM transacoes WHERE id = $1');

        if (rowCount === 0) {
            return res.status(400).json('Não foi possível deletar transação');
        }

        return res.status(201);
                    
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

const extrato = async (req, res) => {
    const { usuario } = req;

    if (!token) {
        return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
    }

    try {
        
        const queryProcurarTransacoes = 'SELECT * FROM transacoes WHERE usuario_id = $1';
        const transacoesEncontradas = await conection.query(queryProcurarTransacoes, [usuario.id]);

        if (transacoesEncontradas.rowCount === 0) {
            return res.status(404).json('Transação não econtrada')
        };
        
        const querySomarEntrada = 'SELECT SUM (valor) FROM transacoes WHERE tipo = $1 AND usuario_id = $2';
        const somarEntrada = await conection.query(querySomarEntrada, ["entrada", usuario.id]);

        const querySomarSaida = 'SELECT SUM (valor) FROM transacoes WHERE tipo = $1 AND usuario_id = $2';
        const somarSaida = await conection.query(querySomarSaida, ["saida", usuario.id]);
        
        const { valor: entrada } = somarEntrada.rows;
        const { valor: saida } = somarSaida.rows;

        return res.status(201).json(entrada, saida);

        
    } catch (e) {
        return res.status(500).json(e.message);
    }
         
}

module.exports = { 
    listarCategorias,
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    extrato
}