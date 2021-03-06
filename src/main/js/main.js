import Vue from 'vue'
import App from './components/App'
import dmx from 'dmx-api'
import store from './store/mobile'
import router from './router'
import onHttpError from './error-handler'
import 'font-awesome/css/font-awesome.css'
import './element-ui'
import './websocket'

console.log('[DMX Mobile] 0.3.1')

// 1) Init dmx library
// The dmx library must be inited *before* the dmx-webclient component is instantiated.
// The dmx-webclient component relies on the "typeCache" store module as registered by dmx.init(). ### TODO: still true?
const dmxready = dmx.init({
  store,
  onHttpError,
  iconRenderers: {}
})

// 2) Register store modules
store.registerModule('login',   require('./store/login').default)
store.registerModule('search',  require('./store/search').default)
store.registerModule('details', require('./store/details').default)

// 3) Register store watcher
store.watch(
  state => state.login.username,
  username => {
    if (username) {
      dmx.rpc.getPrivateWorkspace().then(workspace => {
        dmx.utils.setCookie('dmx_workspace_id', workspace.id)
      })
    } else {
      dmx.utils.deleteCookie('dmx_workspace_id')
    }
  }
)

// 4) Create Vue root instance
// Instantiates router-view and dmx-webclient components.
const root = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

// 5) Initial navigation
// Initial navigation must take place *after* the webclient plugins are loaded.
// The "workspaces" store module is registered by the Workspaces plugin.
Promise.all([
  // Both, the Topicmap Panel and the Detail Panel, rely on a populated type cache.
  // The type cache must be ready *before* "initialNavigation" is dispatched.
  dmxready,
  // Initial navigation might involve "select the 1st workspace", so the workspace
  // topics must be already loaded.
  // store.state.workspaces.ready   // ### TODO?
]).then(() => {
  store.dispatch('initialNavigation')
})
