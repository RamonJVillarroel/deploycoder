const express = require('express');
const { PORT } = require('./env.config');
const logger = require ('./logger/logger')
const MongoContainer = require('./models/containers/mongo.containers')
const apiRoutes = require('./routers/api.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', apiRoutes);

const server = app.listen(PORT,()=>{
    MongoContainer.connect().then(()=>{
        logger.infoLogger(`server en el puerto, ${PORT}`);
        logger.infoLogger('CONECTADO A MONGO');
    })
})
server.on('error', error=>{
    logger.errorLogger(`error ${error}`);
}
)