const express = require('express');

const users = require('./controllers/users');
const login = require('./controllers/login');
const transactions = require('./controllers/transactions');
const verificaLogin = require('./filters/verify_login');

const router = express();
router.post('/usuario', users.resgistrarUsuario);
router.post('/login', login);

router.use(verificaLogin);

router.get('/usuario', users.detalharUsuario);
router.put('/usuario', users.atualizarUsuario);
router.get('/transacao/extrato', transactions.extrato)
router.get('/categoria', transactions.listarCategorias);
router.get('/transacao', transactions.listarTransacoes);
router.get('/transacao/:id', transactions.detalharTransacao);
router.post('/transacao', transactions.cadastrarTransacao);
router.put('transacao/:id', transactions.atualizarTransacao);
router.delete('transacao/:id', transactions.deletarTransacao);


module.exports = router;