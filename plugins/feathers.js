import {url} from '../configs/base-url'

// import Vue from 'vue'
const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')

export default (context, inject) => {
  const socket = io(url)
  const app = feathers()
    .configure(socketio(socket))
    .configure(auth({storage: window.localStorage}))

  inject('app', app)
}

// Vue.use(feathers)
