<script>
export default {
  props: ['dataMarvel'],
  data: () => ({
    selection: null
  })
}
</script>

<template>
  <v-card max-width="1000" class="mx-auto">
    <v-container class="pa-1">
      <v-item-group v-model="selection" multiple>
        <v-row>
          <v-col v-for="n in dataMarvel" :key="n.id" cols="2">
            <v-item v-slot="{ isSelected, toggle }">
              <v-img
              :src="n.thumbnail.path + '.' + n.thumbnail.extension"
              cover
              height="150"
              class="text-right pa-2"
              @click="toggle"
              >
              <v-btn icon="mdi-details" :href="isSelected ? n.urls[0].url : null"></v-btn>
            </v-img>
            <p>{{ n.name }}</p>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>
</template>
