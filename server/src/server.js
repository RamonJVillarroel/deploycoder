const express = require('express');
const { PORT } = require('./env.config');
const { logger } = require('./logger/logger')
const MongoContainer = require('./models/containers/mongo.containers')
const appRoutes = require('./routers/app.routes')
const { errorMiddleware } = require('./middleware/error.middleware')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', appRoutes)
app.use(errorMiddleware)
app.use((req, res) => {
  res.status(404);
  logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
});

const server = app.listen(PORT, () => {
  MongoContainer.connect().then(() => {
    logger.trace(`servidor activo en el puerto: ${PORT}`);
    logger.trace('conectado a mongo');
  })
})

server.on('error', error => {
  logger.trace(`error ${error}`);
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})

module.exports = app;
