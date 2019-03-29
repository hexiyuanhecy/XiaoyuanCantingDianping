<template>
  <div id="lateral">
      <v-tabs-items v-model="tabs">
        <v-tab-item
          v-for="content in ['one', 'two', 'three']"
          :key="content"
          :value="content"
        >
          <v-card height="200px" flat>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-fab-transition>
        <v-btn
          :key="activeFab.icon"
          v-model="fab"
          color="white"
          dark
          fab
          fixed
          bottom
          left
        >
          <v-icon>keyboard_arrow_up</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
</template>

<script>
export default {
  name: 'banner',
  data: () => ({
    fab: false,
    hidden: false,
    tabs: null
  })
}
</script>

<style lang="scss" scoped>
#lateral .v-speed-dial,
#lateral .v-btn--floating {
  position: absolute;
}
#lateral .v-btn--floating {
  margin: 0 0 16px 16px;
}
</style>
