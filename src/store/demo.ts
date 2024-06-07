import { defineStore } from 'pinia'

// 必要的类型注解
interface UserRecordRaw {
    firstName: string
    secondName: string
    age: number
}

// 必要的状态类型注解
interface State {
    users: UserRecordRaw[]
}

export const useUserStore = defineStore({
    id: 'userState',
    // 状态集合应该在箭头函数中返回
    state: (): State => ({
        users: [],
    }),
    // 定义计算属性
    getters: {
        numUsers(): number {
            return this.users.length
        },
    },
    // 异步/同步动作
    actions: {
        getAdultUsers() {
            return this.users.filter(u => u.age >= 18)
        },
        async loadAllUsers() {
            const userApi = { getAll: async () => ({ data: { users: [] } }) }
            const r = await userApi.getAll()
            this.users = r.data.users
            return this.users
        },
    },
})
