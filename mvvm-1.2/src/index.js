import './index.css'

let a = 'hello world'
document.body.innerHTML = a
console.log('这是webpack打包的入口文件')

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept()
}