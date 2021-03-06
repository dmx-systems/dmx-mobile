import dmx from 'dmx-api'

const state = {
  username: '',       // logged in user (string); empty string if no user is logged in
  visible: false,     // login dialog visibility
}

const actions = {

  loggedIn (_, username) {
    console.log('loggedIn', username)
    state.username = username
  },

  logout ({dispatch}) {
    console.log('logout', state.username)
    dmx.rpc.logout().then(() => {
      state.username = ''
      dispatch('loggedOut')
    })
  },

  openLoginDialog () {
    state.visible = true
  },

  closeLoginDialog () {
    state.visible = false
  }
}

export default {
  state,
  actions
}

// init state

dmx.rpc.getUsername().then(username => {
  state.username = username
})
