export const actions = {
    async nuxtServerInit(vuexContext) {
        await vuexContext.dispatch('getmeta', { root: true })
    }
}