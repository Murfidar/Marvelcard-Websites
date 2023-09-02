import { defineStore } from 'pinia'
import axios from 'axios'
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://iproject-marvelcard.kfcapi.site'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
      id: 0,
      username: '',
      email: '',
      isSubscribed: false,
      imgAvatar: ''
    }
  },
  actions: {
    async handleLogin(loginDetail) {
      try {
        let { email, password } = loginDetail
        const { data } = await axios({
          method: 'post',
          url: `${baseUrl}/login`,
          data: { email, password }
        })
        localStorage.setItem('access_token', data.access_token)
        await this.fetchUser()
        this.router.push({ name: 'home' })
      } catch (error) {
        this.router.push({ name: 'login' })
        console.log(error)
      }
    },
    async handleRegister(registerDetail) {
      try {
        let { username, email, password } = registerDetail
        await axios({
          method: 'post',
          url: `${baseUrl}/register`,
          data: { username, email, password }
        })
        this.router.push({ name: 'login' })
      } catch (error) {
        this.page = 'login'
        console.log(error)
      }
    },
    async fetchUser() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/users`,
          headers: { access_token: localStorage.access_token }
        })
        this.isLogin = true
        this.id = data.id
        this.username = data.username
        this.email = data.email
        this.isSubscribed = data.isSubscribed
        this.imgAvatar = data.imgAvatar
      } catch (error) {
        this.page = 'login'
        console.log(error)
      }
    },
    async changeSubscribeStatus() {
      try {
        await axios({
          method: 'patch',
          url: `${baseUrl}/users/subscribed`,
          headers: { access_token: localStorage.access_token }
        })
        await this.fetchUser()
      } catch (error) {
        console.log(error)
      }
    },
    async payment() {
      try {
        const { data } = await axios({
          method: 'post',
          url: `${baseUrl}/users/generate-payment-tokens`,
          headers: { access_token: localStorage.access_token }
        })

        let cb = this.changeSubscribeStatus()

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            cb()
            console.log(result)
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert('wating your payment!')
            console.log(result)
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert('payment failed!')
            console.log(result)
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
