export const strict = false

export const state = () => ({
  sidebar: false,
  token: null,
  title: 'Danesh Boom',
  is_authenticated: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setToken (state, value) {
    state.token = value
  },
  setAuthenticated (state, value) {
    state.is_authenticated = value
  },
  setTitle (state, value) {
    state.title = value
  }
}
