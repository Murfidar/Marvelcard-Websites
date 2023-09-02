<script>
import { mapStores, mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      username: '',
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
    ...mapActions(useUserStore, ['handleRegister']),
    async sendRegisterDetail() {
      try {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
        let data = { username: this.username, email: this.email, password: this.password }
        await this.handleRegister(data)
      } catch (error) {
        console.log(error)
      }
    },
    toHome() {
      this.$router.push({
        name: 'home'
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
    <v-form @submit.prevent="sendRegisterDetail()">
      <v-text-field
        v-model="username"
        prepend-inner-icon="mdi-account"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Username"
      ></v-text-field>

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
        Sign Up
      </v-btn>

      <br />

      <v-btn block color="success" size="large" type="submit" variant="elevated" @click="toHome">
        Back
      </v-btn>
    </v-form>
  </v-sheet>
</template>
