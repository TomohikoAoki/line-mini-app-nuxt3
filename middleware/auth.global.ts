export default defineNuxtRouteMiddleware((to, from) => {
    const { getUserToken } = useUser()

    console.log('to.path', to.path)

    if (to.path === '/' && !!getUserToken()) {
        return navigateTo('/top')
    }
    if (to.path !== '/' && !getUserToken()) {
        return navigateTo('/')
    }
})