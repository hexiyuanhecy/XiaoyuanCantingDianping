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
    <!-- 编辑器 -->
    <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
    <!-- 对话框 -->
    <v-dialog
        v-model="show"
        hide-overlay
        persistent
        width="188"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text v-text="txt">
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex'

export default {
  components: {
    VueEditor,
    ReturnBar
  },
  data() {
    return {
      show: false,
      txt: '',
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
        ],
      gl_name:'',
      gl_main_img: undefined
    }
  },
  computed: {
    // Getting Vuex State from store/modules/activities
    ...mapState({
      data: state => state.mystate.count
    })
  },
  methods: {
    submit () {
      this.gl_name = />(\/?.+?\/?)[<\/|<]/.exec(this.content)[1]
      let temp_imgArr = /src="(data:image\/\w+;base64,\/?.+?\/?)">/.exec(this.content)
      if(temp_imgArr){
        this.gl_main_img = temp_imgArr[1]
      }
      else{
        this.gl_main_img = 'http://192.168.43.224:3001/public/images/estimate/11.jpg'
      }
      
      var obj = {
        us_id: localStorage.getItem('us_id'),
        us_name: localStorage.getItem('us_name'),
        gl_name: this.gl_name,
        gl_date: new Date(),
        gl_main_img: this.gl_main_img,// 用户填
        gl_content: this.content,
        gl_star: 0
      }
      // console.log(temp_imgArr)
      if(obj.gl_content==='<h5>写点什么吧...</h5>'||obj.gl_name==='<br>'){
        this.txt='攻略未填写完整！'
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1500)
      }
      else{
        this.axios.post(`http://192.168.43.224:3001/gonglue/submit_gonglue`, this.qs.stringify(obj))
          .then(res => {
            // console.log(res.data)
            if(res.data.code === 200){
              this.$router.push({ path: '/pages/gonglue'})
            }
            else {
              this.show = true
              this.txt='发表失败，请稍后再试！'
              if (!this.show) return setTimeout(() => (this.show = false), 1000)
            }
          })
      }
    }
  },
}
</script>

<style scoped>
.box{
  height: 48px;
}
</style>
