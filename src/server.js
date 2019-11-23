const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
// Criar servidor Http abstraindo do express
const server = http.Server(app);
// Permitir o servidor ouvir no modo websocket
const io = socketio(server);
// conexão com o mongodbAtlas
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-mrfsd.mongodb.net/aula?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};
// Armazena os usuarios conectados
io.on('connection', socket => {
    const {user_id} = socket.handshake.query
    connectedUsers[user_id] = socket.id;
});
// Permitir o reconhecimento dos usuarios em tempo real para toda a aplicação
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

// Tipos de que em uma requisição
    // req.query = Get
    // req.params = Put e Delete
    // req.body = Post

// Permite o acesso por diferentes clientes
// app.use(cors({ origin: 'http://localhost:3333'})); Limita o uso para o cliente localhost:3333
app.use(cors());
// Permite interpretação de json para o express
app.use(express.json());
// Permite retornar arquivos estaticos(arquivos) no express sem a necessidade de criar uma nova rota
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
// Utilização do arquivo routes na app
app.use(routes);
// Porta de escuta da app
server.listen(3333);