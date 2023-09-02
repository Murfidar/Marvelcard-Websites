<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  computed: {
    ...mapState(useUserStore, ['isLogin', 'isSubscribed','username'])
  },
  methods: {
    ...mapActions(useUserStore, ['payment']),
    pay(){
      this.payment()
    },
    logout() {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer class="bg-deep-purple" theme="dark" expand-on-hover rail>
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-account" :title="username"></v-list-item>
          <v-divider></v-divider>
          <router-link to="/">
            <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
          </router-link>
          <router-link to="/myfavorites">
            <v-list-item v-if="isSubscribed" prepend-icon="mdi-bookmark" title="My Favorites"></v-list-item>
          </router-link>
          <v-list-item v-if="!isSubscribed && isLogin" prepend-icon="mdi-account-credit-card-outline">
            <v-btn class="py-2" @click="pay" block> Subscribed Now!!! </v-btn>
          </v-list-item>
          <router-link to="/characters">
            <v-list-item prepend-icon="mdi-account-box" title="Characters"></v-list-item>
          </router-link>
          <router-link to="/comics">
            <v-list-item prepend-icon="mdi-book" title="Comics"></v-list-item>
          </router-link>
          <router-link to="/series">
            <v-list-item prepend-icon="mdi-book" title="Series"></v-list-item>
          </router-link>
        </v-list>

        <template v-slot:append>
          <v-list >
          <div v-if="isLogin" class="pa-2">
            <v-list-item prepend-icon="mdi-logout">
              <v-btn @click="logout" block> Logout </v-btn>
            </v-list-item>
          </div>
          <div class="pa-2" v-else>
              <v-list-item prepend-icon="mdi-login">
                <router-link to="/register">
                  <v-btn class="py-2" block> Sign Up </v-btn>
                </router-link>
              </v-list-item>
              <v-list-item prepend-icon="mdi-login">
                <router-link to="/login">
                  <v-btn class="py-2" block> Login </v-btn>
                </router-link>
              </v-list-item>
            </div>
          </v-list>
          </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
