/* eslint-disable indent */
export const state = () => ({
    list: [],
    done: false
})

export const mutations = {
    get (state, value) {
        state.list = value
    },
    add (state, value) {
        state.list.push(value)
    },
    remove (state, id) {
        this.$app.service('provinces').remove(id).then(instance => { console.log('DELETED:', instance) })
        state.list.splice(state.list.indexOf(state.list.find(e => e._id === id)), 1)
    },
    done (state) {
        state.done = true
    }
}
