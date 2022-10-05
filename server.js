// import jsonServer from 'json-server'
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults({
//     static: './dist',
// })

// const port = process.env.PORT || 5000

// server.use(middlewares)


// server.use("/api", router)
// // server.use(router)
// server.listen(port, () => {
//     console.log(`JSON server is running! port:${port}`)
// })

import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';

const app = express ()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/', express.static(__dirname, './dist'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'dist','index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


app.listen (process.env.PORT || 5000, console.log('tudo certo'))