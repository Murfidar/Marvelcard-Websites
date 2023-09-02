<script>
import TheCarousel from '../components/TheCarousel.vue'
import { mapState, mapActions } from 'pinia'
import { useContentStore } from '../stores/content'
export default {
  data: () => ({
    model: null
  }),
  components: {
    TheCarousel
  },
  computed: {
    ...mapState(useContentStore, ['comics', 'characters', 'series'])
  },
  methods: {
    ...mapActions(useContentStore, ['getCharacters', 'getComics', 'getSeries']),
  },
  created() {
    this.getCharacters()
    this.getComics()
    this.getSeries()
  }
}
</script>

<template>
  <main>
    <div>
      <h2 class="text-center">Marvel Characters</h2>
      <TheCarousel :dataMarvel="characters.data.characters" />
    </div>
    <div>
      <h2 class="text-center">Marvel Comics</h2>
      <TheCarousel :dataMarvel="comics.data.comics" />
    </div>
    <div>
      <h2 class="text-center">Marvel Series</h2>
      <TheCarousel :dataMarvel="series.data.series" />
    </div>
  </main>
</template>
