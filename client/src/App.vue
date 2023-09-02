<script>
import TheNavbar from './components/TheNavbar.vue'
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from './stores/user'

export default {
  components: {
    TheNavbar
  },
  computed: {
    ...mapWritableState(useUserStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUser'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true
      this.fetchUser()
    } else this.isLogin = false
  }
}
</script>

<template>
  <TheNavbar />
  <router-view />
</template>
