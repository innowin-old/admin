export const state = () => ({
  list: [],
  done: false
})

export const mutations = {
  get (state, value) {
    state.list = value
  },
  add (state, instance) {
    state.list.push(instance)
  },
  remove (state, id) {
    this.$app.service('researches').remove(id).then(instance => { console.log('DELETED:', instance) })
    state.list.splice(state.list.indexOf(state.list.find(e => e._id === id)), 1)
  },
  done (state) {
    state.done = true
  }
}
