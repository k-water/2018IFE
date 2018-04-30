import san from 'san'
import {
    router
} from 'san-router'
import Hello from './hello/hello.san'
router.add({
    rule: '/',
    Component: Hello,
    target: '#app'
})

router.start()

if (module.hot) {
    // 实现热更新
    module.hot.accept()
}