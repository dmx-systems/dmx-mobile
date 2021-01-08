import DMXWebSocket from 'dmx-websocket'
import store from './store/mobile'

/* eslint no-new: 0 */

// messages handled by this app (see mobile.js)
const MESSAGES = [
  'processDirectives',
  'newTopicType',     // TODO: refactor message processing from actions into a Vue event bus.
  'newAssocType',     // The app developer should not care about the 3 "new" messages as they
  'newRoleType'       // are handled internally by the "dmx" library (see type-cache.js).
]

new DMXWebSocket('systems.dmx.webclient', message => {
  if (MESSAGES.includes(message.type)) {
    store.dispatch('_' + message.type, message.args)
  }
})
