const Watchpack = require("watchpack")
const path = require("path");
const {execSync} = require("child_process")

const wp = new Watchpack({
	aggregateTimeout: 500,
})

wp.watch({
	directories: [path.resolve(__dirname, "../src")]
})

// 不要直接从本文件运行
wp.on("change", (filePath, mtime, explanation) => {
	console.log("Watch Build: ", new Date().toLocaleString())
	try {
		execSync("npm run build", {cwd: process.cwd()})
	} catch (e) {
		console.error("Watch Build: Error")
	}
})
