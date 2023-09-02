<script>
import { mapState, mapActions } from 'pinia'
import { useFavoriteStore } from '../stores/favorite'
import { useUserStore } from '../stores/user'
export default {
  props: ['dataMarvel'],
  data: () => ({
    model: null
  }),
  computed: {
    ...mapState(useUserStore, ['isLogin', 'isSubscribed'])
  },
  methods: {
    ...mapActions(useFavoriteStore, ['addToFavorite']),
    async getFavoriteData(data) {
      try {
        let name = data.name
        let imgUrl = data.thumbnail.path + '.' + data.thumbnail.extension
        let Urls = data.urls[0].url

        await this.addToFavorite({ name, imgUrl, Urls })
        this.$router.push({
          name: 'myfavorites'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <v-sheet class="mx-auto" elevation="8" max-width="800">
    <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
      <v-slide-group-item
        v-for="n in dataMarvel"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          color="grey-lighten-1"
          :class="['ma-4', selectedClass]"
          height="200"
          width="100"
          @click="toggle"
        >
          <v-img :src="n.thumbnail.path + '.' + n.thumbnail.extension" cover height="200"> </v-img>
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                size="48"
                icon="mdi-close-circle-outline"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" height="200">
        <div class="text-center fill-height align-center justify-center">
          <h3 class="text-h6">{{ dataMarvel[model].name }}</h3>
          <v-btn
            v-for="i in dataMarvel[model].urls"
            :key="i"
            :href="i.url"
            prepend-icon="mdi-details"
            class="mx-2"
          >
            {{ i.type }}
          </v-btn>
          <v-btn
            v-if="isSubscribed && isLogin"
            prepend-icon="mdi-bookmark"
            @click="getFavoriteData(dataMarvel[model])"
            >add to my favorites</v-btn
          >
        </div>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>
