<template>
  <div class="estimate">
    <return-bar :title="title"></return-bar>
    <div class="es-content">
      <form name="my_form" action='URL' method="POST">
        <textarea autofocus cols="52" rows="10" placeholder="此刻我想说..." wrap="hard"></textarea>
      </form>
      <div class="square">
        <div class="square-inner grid">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>
      </div>
      <div class="button"><button>发表</button></div>
    </div>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
export default {
  name: 'estimate',
  components: { ReturnBar },
  data () {
    return {
      title: '发表评论'
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate {
  form{
    textarea{
      border: none;
      font-size: 14px;
    }
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
