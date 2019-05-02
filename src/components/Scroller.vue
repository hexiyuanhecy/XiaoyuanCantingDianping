<template>
  <div class="scroller">
    <div class="header">
      <p>{{title}}</p>
      <router-link :to="'/hallall/' + title">
        <a href="#" :items='items'>更多<i class="icon">></i></a>
      </router-link>
    </div>
    <div class="content">
      <slot name="promItem"></slot>
      <ul class="hasCover">
       <li v-for="item in items" :key="item.id">
          <router-link :to="'/hallinfo/' + item.dh_id" append :title="'餐厅详情'">
            <div class="box">
              <div class="zoomImage"  :style="{backgroundImage:'url('+item.dh_main_img+')'}"></div>
              <div class="title">
                <v-rating 
                  v-model="item.dh_score" 
                  small 
                  dense
                  half-increments 
                  size="1"
                  color="yellow darken-3">
                </v-rating>
                <div>{{item.dh_name}}</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hallfenlei',
  props: [ 'items', 'title' ],
  components: {},
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.zoomImage{
  width:100%;
  height:0;
  padding-bottom: 133.33%;
  border-radius: 5px;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}

.box{
  height: 200px;
  width: 130px;
  position: relative;
}
.title{
  font-size: 0.9rem !important;
  border-radius: 8px;
  width: 100%;
  height: 60%;
  padding-bottom: 15px;
  display: flex !important;
  flex-direction: column-reverse;
  position: absolute;
  bottom: 0px;
  background: linear-gradient(transparent,#a76a4f - 10,#a76a4f);
  div{
    color: white;
  }
}




.v-rating .v-icon{
  padding: 0px !important;
}
.scroller {
  padding-top: 1rem;
}

.header {
  height: 2.6rem;
  line-height: 2.6rem;
  padding: 0 1.2rem;
  font-size: 1rem;
  a {
    float: right;
    font-size: 0.8rem;
    &:last-child {
      color: #555;
    }
  }

  p {
    display: inline-block;
  }
}

.content {
  box-sizing: content-box;

  ul {
    width: 100%;
    padding-top: 0;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid rgb(236, 236, 236);
  }
}

.hasCover {
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;

  // .title {
  //   display: block;
  //   max-width: 100%;
  //   margin-top: 1rem;
  //   line-height: 0.8rem;
  //   font-size: 0.9rem !important;
  //   color: #111;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   word-wrap: normal;
  // }

  li {
    // height: 120px;
    display: inline-block;
    // width: 40%;
    // margin-left: 0.6rem;
    margin-right: 0.2rem;
    img{
      // width: 100%;
      // height: 100%;
    }
    &:first-child {
      padding-left: 0.6rem;
    }
  }
}


span{
  font-size: 1rem;
}
.v-rating .v-icon{
  padding: 2px !important;
}
</style>
