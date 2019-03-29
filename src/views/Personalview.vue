<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card
      dark
      flat
    >
      <v-btn
        absolute
        bottom
        color="grey"
        right
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container fill-height><!-- 图片上的文字 -->
          <v-layout align-center>
            <strong class="display-4 font-weight-regular mr-4">8</strong>
            <v-layout column justify-end>
              <div class="headline font-weight-light">Monday</div>
              <div class="text-uppercase font-weight-light">February 2015</div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list class=" darken-2" light>
            <template v-for="(item, index) in items">
              <v-list-tile v-if="item.action" :key="item.title">
                <v-list-tile-action>
                  <v-icon>{{ item.action }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="black--text">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-else-if="item.divider" :key="index"></v-divider>
              <v-subheader v-else-if="item.header" :key="item.header" class="">{{ item.header }}</v-subheader>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'personnal',
  data () {
    return {
      items: [
        {
          action: 'move_to_inbox',
          title: 'Inbox'
        },
        {
          action: 'send',
          title: 'Sent'
        },
        {
          action: 'delete',
          title: 'Trash'
        },
        {
          action: 'report',
          title: 'Spam'
        },
        { divider: true },
        { header: 'Labels' },
        {
          action: 'label',
          title: 'Family'
        },
        {
          action: 'label',
          title: 'Friends'
        },
        {
          action: 'label',
          title: 'Work'
        }
      ]
    }
  }
}
</script>
