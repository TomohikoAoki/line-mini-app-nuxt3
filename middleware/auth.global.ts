export default defineNuxtRouteMiddleware((to, from) => {
    const { getUserToken } = useUser()

    if (to.path === '/' && !!getUserToken()) {
        return navigateTo('/top')
    }
    if (to.path !== '/' && !getUserToken()) {
        return navigateTo('/')
    }
})