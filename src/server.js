const express = require('express');
const path = require('path')
const { PORT } = require('./env.config');
const {logger} = require ('./logger/logger')
const MongoContainer = require('./models/containers/mongo.containers')
const apiRoutes = require('./routers/api.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', apiRoutes);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, './public')));
const server = app.listen(PORT,()=>{
    MongoContainer.connect().then(()=>{
        logger.trace(`server in the port, ${PORT}`);
        logger.trace('connected to mongo');
    })
})
server.on('error', error=>{
    logger.trace(`error ${error}`);
}
)