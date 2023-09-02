<script>
import TheCard from '../components/TheCard.vue'
import { mapState, mapActions } from 'pinia'
import { useContentStore } from '../stores/content'
export default {
  data() {
    return {
      page: 1,
      search: null,
      limit: 18
    }
  },
  components: {
    TheCard
  },
  computed: {
    ...mapState(useContentStore, ['series'])
  },
  methods: {
    ...mapActions(useContentStore, ['getSeries']),
    onClick() {
      this.loading = true

      if (this.search === '') this.getSeries(null, this.limit, this.page - 1)
      else this.ggetSeries(this.search, null, this.page - 1)

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  },
  watch: {
    page() {
      this.getSeries(this.search, this.limit, this.page - 1)
    }
  },
  created() {
    this.getSeries(this.search, this.limit, this.page - 1)
  }
}
</script>

<template>
  <h2 class="text-center">Marvel Series</h2>
  <div class="my-5 mx-15 px-6 py-8">
    <v-card class="mx-auto" max-width="344">
      <v-text-field
        class="mb-5"
        :loading="loading"
        v-model="search"
        density="compact"
        variant="solo"
        label="Search Cuisine"
        append-inner-icon="mdi-magnify"
        single-line
        clearable
        hide-details
        color="red"
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card>
    <TheCard :dataMarvel="series.data.series" />
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="series.data.total / limit"
                rounded="circle"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
