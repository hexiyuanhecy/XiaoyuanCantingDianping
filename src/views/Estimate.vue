<template>
  <div>
    <div class="return-bar">
      <v-toolbar
        color="white"
        light
        fixed
        dense>
          <v-btn icon class="" href="javascript:history.go(-1);">
            <v-icon class="body-3" color="black">arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="body-2">写评论</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn  flat small  @click="submit">
            发表
          </v-btn>
      </v-toolbar>
      <div class="box"></div>
    </div>
    <div class='estimate'>
      <textarea class='input-text' v-model='es_content' rows='5' cols='40' name='uCode' placeholder='说点什么吧'></textarea>
      <uploader @getFiles='getImageList' @removeFiles='removeImage'></uploader>
      <div class="score">
        <div>评分：</div>
        <v-rating
          half-increments
          v-model="score"
          color="yellow"
          dense>
        </v-rating>
        </div>
      <div class='kind'>
        <md-checkbox v-model='hot'>无辣不欢</md-checkbox>
        <md-checkbox v-model='daily'>日常最佳</md-checkbox>
        <md-checkbox v-model='rihan'>日韩料理</md-checkbox>
        <md-checkbox v-model='meat'>无肉不欢</md-checkbox>
        <md-checkbox v-model='noodles'>面食主义</md-checkbox>
        <md-checkbox v-model='specialty'>地方特色</md-checkbox>
      </div>
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
      <br>
      <!-- <v-btn block outline color='secondary' @click='submit'>发布</v-btn> -->
    </div>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
import uploader from '../components/Upload'

export default {
  name: 'DynamicCreate',
  components: {
    uploader,
    ReturnBar
  },
  data () {
    return {
      show: false,
      txt: undefined,
      baseurl: 'http://192.168.43.224:3001/',
      es_content: '',
      imgList: [],
      indeterminate: true,
      score: undefined,
      hot: null,
      daily: null,
      rihan: null,
      meat: null,
      noodles: null,
      specialty: null,
      formData: FormData
    }
  },
  methods: {
    getImageList (files) {
      let formData = new FormData()
      this.$nextTick(() => {// dom更新后执行
        for (let i = 0, len = files.length; i < len; i++) {
          formData.append(`img`,files[i].file)
          console.log('files'+i)
          console.log(formData.get('img'))
          // console.log(files[i].get("file"))
          this.imgList = formData
        }
      })
    },
    // 删除图片
    removeImage (index) {
      this.imgList.splice(index, 1)
    },
    loadMore: function () {
      this.$store.dispatch('loadMore')
    },
    submit () {
      // if(!this.es_content||!this.score||this.imgList.length===0){
      if(!this.es_content||!this.score){
        this.txt='评论未填写完整！'
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1000)
      }
      else{
        var password = {
          // dh_id: this.$route.params.id,
          // us_id: localStorage.getItem('us_id'),
          // es_content: this.es_content,// 用户填
          // es_date: new Date(),
          // es_score: this.score,// 用户填
          

          // imgs: this.imgList,
          // hot: +this.hot,
          // rihan: +this.rihan,
          // specialty:+this.specialty,
          // noodles: +this.noodles,
          // meat: +this.meat,
          // daily: +this.daily
        }
        this.imgList.set('ds_id',this.$route.params.id)
        this.imgList.set('dh_id',localStorage.getItem('dh_id'))
        this.imgList.set('us_id',localStorage.getItem('us_id'))
        this.imgList.set('es_content',this.es_content)
        this.imgList.set('es_date',new Date())
        this.imgList.set('es_score',this.score)
        this.imgList.set('imgs',this.imgList)
        this.imgList.set('hot',+this.hot)
        this.imgList.set('rihan',+this.rihan)
        this.imgList.set('specialty',+this.specialty)
        this.imgList.set('noodles',+this.noodles)
        this.imgList.set('meat',+this.meat)
        this.imgList.set('daily',+this.daily)

        this.axios.post(this.baseurl + `estimate/submit_estimate`, this.imgList)
          .then(res => {
            // console.log(res.data)
            if(res.data.code === 200){
              // this.$router.push({ path: '/pages/home'})
              // this.$router.push({  //核心语句
              //   path:`/dishdetail/${this.$route.params.id}`
              // })
              this.$router.go(-1);
            }
            else {
              this.show = true
              this.txt='发表失败，请稍后再试！'
            }
          })
      }
    }
      
  },
  mounted () {
    // console.log(this.$route.params.id)
  }
}
</script>

<style lang='scss' scoped>
.box{
  height: 48px;
}
.estimate{
  padding: 20px;
}
.input-text{
  margin-bottom: 10px;
}
.score{
  display: flex;
  justify-content: flex-start;
}
</style>
