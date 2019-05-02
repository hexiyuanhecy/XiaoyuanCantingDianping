<template>
  <div id="app">
        <div class="return-bar">
      <v-toolbar
        color="white"
        light
        fixed
        dense>
          <v-btn icon class="" href="javascript:history.go(-1);">
            <v-icon class="body-3" color="black">arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="body-2">写攻略</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn  flat small  @click="submit">
            发表
          </v-btn>
      </v-toolbar>
      <div class="box"></div>
    </div>
    <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
    ReturnBar
  },
  data() {
    return {
      showbtn: true,
      type: 'gonglue',
      content: "<h5>写点什么吧...</h5>",
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline"], // toggled buttons
        [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" }
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link", "image"],
        ["clean"] // remove formatting button
        ]
    }
  },
  methods: {
    handleSavingContent: function() {
      // You have the content to save
      console.log(this.content);
    }
  }
}
</script>

<style scoped>
.box{
  height: 48px;
}
</style>
