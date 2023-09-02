<script>
import { mapStores, mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      email: '',
      password: '',
      visible: false,
      loading: false
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    ...mapActions(useUserStore, ['handleLogin', 'handleGoogleLogin']),
    async sendLoginDetail() {
      try {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)

        let data = { email: this.email, password: this.password }
        await this.handleLogin(data)
      } catch (error) {
        console.log(error)
      }
    },
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    required(v) {
      return !!v || 'Field is required'
    }
  }
}
</script>

<template>
  <v-sheet max-width="300" class="my-16 mx-auto">
    <v-form @submit.prevent="sendLoginDetail()">
      <v-text-field
        v-model="email"
        prepend-inner-icon="mdi-email-outline"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        placeholder="Enter your password"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <br />

      <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
        Sign In
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="#" @click="toRegister">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-form>
  </v-sheet>
</template>
