## 使用 ni 管理依赖

```
$ npm install -g @antfu/ni
```

## 代码格式化

VSCode 安装下面三个插件用于检查和格式化代码：

-   dbaeumer.vscode-eslint
-   esbenp.prettier-vscode
-   stylelint.vscode-stylelint

在`.vscode/settings.json`或者全局设置中配置保存文件自动格式化代码：

```json
{
    "editor.formatOnSave": true
}
```

## commit 消息格式

提交时参考`commitlint.config.js`中的提示加上必要的前缀和模块名称，例如

-   `fix(user): logging failed`
-   `feat(task): new task`
-   `style: format code`
-   ...

## 其他插件

required

-   windicss 的 vscode 插件
-   Volar

optional

-   DotENV
-   Auto Close Tag
-   Auto Comment Blocks
-   Git Graph
-   Material Icon Theme
-   Project Manager
-   ……

# 使用第三方组件和资源

开发模板集成的主要工具和使用方式。

## 使用文件路由

文件结构即路由结构，参考 [vite-plugin-pages 插件文档](https://github.com/hannoeru/vite-plugin-pages)

**基本用法**

常用的文件和路由的对应关系：

-   `src/pages/index.vue` => `/`
-   `src/pages/users.vue` => `/users`
-   `src/pages/users/[id].vue` => `/users/:id`
-   `src/pages/users/create.vue` => `/users/create`

下面列出的`src/pages`的子目录不会被识别为路由文件：

-   `components`: 存放局部组件
-   `helper.ts` or `helpers/**/*.ts`: 存放局部辅助逻辑
-   `composables`: 存放局部组合式 API

**嵌套路由**

需要一个与目录同名的文件才能被解析为嵌套路由，例如

```
pages
|-- index.vue
|-- users.vue
|-- users
    |-- index.vue
    |-- create.vue
```

对应的路由如下（省略了其他信息）

```typescript
;[
    { name: 'index', path: '/' },
    {
        path: '/users',
        children: [
            { name: 'users', path: '' },
            { name: 'users-create', path: 'create' },
        ],
    },
]
```

在同时存在`users.vue`和`users/index.vue`时，`/users`页面的实际内容是二者共同渲染的结果。

`users.vue`是路由嵌套文件，里面必定有`<router-view />`标签。

**路由列表**

通过下面的方式获取生成的路由列表：

```typescript
import routes from '~pages'
// or
import routes from 'virtual:generated-pages'
```

## 使用 pinia 状态管理

定义一个与用户相关的状态对象，应该新建一个`src/store/user.ts`文件，其基本结构是

```typescript
import { defineStore } from 'pinia'

interface State {
    name: string
    age: number
}

export const useUserStore = defineStore({
    id: 'userState',
    // 状态集合应该在箭头函数中返回
    state: (): State => ({
        name: 'barwe',
        age: 8,
    })
    // 基于状态的计算属性
    getters: {
        // 用 this 获取当前 Pinia Store 实例
        // 需要显式指定返回值类型
        hiName(): number {
        return `Hi, ${this.name}`
    },
},
    // 异步/同步动作
    actions: {
        async loadAllUsers() {
            const userApi = { getAll: async () => ({ data: { users: [] } }) }
            const r = await userApi.getAll()
            this.users = r.data.users
            return this.users
        },
    }
})
```

使用时直接导入：

```typescript
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

console.log(userStore.name, userStore.normalName)

const users = await userStore.loadAllUsers
```

## 使用 NaiveUI 组件库

使用 NaiveUI 组件库，比较活跃，BUG 较少。

在模板中直接使用组件，自动按需引入：

```vue
<template>
	<n-button>Click<n-button>
</template>
```

使用组件库时，可以用 `<n-button>` 也可以用 `<NButton>`。

## 使用 iconify 图标库

优先使用 iconify 图标库：<https://icon-sets.iconify.design/>

iconify 聚合了多个子库，无需引入直接使用。

例如在模板中直接使用下面语法导入 mdi 子库中的 ab-testing 图标:

```html
<i-mdi-ab-testing />
```

另外 NaiveUI 使用的图标库：<https://www.xicons.org/>，用法参考 NaiveUI 官网。

## 使用 lodash 工具库

JavaScript 实用工具库，提供了对数组、集合、函数、语言、数学、数字、对象、Seq、字符串以及很多实用函数。

> https://www.lodashjs.com/

## 使用 vueuse 组合式 API 库

提供了常用组合式 API 实用工具集合。

> https://vueuse.org/guide/

这个库工具巨多，遇到实用的可以记下来。

## 使用 windicss 写 css

安装 WindiCSS IntelliSense 插件。

# 使用本地组件和资源

## 使用自定义组件

使用自定义组件时，使用`<MyComponent>`这种形式，而不是`<my-component>`。

**全局组件**

全局组件写到`src/components/`中，这些组件直接使用，无需引入。

全局使用的组合式 API 写到`src/composables`中。

全局使用的辅助逻辑写到`src/utils`下面。

**局部组件**

局部组件写到具体页面的`components`目录下，它们不会被文件路由识别。

局部组件需要的组合式 API 写到每个页面下的`composables`目录中，它们不会被文件路由识别。

局部逻辑可以写到`helper.ts`或者`helpers`目录下，它们不会被文件路由识别。

## 使用本地 SVG 资源

本地 SVG 资源需要先引入再使用，引入方式如下：

```typescript
import iconUrl from './my-icon.svg'

import iconUrl from './my-icon.svg?url'
// '/assets/my-icon.2d8efhg.svg'

import iconRaw from './my-icon.svg?raw'
// '<?xml version="1.0"?>...'

import IconComponent from './my-icon.svg?component'
// <IconComponent />
```

## 使用本地图片资源

# 与后端交互的部分

## 响应数据的格式

axios 拦截前的响应是这样的：

```typescript
{
    status: number
    statusText: string
    data?: any
    //...
}
```

其中`status`指的是 HTTP 响应状态码，`data` 指的是 Response Body。

Response Body 有两种类型：JSON 数据和原始数据（文件等）。

对于 JSON 数据，`data`中应该还封装一层 **业务状态码**。

所以一个返回 JSON 数据的响应结构应该是：

```typescript
{
    status: number
    statusText: string
    data?: {
        code: number
        message: string
        data?: any
    }
    //...
}
```

外层的`data`是响应数据，内层的`data`是业务数据。

axios 在拦截响应时自动处理异常和解包：

-   响应状态码不为 200 时由异常回调处理，打印异常且不返回任何内容
-   响应状态码为 200 且业务状态码不为 0 时，打印异常并返回业务数据
-   响应状态码为 200 且业务状态码为 0 时，正常返回业务数据

所以经过 axios 拦截处理后返回的是业务数据，而不是响应数据，其格式如下：

```typescript
{
    code: number
    message: string
    data?: any
}
```

具体写法参考`src/api`下的 demo 文件。

## 怎么写请求方法

一个模块对应一个 api 文件，例如用户模块`src/api/user.ts`：

```typescript
type User = { name: string; age: number }

const userService = {
    getUser: (id: number) => request.get(`/users/${id}`) as JsonResponse<User>,
    getUsers: () => request.get('users') as JsonResponse<User[]>,
    getUserProfile: (id: number) => request.get(`/users/${id}/profile`) as RawResponse,
}

export default userService
```

应该导出一个默认的`xxxService`对象，通过该对象可调用相关的 api：

```typescript
import userService from '@/api/user'
```

vite 已经配置了代理，所有对`/api`的访问都将会被转发到后端。

axios 配置了自动添加`api`前缀，所以请求方法中不需要管这块。

## 怎么在页面中发起请求

vue-request 提供了`useRequest`用于管理请求状态，用法

```typescript
const { data, loading, error, ... } = useRequest(userServive.getUsers)
```

## 使用后端分页

vue-request 提供了`usePagination`用于管理分页和请求状态。

## 前端模拟响应

参考`/mock/test.ts`的写法。

# 代码规范

## 变量命名

**ts 变量**

-   普通变量名：camelCase
-   组合式 API：以 use 开头，例如`useRequest`
-   Pinia Store 对象：以 use 开头，以 Store 结尾，例如`useUserStore`
-   请求方法对象：以 Service 结尾，例如`userService`

**组件的文件名称**

-   被文件路由识别的组件：按照路由名称命名，例如`src/pages/users/create.vue`
-   自定义全局或者局部组件：单词首字母大写，例如`HelloWorld.vue`

**使用组件**

-   使用组件库的组件：`<NButton>` or `<n-button>`
-   使用自定义组件：`<HelloWorld>`

**样式**

-   自定义的 CSS class 名称以 c 开头，避免与其他样式混淆，例如`c-header-title`

## 函数声明

### 箭头函数

参数

-   无参时加括号：`() => []`
-   一个参数时，不写类型时不用加括号：`x => x + 1`
-   一个参数时，需要写类型必须加括号：`(x: number) => x + 1`

返回值

-   简单表达式时不用加花括号：`x => x + 1`
-   返回一个对象时加圆括号：`() => ({})`
-   返回数组时不需要加圆括号：`() => []`
-   函数体较复杂时使用 return: `() => { return }`

---

# 写注释文档

对变量、函数、接口的注释文档需要用`/** ... */`写到头部才能被 VSCode 识别。

```typescript
/** 这是一个变量 */
const user = null

/** 这是一个简单的接口 */
type User = { name: string }

/** 这是一个复杂一点的接口，可能需要解释下属性 */
type Task = {
    /** 这是一个属性的说明 */
    createdAt: Date
}

/** 这是一个简单的函数，可能不需要解释参数 */
function f1() {
    console.log(666)
}

/** 这是一个简单的函数，可能不需要解释参数 */
const f2 = () => {
    console.log(666)
}

/** 这是一个复杂点的函数，可能需要解释下参数
 * @param name 名字
 * @param option.case 区分大小写
 * @returns balabala
 */
function sayHi(name: string, option: { case?: boolean }) {
    /* ... */
}
```

`//` 写的注释不能被编辑器识别时文档型注释，只能自己欣赏。

可以为`/** DOC */`建立代码片段快捷输入：

```json
"写点注释文档": {
    "prefix": ["//", "///", "、"],
    "body": "/** $0 */"
  }
```

# 写 Vue 组件

## 自定义组件写在哪里

文件路由组件按照路由要求写。

自定义全局组件写在`src/components`下面，名称必须是 PascalCase.vue 的形式。

自定义局部组件写在各个页面地`components`下面，名称必须是 PascalCase.vue 的形式。

## 自定义组件的在模板中的使用

自定义组件的使用必须是 `<PascalCase />` 形式：

-   无内容时使用自闭合：`<PascalCase />`
-   有内容时：`<PascalCase>innerHTML</PascalCase>`

## 声明和使用 Props

声明时需要：

-   如有必要写注释，顶行用`/** DOC */`
-   必须写 vue 检查条件：`type`, `required`, `default`, `validator`, ...
-   必须写 ts 类型检查：基本类型、构造函数、自定义接口、...

使用 Props 传值时使用 kebab-case，与 DOM 模板保持一致。

**个人觉得使用 camelCase 更好，方便查找 prop 名称出现的位置**

## 使用 vue 的核心 API

VCA 开发需要用到的 API 例如`ref`, `reactive`, `computed`等都已经自动引入了。

除此之外，自动引入的 API 还有

-   vue-request 提供的`usePagimation`, `useRequest`

-   vue-use 提供的`useRouter`, `useRoute`

# 写自己的组合式 API

VCA (Vue Composition API) 将功能单独封装，实现代码的复用。

组合式 API 一律使用 use 前缀，后面一般跟个名词。

自定义全局 VCA 写到`src/composables`下面。

自定义局部 VCA 写到各个页面的`composables`下面。

Pinia 的 Store 对象其实也是 VCA 格式。

# 写全局工具函数

全局的工具函数写到`src/utils`下面，例如

-   `exdate.ts` 处理时间的工具
-   `exdom.ts` 直接操作 DOM 的工具
-   `exhash.ts` 操纵对象的工具
-   `exlist.ts` 操纵列表（数组）的工具
-   `exstring.ts` 操纵字符串的工具
-   ……

加 ex 前缀是为了避免与内置的混淆，大部分方法 lodash 都提供了，lodash 没提供的可以写到这里。

# 写类型接口

自己写的类型接口放到`src/typings`下面，类型接口分类管理，用`type`关键字而不是`interface`关键字写接口。

`src/typings/index.ts`是通用的类型接口，例如下面这些接口比`any`稍微好一点点：

```typescript
declare type SRecord<T> = Record<string, T>
declare type SARecord = SRecord<any>
declare type SBRecord = SRecord<boolean>
declare type SNRecord = SRecord<number>
declare type SSRecord = SRecord<string>
```

`src/typings/component.d.ts`是与组件库数据相关的一些接口。

`src/typings/extend.d.ts`是扩展的内置对象的接口。

`src/typings/auto-components.d.ts`是自动引入的组件（不需要修改）。

`src/typings/auto-import.d.ts`是自动引入的 API（不需要修改）。

# 写样式

简单样式直接用 windicss 写在元素上。

需要封装的样式：

-   多个组件需要用到，写到 windicss 的 shortcuts 里
-   只有当前组件用到，写到`style scope` 标签里
-   修改的组件库的默认样式，写到`App.vue` 的 `style` 标签里

如没有必要，不写自定义的 css 文件（?）

# 其他问题

## 向浏览器抛出消息

参考 NaiveUI 的 `MessageApi` 接口，已经挂载到`window.$message`对象上：

```typescript
window.$message.info()
window.$message.success()
window.$message.warn()
window.$message.error()
```
