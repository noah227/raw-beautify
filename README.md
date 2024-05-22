# raw-beautify

> 个人用原生css样式美化

## 概述

* 以原生修饰为主
* 辅以class控制的样式设定

## 使用

本身就是css，直接引入需要使用的即可

```js
// 导入整个主题
import "raw-beautify"
// 导入部分样式
import "raw-beautify/dist/default/button.css"
```

### 个别class辅助控制的说明

* `table.bordered` 启用边框
* `button.[info|primary|success|warning|danger]` 特殊样式的button

## 注意事项

* 入口资源内不要创建index.scss（创建了也会被自动忽略，构建时会自动根据资源文件夹下的scss文件列表创建一个统一的index.scss入口）
