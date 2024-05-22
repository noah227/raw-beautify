const path = require("path");
const fs = require("fs");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
})

const init = () => {
	readline.question("输入要初始化的资源: ", name => {
		const sourceRoot = path.resolve(__dirname, name)
		if (fs.existsSync(sourceRoot)) {
			console.warn(`${sourceRoot}已存在！`)
			return init()
		} else readline.close()
		console.log(`初始化：${sourceRoot}`)
		fs.mkdirSync(sourceRoot)
		const {tagList} = require("./config")
		fs.writeFileSync(path.resolve(sourceRoot, "variables.scss"), "/* 公共变量区 */\n", {encoding: "utf8"})
		tagList.forEach(({tagName}) => {
			const outputPath = path.resolve(sourceRoot, `${tagName}.scss`)
			fs.writeFileSync(outputPath, `${tagName} {\n\n}`, {encoding: "utf8"})
			console.log(`已创建：${outputPath}`)
		})
		console.log("初始化已完成")
	})

}

init()

