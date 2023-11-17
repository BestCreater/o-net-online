import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './style.css'
import App from './App.vue'


const app = createApp(App)




app.use(router)
// app.use(elementIcons)
// app.component('svg-icon', SvgIcon)


// 使用element-plus 并且设置全局的大小
// app.use(ElementPlus, {
//     locale: locale,
//     // 支持 large、default、small
//     size: Cookies.get('size') || 'default'
// })
app.use(ElementPlus)
app.mount('#app')

// createApp(App).mount('#app')

