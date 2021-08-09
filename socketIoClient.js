require("dotenv").config();
var socket = require("socket.io-client")(`http://localhost:${process.env.PORT}`);
const repl = require("repl");
const chalk = require("chalk");

socket.on("disconnect", function () {
	socket.emit("disconnected");
});
socket.on("connect", () => {
	console.log(chalk.red("=== start chatting ==="));
	username = process.env.HOSTNAME;
});
socket.on("message", data => {
	const { cmd, username } = data;
	console.log(chalk.green(username + ": " + cmd.split(`\n`)[0]));
});

repl.start({
	prompt: "",
	eval: cmd => {
		socket.send({ cmd, username });
	},
});
