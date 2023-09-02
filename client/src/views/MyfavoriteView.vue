<script>
import TheFavoriteCard from '../components/TheFavoriteCard.vue'
import { mapState, mapActions } from 'pinia'
import { useFavoriteStore } from '../stores/favorite'
export default {
  components: {
    TheFavoriteCard
  },
  computed: {
    ...mapState(useFavoriteStore, ['favorites', 'favoritesId'])
  },
  methods: {
    ...mapActions(useFavoriteStore, ['getFavoriteCard', 'deleteFavorite'])
  },
  created() {
    this.getFavoriteCard()
  }
}
</script>

<template>
  <h2 class="text-center">My Favorite Cards</h2>
  <div class="my-5">
    <TheFavoriteCard :dataMarvel="favorites" />
  </div>
</template>
