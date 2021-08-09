const http = require("http").createServer();
const io = require("socket.io")(http);

require("dotenv").config();

const port = process.env.PORT || 5000;
io.on("connection", socket => {
	console.log("connected");
	socket.on("message", evt => {
		socket.broadcast.emit("message", evt);
	});
});
io.on("disconnect", () => {
	console.log("some people left");
});
http.listen(port, () => console.log(`server listening on port: ${port}`));
