const {exec} = require("child_process")

!(() => {
	const httpServer = require("http-server")
	const server = httpServer.createServer({})
	const host = "127.0.0.1"
	server.listen(null, host, () => {
		const port = server.server.address().port
		console.log(`Server running at http://${host}:${port}`)
	})
	exec("npm run build:watch")
})()
