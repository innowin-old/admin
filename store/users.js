export const state = () => ({
  list: [],
  done: false
})

export const mutations = {
  get (state, value) {
    state.list = value
  },
  add (state, user) {
    state.list.push(user)
  },
  remove (state, id) {
    this.$app.service('users').remove(id).then(user => { console.log('DELETED:', user) })
    state.list.splice(state.list.indexOf(state.list.find(e => e._id === id)), 1)
  },
  done (state) {
    state.done = true
  }
}
