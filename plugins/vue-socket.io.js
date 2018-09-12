import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

import {url} from '../configs/base-url'

let option = {
  query: {
    token: window.localStorage.getItem('token')
  },
  autoConnect: true
}

Vue.use(VueSocketio, url, option)
