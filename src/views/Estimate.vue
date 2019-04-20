<template>
  <div>
    <return-bar title='发表评论'></return-bar>
    <div class='estimate'>
      <textarea class='input-text' v-model='es_content' rows='5' cols='40' name='uCode' placeholder='说点什么吧'></textarea>
      <uploader @getFiles='getImageList' @removeFiles='removeImage'></uploader>
      <div class='kind'>
        <md-checkbox v-model='array' value='1' dark class=''>无辣不欢</md-checkbox>
        <md-checkbox v-model='array' value='2'>日常最佳</md-checkbox>
        <md-checkbox v-model='boolean'>日韩料理</md-checkbox>
        <md-checkbox v-model='string'>无肉不欢</md-checkbox>
        <md-checkbox v-model='string2' value='my-checkbox'>面食主义</md-checkbox>
        <md-checkbox v-model='novalue'>地方特色</md-checkbox>
      </div>
      <br>
      <v-btn block outline color='secondary' @click='submit'>发布</v-btn>
    </div>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
import uploader from '../components/Upload'

export default {
  name: 'DynamicCreate',
  data () {
    return {
      baseurl: 'http://192.168.43.224:3001/',
      es_content: '',
      imgList: [],
      FilecodeList: [],
      isSubmit: false,
      array: [],
      boolean: false,
      string: null,
      string2: null,
      novalue: null,
      disabled: true,
      obj1: {name: 'obj1'},
      obj2: {name: 'obj2'},
      obj: null,
      indeterminate: true
    }
  },
  methods: {
    getImageList (files) {
      this.$nextTick(() => {
        for (let i = 0, len = files.length; i < len; i++) {
          this.imgList.push(files[i].src.split('base64,')[1])
        }
      })
    },
    // 删除图片
    removeImage (index) {
      this.imgList.splice(index, 1)
    },
    submit () {
      var password = {
        phone: this.es_content,
        password: 'this.password',
        img: 'data:image/jpg;base64,' + this.imgList[0]
      }
      this.axios.post(this.baseurl + `estimate/submit_estimate`, this.qs.stringify(password))
        .then(res => {
          console.log(res.data.code)
          alert('注册成功')
        })
    }
  },
  components: {
    uploader,
    ReturnBar
  }
}
</script>

<style lang='scss' scoped>
.estimate{
  padding: 20px;
}
.input-text{
  margin-bottom: 10px;
}
</style>
