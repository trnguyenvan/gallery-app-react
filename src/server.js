const jsonServer = require('json-server')
const path = require('path')
const router = jsonServer.router(path.join('./data/db.json'))
const server = jsonServer.create();
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use('/api', router)
server.listen(8000, () => {
  console.log('JSON Server is running')
})