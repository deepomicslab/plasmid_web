/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
/* eslint-disable import/order */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 文件路由和布局系统
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import routes from 'virtual:generated-pages'
const router = createRouter({
    history: createWebHistory(),
    routes: setupLayouts(routes),
})
app.use(router)

// import { basicSetup } from 'codemirror'
// import VueCodemirror from 'vue-codemirror'
// app.use(VueCodemirror, {
//     // optional default global options
//     autofocus: true,
//     disabled: false,
//     indentWithTab: true,
//     tabSize: 5,
//     placeholder: 'Code goes here...',
//     extensions: [basicSetup],
//     // ...
// })
// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)

// NaiveUI Fonts
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

// Element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// import GSignInButton from 'vue-google-signin-button'
// app.use(GSignInButton)

// WindiCSS
import 'virtual:windi.css'

// NProgress
// index.html 中通过 #nprogress .bar 修改进度条颜色
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
    showSpinner: true, // 进度环
    easing: 'ease', // 动画效果，例如淡入淡出等
    speed: 500, // 动画速度
    minimum: 0.3, // 最低百分比
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
    NProgress.done()
})

app.mount('#app')
