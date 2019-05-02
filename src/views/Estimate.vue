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
      baseurl: 'http://192.168.43.224:3001/',
      es_content: '',
      imgList: [],
      FilecodeList: [],
      isSubmit: false,
      disabled: true,
      obj1: {name: 'obj1'},
      obj2: {name: 'obj2'},
      obj: null,
      indeterminate: true,
      score: undefined,
      hot: null,
      daily: null,
      rihan: null,
      meat: null,
      noodles: null,
      specialty: null,
      obj: Object
    }
  },
  methods: {
    getImageList (files) {
      this.$nextTick(() => {
        for (let i = 0, len = files.length; i < len; i++) {
          this.imgList.push('data:image/jpg;base64,'+files[i].src.split('base64,')[1])
        }
      })
    },
    // 删除图片
    removeImage (index) {
      this.imgList.splice(index, 1)
    },
    submit () {
      var password = {
        dh_id: this.$route.params.id,
        us_id: localStorage.getItem('us_id'),
        es_content: this.es_content,// 用户填
        es_date: new Date(),
        es_score: this.score,// 用户填
        es_main_img: this.imgList[0],
        imgs: this.imgList,
        hot: +this.hot,
        rihan: +this.rihan,
        specialty:+this.specialty,
        noodles: +this.noodles,
        meat: +this.meat,
        daily: +this.daily
      }
      this.axios.post(this.baseurl + `estimate/submit_estimate`, this.qs.stringify(password))
        .then(res => {
          console.log(res.data.code)
          alert('注册成功')
        })
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
