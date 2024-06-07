import { ref } from 'vue'
import Cookies from 'js-cookie'

export function useUserIdGenerator() {
    const userId = ref<string | null>(null)

    function generateUserId() {
        const newUserId = Math.random().toString(36).substr(2, 9)
        userId.value = newUserId
        Cookies.set('userId', newUserId, { expires: 30 })
    }
    function isCookieExist() {
        const existingUserId = Cookies.get('userId')
        console.log(existingUserId)
        if (existingUserId !== undefined) {
            return true
        }
        return false
    }
    function getUserIdFromCookie() {
        const existingUserId = Cookies.get('userId')

        if (existingUserId) {
            userId.value = existingUserId
        } else {
            generateUserId()
        }
    }

    return {
        userId,
        generateUserId,
        getUserIdFromCookie,
        isCookieExist,
    }
}
