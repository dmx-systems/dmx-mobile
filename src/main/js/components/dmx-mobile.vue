<template>
  <div class="dmx-mobile">
    <dmx-main-menu></dmx-main-menu>
    <dmx-login-dialog :visible="loginVisible" @logged-in="loggedIn" @close="closeLogin"></dmx-login-dialog>
    <dmx-search-widget :visible="searchVisible" :create-enabled="createEnabled" :create-topic-types="createTopicTypes"
      :search-assoc-types="searchAssocTypes" width="96%" layout="column"
      @topic-click="revealTopic" @topic-create="createTopic" @close="closeSearch">
    </dmx-search-widget>
    <dmx-detail-panel :object="object" :writable="writable" :tab="tab" :mode="mode" :quill-config="quillConfig"
      no-pin-button @tab-click="tabClick" @edit="edit" @submit="submit" @submit-inline="submitInline"
      @child-topic-reveal="revealTopic" @related-topic-click="revealTopic" @related-icon-click="revealTopic">
    </dmx-detail-panel>
  </div>
</template>

<script>
// import dmx from 'dmx-api'

export default {

  computed: {

    object () {
      return this.$store.state.object
    },

    writable () {
      return this.$store.state.writable
    },

    tab () {
      return this.$store.state.details.tab
    },

    mode () {
      return this.$store.state.details.mode
    },

    quillConfig () {
      return this.$store.state.quillConfig
    },

    loginVisible () {
      return this.$store.state.login.visible
    },

    searchVisible () {
      return this.$store.state.search.visible
    },

    createEnabled () {
      return this.$store.state.login.username !== ''
    },

    createTopicTypes () {
      return this.$store.getters.createTopicTypes
    },

    searchAssocTypes () {
      return []   // FIXME: dmx.typeCache.getAllAssocTypes()
    }
  },

  methods: {

    loggedIn (username) {
      this.$store.dispatch('loggedIn', username)
    },

    closeLogin () {
      this.$store.dispatch('closeLoginDialog')
    },

    revealTopic (topic) {
      this.$store.dispatch('callTopicRoute', topic.id)
    },

    createTopic ({topicType, value}) {
      this.$store.dispatch('createTopic', {topicType, value})
    },

    closeSearch () {
      this.$store.dispatch('closeSearchWidget')
    },

    tabClick (tab) {
      let detail = tab
      // clicking 1st tab while in form mode
      if (tab === 'info' && this.mode === 'form') {
        // 1st tab is selected already -> no-op
        if (this.tab === 'info') {
          return
        }
        // another tab is currently selected -> resume editing
        detail = 'edit'
      }
      //
      this.$store.dispatch('selectDetail', detail)
    },

    edit () {
      this.$store.dispatch('selectDetail', 'edit')
    },

    submit (object) {
      this.$store.dispatch('submit', object)
      this.$store.dispatch('selectDetail', 'info')
    },

    submitInline (object) {
      this.$store.dispatch('submit', object)
    }
  },

  components: {
    'dmx-main-menu':     require('./dmx-main-menu').default,
    'dmx-login-dialog':  require('dmx-login-dialog').default,
    'dmx-search-widget': require('dmx-search-widget').default,
    'dmx-detail-panel':  require('dmx-detail-panel').default
  }
}
</script>

<style>
.dmx-mobile {
  height: 100%;
  display: flex;
}

.dmx-mobile .dmx-detail-panel {
  flex-grow: 1;
  background-color: var(--background-color);
}
</style>
