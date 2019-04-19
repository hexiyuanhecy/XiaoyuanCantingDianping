<template>
  <div class="">
    <return-bar :title="title"></return-bar>
    
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
export default {
  name: 'estimate',
  components: { ReturnBar },
  data () {
    return {
      title: '我的收藏',
      initial: '一只老学姐',
      items: [
        {
          action: 'info',
          title: '个人信息',
          fn: () => (this.$router.push('/info'))
        },
        {
          action: 'move_to_inbox',
          title: '我的收藏'
        },
        {
          action: 'send',
          title: '我的评价'
        },
        {
          action: 'delete',
          title: '我的攻略'
        },
        { divider: true },
        { header: 'Labels' },
        {
          action: 'label',
          title: 'Family'
        }
      ],
      day: Date,
      week: String,
      data: undefined
    }
  },
  mounted () {
    console.log(123123123)
    this.axios.get(`http://192.168.137.1:3001/user/info`)
    .then(res => {
      this.data = res.data.data
      console.log(this.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.estimate {
  form{
    padding: 10px;
      border: none;
      font-size: 12px;
  }
.square{
  margin-top: 2rem;
}
  .grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 相当于 1fr 1fr 1fr */
    grid-template-rows: repeat(3, 1fr); /* fr单位可以将容器分为几等份 */
    grid-gap: 1%; /* grid-column-gap 和 grid-row-gap的简写 */
    grid-auto-flow: row;
  }
  .grid>div{
    color: #fff;
    font-size: 50px;
    line-height: 2;
    text-align: center;
    background: #ccc;

  }
  .button{
    position: fixed;
    bottom: 5rem;
    margin: 3rem 0;
    text-align: center;
    width: 92%;
    button{
      width: 90%;
      height: 2.5rem;
      border: none;
      color: white;
      background: #42bd56;
      border-radius: 4px;
    }
  }
}
</style>
