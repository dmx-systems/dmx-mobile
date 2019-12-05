import DM5WebSocket from 'dm5-websocket'
import store from './store/mobile'
import dm5 from 'dm5'

// TODO: move the "Client ID" aspect to dm5-websocket module.
// The app developer should not be required to care about.

const clientId = newClientId()
updateClientIdCookie()

window.addEventListener('focus', updateClientIdCookie)

/* eslint no-new: 0 */

new DM5WebSocket('systems.dmx.webclient', dispatcher)

// messages handled by this app (see mobile.js)
const messages = [
  'processDirectives',
  'newTopicType',     // TODO: refactor message processing from actions into a Vue event bus.
  'newAssocType',     // The app developer should not care about the 3 "new" messages as they
  'newRoleType'       // are handled internally by the "dm5" library (see type-cache.js).
]

function dispatcher (message) {
  if (messages.includes(message.type)) {
    store.dispatch('_' + message.type, message.args)
  }
}

function newClientId () {
  return Math.floor(Number.MAX_SAFE_INTEGER * Math.random())
}

function updateClientIdCookie () {
  // console.log('dmx_client_id', clientId)
  dm5.utils.setCookie('dmx_client_id', clientId)
}
