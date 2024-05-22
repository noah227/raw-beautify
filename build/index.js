const fs = require("fs")
const path = require("path")
const sass = require("sass")

!(() => {
	const srcRoot = path.resolve(__dirname, "../src")
	// 读取入口文件夹列表
	const dirList = fs.readdirSync(srcRoot).map(d => [d, path.resolve(srcRoot, d)]).filter(([_, p]) => fs.statSync(p).isDirectory())
	// 初始化输出文件夹
	const outputRoot = path.resolve(__dirname, "../dist")
	if (fs.existsSync(outputRoot)) fs.rmSync(outputRoot, {recursive: true})
	fs.mkdirSync(outputRoot)
	// !!!源文件不要创建index.scss，创建了也不会处理
	dirList.forEach(([d, p]) => {
		fs.mkdirSync(path.resolve(outputRoot, d))
		const scssFiles = fs.readdirSync(p).filter(d => d.endsWith("scss")).filter(d => d !== "index.scss")
		// 遍历处理scss
		scssFiles.forEach(scss => {
			const scssPath = path.resolve(p, scss)
			const outputPath = path.resolve(outputRoot, `${d}/${scss.replace(/\.scss$/, "")}.css`)
			console.log("Compile", scssPath, outputPath)
			fs.writeFileSync(outputPath, sass.compile(scssPath).css, {encoding: "utf8"})
		})
		// 创建统一入口
		const unifiedEntryContent = [
			`/* Auto Generated @${new Date().toLocaleString()} */`,
			...scssFiles.map(scss => `@import "./${scss.replace(/\.scss$/, "")}.css";`)
		].join("\n")
		fs.writeFileSync(path.resolve(outputRoot, d, "index.css"), unifiedEntryContent, {encoding: "utf8"})
	})
})()
