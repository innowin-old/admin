import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

let option = {
  query: {
    token: window.localStorage.getItem('token')
  },
  autoConnect: true
}

Vue.use(VueSocketio, 'http://localhost:3030', option)
