## ʹ�� ni ��������

```
$ npm install -g @antfu/ni
```

## �����ʽ��

VSCode ��װ��������������ڼ��͸�ʽ�����룺

-   dbaeumer.vscode-eslint
-   esbenp.prettier-vscode
-   stylelint.vscode-stylelint

��`.vscode/settings.json`����ȫ�����������ñ����ļ��Զ���ʽ�����룺

```json
{
    "editor.formatOnSave": true
}
```

## commit ��Ϣ��ʽ

�ύʱ�ο�`commitlint.config.js`�е���ʾ���ϱ�Ҫ��ǰ׺��ģ�����ƣ�����

-   `fix(user): logging failed`
-   `feat(task): new task`
-   `style: format code`
-   ...

## �������

required

-   windicss �� vscode ���
-   Volar

optional

-   DotENV
-   Auto Close Tag
-   Auto Comment Blocks
-   Git Graph
-   Material Icon Theme
-   Project Manager
-   ����

# ʹ�õ������������Դ

����ģ�弯�ɵ���Ҫ���ߺ�ʹ�÷�ʽ��

## ʹ���ļ�·��

�ļ��ṹ��·�ɽṹ���ο� [vite-plugin-pages ����ĵ�](https://github.com/hannoeru/vite-plugin-pages)

**�����÷�**

���õ��ļ���·�ɵĶ�Ӧ��ϵ��

-   `src/pages/index.vue` => `/`
-   `src/pages/users.vue` => `/users`
-   `src/pages/users/[id].vue` => `/users/:id`
-   `src/pages/users/create.vue` => `/users/create`

�����г���`src/pages`����Ŀ¼���ᱻʶ��Ϊ·���ļ���

-   `components`: ��žֲ����
-   `helper.ts` or `helpers/**/*.ts`: ��žֲ������߼�
-   `composables`: ��žֲ����ʽ API

**Ƕ��·��**

��Ҫһ����Ŀ¼ͬ�����ļ����ܱ�����ΪǶ��·�ɣ�����

```
pages
|-- index.vue
|-- users.vue
|-- users
    |-- index.vue
    |-- create.vue
```

��Ӧ��·�����£�ʡ����������Ϣ��

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

��ͬʱ����`users.vue`��`users/index.vue`ʱ��`/users`ҳ���ʵ�������Ƕ��߹�ͬ��Ⱦ�Ľ����

`users.vue`��·��Ƕ���ļ�������ض���`<router-view />`��ǩ��

**·���б�**

ͨ������ķ�ʽ��ȡ���ɵ�·���б�

```typescript
import routes from '~pages'
// or
import routes from 'virtual:generated-pages'
```

## ʹ�� pinia ״̬����

����һ�����û���ص�״̬����Ӧ���½�һ��`src/store/user.ts`�ļ���������ṹ��

```typescript
import { defineStore } from 'pinia'

interface State {
    name: string
    age: number
}

export const useUserStore = defineStore({
    id: 'userState',
    // ״̬����Ӧ���ڼ�ͷ�����з���
    state: (): State => ({
        name: 'barwe',
        age: 8,
    })
    // ����״̬�ļ�������
    getters: {
        // �� this ��ȡ��ǰ Pinia Store ʵ��
        // ��Ҫ��ʽָ������ֵ����
        hiName(): number {
        return `Hi, ${this.name}`
    },
},
    // �첽/ͬ������
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

ʹ��ʱֱ�ӵ��룺

```typescript
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

console.log(userStore.name, userStore.normalName)

const users = await userStore.loadAllUsers
```

## ʹ�� NaiveUI �����

ʹ�� NaiveUI ����⣬�Ƚϻ�Ծ��BUG ���١�

��ģ����ֱ��ʹ��������Զ��������룺

```vue
<template>
	<n-button>Click<n-button>
</template>
```

ʹ�������ʱ�������� `<n-button>` Ҳ������ `<NButton>`��

## ʹ�� iconify ͼ���

����ʹ�� iconify ͼ��⣺<https://icon-sets.iconify.design/>

iconify �ۺ��˶���ӿ⣬��������ֱ��ʹ�á�

������ģ����ֱ��ʹ�������﷨���� mdi �ӿ��е� ab-testing ͼ��:

```html
<i-mdi-ab-testing />
```

���� NaiveUI ʹ�õ�ͼ��⣺<https://www.xicons.org/>���÷��ο� NaiveUI ������

## ʹ�� lodash ���߿�

JavaScript ʵ�ù��߿⣬�ṩ�˶����顢���ϡ����������ԡ���ѧ�����֡�����Seq���ַ����Լ��ܶ�ʵ�ú�����

> https://www.lodashjs.com/

## ʹ�� vueuse ���ʽ API ��

�ṩ�˳������ʽ API ʵ�ù��߼��ϡ�

> https://vueuse.org/guide/

����⹤�߾޶࣬����ʵ�õĿ��Լ�������

## ʹ�� windicss д css

��װ WindiCSS IntelliSense �����

# ʹ�ñ����������Դ

## ʹ���Զ������

ʹ���Զ������ʱ��ʹ��`<MyComponent>`������ʽ��������`<my-component>`��

**ȫ�����**

ȫ�����д��`src/components/`�У���Щ���ֱ��ʹ�ã��������롣

ȫ��ʹ�õ����ʽ API д��`src/composables`�С�

ȫ��ʹ�õĸ����߼�д��`src/utils`���档

**�ֲ����**

�ֲ����д������ҳ���`components`Ŀ¼�£����ǲ��ᱻ�ļ�·��ʶ��

�ֲ������Ҫ�����ʽ API д��ÿ��ҳ���µ�`composables`Ŀ¼�У����ǲ��ᱻ�ļ�·��ʶ��

�ֲ��߼�����д��`helper.ts`����`helpers`Ŀ¼�£����ǲ��ᱻ�ļ�·��ʶ��

## ʹ�ñ��� SVG ��Դ

���� SVG ��Դ��Ҫ��������ʹ�ã����뷽ʽ���£�

```typescript
import iconUrl from './my-icon.svg'

import iconUrl from './my-icon.svg?url'
// '/assets/my-icon.2d8efhg.svg'

import iconRaw from './my-icon.svg?raw'
// '<?xml version="1.0"?>...'

import IconComponent from './my-icon.svg?component'
// <IconComponent />
```

## ʹ�ñ���ͼƬ��Դ

# ���˽����Ĳ���

## ��Ӧ���ݵĸ�ʽ

axios ����ǰ����Ӧ�������ģ�

```typescript
{
    status: number
    statusText: string
    data?: any
    //...
}
```

����`status`ָ���� HTTP ��Ӧ״̬�룬`data` ָ���� Response Body��

Response Body ���������ͣ�JSON ���ݺ�ԭʼ���ݣ��ļ��ȣ���

���� JSON ���ݣ�`data`��Ӧ�û���װһ�� **ҵ��״̬��**��

����һ������ JSON ���ݵ���Ӧ�ṹӦ���ǣ�

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

����`data`����Ӧ���ݣ��ڲ��`data`��ҵ�����ݡ�

axios ��������Ӧʱ�Զ������쳣�ͽ����

-   ��Ӧ״̬�벻Ϊ 200 ʱ���쳣�ص�������ӡ�쳣�Ҳ������κ�����
-   ��Ӧ״̬��Ϊ 200 ��ҵ��״̬�벻Ϊ 0 ʱ����ӡ�쳣������ҵ������
-   ��Ӧ״̬��Ϊ 200 ��ҵ��״̬��Ϊ 0 ʱ����������ҵ������

���Ծ��� axios ���ش���󷵻ص���ҵ�����ݣ���������Ӧ���ݣ����ʽ���£�

```typescript
{
    code: number
    message: string
    data?: any
}
```

����д���ο�`src/api`�µ� demo �ļ���

## ��ôд���󷽷�

һ��ģ���Ӧһ�� api �ļ��������û�ģ��`src/api/user.ts`��

```typescript
type User = { name: string; age: number }

const userService = {
    getUser: (id: number) => request.get(`/users/${id}`) as JsonResponse<User>,
    getUsers: () => request.get('users') as JsonResponse<User[]>,
    getUserProfile: (id: number) => request.get(`/users/${id}/profile`) as RawResponse,
}

export default userService
```

Ӧ�õ���һ��Ĭ�ϵ�`xxxService`����ͨ���ö���ɵ�����ص� api��

```typescript
import userService from '@/api/user'
```

vite �Ѿ������˴������ж�`/api`�ķ��ʶ����ᱻת������ˡ�

axios �������Զ����`api`ǰ׺���������󷽷��в���Ҫ����顣

## ��ô��ҳ���з�������

vue-request �ṩ��`useRequest`���ڹ�������״̬���÷�

```typescript
const { data, loading, error, ... } = useRequest(userServive.getUsers)
```

## ʹ�ú�˷�ҳ

vue-request �ṩ��`usePagination`���ڹ����ҳ������״̬��

## ǰ��ģ����Ӧ

�ο�`/mock/test.ts`��д����

# ����淶

## ��������

**ts ����**

-   ��ͨ��������camelCase
-   ���ʽ API���� use ��ͷ������`useRequest`
-   Pinia Store ������ use ��ͷ���� Store ��β������`useUserStore`
-   ���󷽷������� Service ��β������`userService`

**������ļ�����**

-   ���ļ�·��ʶ������������·����������������`src/pages/users/create.vue`
-   �Զ���ȫ�ֻ��߾ֲ��������������ĸ��д������`HelloWorld.vue`

**ʹ�����**

-   ʹ�������������`<NButton>` or `<n-button>`
-   ʹ���Զ��������`<HelloWorld>`

**��ʽ**

-   �Զ���� CSS class ������ c ��ͷ��������������ʽ����������`c-header-title`

## ��������

### ��ͷ����

����

-   �޲�ʱ�����ţ�`() => []`
-   һ������ʱ����д����ʱ���ü����ţ�`x => x + 1`
-   һ������ʱ����Ҫд���ͱ�������ţ�`(x: number) => x + 1`

����ֵ

-   �򵥱��ʽʱ���üӻ����ţ�`x => x + 1`
-   ����һ������ʱ��Բ���ţ�`() => ({})`
-   ��������ʱ����Ҫ��Բ���ţ�`() => []`
-   ������ϸ���ʱʹ�� return: `() => { return }`

---

# дע���ĵ�

�Ա������������ӿڵ�ע���ĵ���Ҫ��`/** ... */`д��ͷ�����ܱ� VSCode ʶ��

```typescript
/** ����һ������ */
const user = null

/** ����һ���򵥵Ľӿ� */
type User = { name: string }

/** ����һ������һ��Ľӿڣ�������Ҫ���������� */
type Task = {
    /** ����һ�����Ե�˵�� */
    createdAt: Date
}

/** ����һ���򵥵ĺ��������ܲ���Ҫ���Ͳ��� */
function f1() {
    console.log(666)
}

/** ����һ���򵥵ĺ��������ܲ���Ҫ���Ͳ��� */
const f2 = () => {
    console.log(666)
}

/** ����һ�����ӵ�ĺ�����������Ҫ�����²���
 * @param name ����
 * @param option.case ���ִ�Сд
 * @returns balabala
 */
function sayHi(name: string, option: { case?: boolean }) {
    /* ... */
}
```

`//` д��ע�Ͳ��ܱ��༭��ʶ��ʱ�ĵ���ע�ͣ�ֻ���Լ����͡�

����Ϊ`/** DOC */`��������Ƭ�ο�����룺

```json
"д��ע���ĵ�": {
    "prefix": ["//", "///", "��"],
    "body": "/** $0 */"
  }
```

# д Vue ���

## �Զ������д������

�ļ�·���������·��Ҫ��д��

�Զ���ȫ�����д��`src/components`���棬���Ʊ����� PascalCase.vue ����ʽ��

�Զ���ֲ����д�ڸ���ҳ���`components`���棬���Ʊ����� PascalCase.vue ����ʽ��

## �Զ����������ģ���е�ʹ��

�Զ��������ʹ�ñ����� `<PascalCase />` ��ʽ��

-   ������ʱʹ���Ապϣ�`<PascalCase />`
-   ������ʱ��`<PascalCase>innerHTML</PascalCase>`

## ������ʹ�� Props

����ʱ��Ҫ��

-   ���б�Ҫдע�ͣ�������`/** DOC */`
-   ����д vue ���������`type`, `required`, `default`, `validator`, ...
-   ����д ts ���ͼ�飺�������͡����캯�����Զ���ӿڡ�...

ʹ�� Props ��ֵʱʹ�� kebab-case���� DOM ģ�屣��һ�¡�

**���˾���ʹ�� camelCase ���ã�������� prop ���Ƴ��ֵ�λ��**

## ʹ�� vue �ĺ��� API

VCA ������Ҫ�õ��� API ����`ref`, `reactive`, `computed`�ȶ��Ѿ��Զ������ˡ�

����֮�⣬�Զ������ API ����

-   vue-request �ṩ��`usePagimation`, `useRequest`

-   vue-use �ṩ��`useRouter`, `useRoute`

# д�Լ������ʽ API

VCA (Vue Composition API) �����ܵ�����װ��ʵ�ִ���ĸ��á�

���ʽ API һ��ʹ�� use ǰ׺������һ��������ʡ�

�Զ���ȫ�� VCA д��`src/composables`���档

�Զ���ֲ� VCA д������ҳ���`composables`���档

Pinia �� Store ������ʵҲ�� VCA ��ʽ��

# дȫ�ֹ��ߺ���

ȫ�ֵĹ��ߺ���д��`src/utils`���棬����

-   `exdate.ts` ����ʱ��Ĺ���
-   `exdom.ts` ֱ�Ӳ��� DOM �Ĺ���
-   `exhash.ts` ���ݶ���Ĺ���
-   `exlist.ts` �����б����飩�Ĺ���
-   `exstring.ts` �����ַ����Ĺ���
-   ����

�� ex ǰ׺��Ϊ�˱��������õĻ������󲿷ַ��� lodash ���ṩ�ˣ�lodash û�ṩ�Ŀ���д�����

# д���ͽӿ�

�Լ�д�����ͽӿڷŵ�`src/typings`���棬���ͽӿڷ��������`type`�ؼ��ֶ�����`interface`�ؼ���д�ӿڡ�

`src/typings/index.ts`��ͨ�õ����ͽӿڣ�����������Щ�ӿڱ�`any`��΢��һ��㣺

```typescript
declare type SRecord<T> = Record<string, T>
declare type SARecord = SRecord<any>
declare type SBRecord = SRecord<boolean>
declare type SNRecord = SRecord<number>
declare type SSRecord = SRecord<string>
```

`src/typings/component.d.ts`���������������ص�һЩ�ӿڡ�

`src/typings/extend.d.ts`����չ�����ö���Ľӿڡ�

`src/typings/auto-components.d.ts`���Զ���������������Ҫ�޸ģ���

`src/typings/auto-import.d.ts`���Զ������ API������Ҫ�޸ģ���

# д��ʽ

����ʽֱ���� windicss д��Ԫ���ϡ�

��Ҫ��װ����ʽ��

-   ��������Ҫ�õ���д�� windicss �� shortcuts ��
-   ֻ�е�ǰ����õ���д��`style scope` ��ǩ��
-   �޸ĵ�������Ĭ����ʽ��д��`App.vue` �� `style` ��ǩ��

��û�б�Ҫ����д�Զ���� css �ļ���?��

# ��������

## ��������׳���Ϣ

�ο� NaiveUI �� `MessageApi` �ӿڣ��Ѿ����ص�`window.$message`�����ϣ�

```typescript
window.$message.info()
window.$message.success()
window.$message.warn()
window.$message.error()
```
