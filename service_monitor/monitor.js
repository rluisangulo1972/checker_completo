// estableciendo dependencias a ser utilizadas en el archivo monitor.js
// dependencias utilizadas: redis, axios, socketio y dotenv
require('dotenv').config();// para que pueda procesar las variables de entorno
const redis = require('redis');
const io = require('socket.io')(4000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});
const cors = require('cors');
// inicializamos las variables de entorno para que sea ajustable a lo deseado
// estas variables estarán contempladas en el archivo docker-compose.yml
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const BACKEND_INICIAL_NAME = process.env.BACKEND_INICIAL_NAME;
const BACKEND_INICIAL_HOST = process.env.BACKEND_INICIAL_HOST;
const BACKEND_INICIAL_PORT = process.env.BACKEND_INICIAL_PORT;
const clientRedis = redis.createClient({url: `redis://${REDIS_HOST}:${REDIS_PORT}`});
// ---------------------------------------------------------------------------------
const axios = require('axios');
clientRedis.connect();

io.on('connection', (socket) => {
    console.log('A client connected');
})

// creando al función que realizará el servicio de monitor al backend_inicial
const checkBackendInicial = async () => {
    try {
        await axios.get(`http://${BACKEND_INICIAL_HOST}:${BACKEND_INICIAL_PORT}`);
        clientRedis.set('service_status', 'saludable')
    } catch (err) {
        clientRedis.set('service_status', 'no_saludable')
        console.log('Invocacion al servicion backen errado: ',err);
    }
}

// estbaleciendo los intervalos de tiempo para el monitoreo que realiza la función checkBackenInicial
// leyenda --> 5000 = 5 segundos ; 10000 = 10 segundos
setInterval(async () => {
    const status = await clientRedis.get('service_status');
    io.emit('status_updated', {service: BACKEND_INICIAL_NAME, status});
    console.log(`Evento emitido: ${status}`)
}, 5000)

setInterval(checkBackendInicial, 10000)