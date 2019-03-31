<template>
  <v-card>
    <v-container
      fluid
      grid-list-md
    >
      <v-layout row wrap>
        <v-flex
          v-for="card in cards"
          :key="card.title"
          v-bind="{ [`xs${card.flex}`]: true }"
        >
          <v-card>
            <v-img
              :src="card.src"
              height="150px"
            >
            </v-img>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'card',
  props: {
    mold: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
