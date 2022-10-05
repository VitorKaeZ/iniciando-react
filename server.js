import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
    static: './dist',
})

const port = process.env.PORT || 5000

server.use(middlewares)


server.use("/api", router)
// server.use(router)
server.listen(port, () => {
    console.log(`JSON server is running! port:${port}`)
})