<template>
  <div class="subject-view">
    <return-bar :title="dishItem.ds_name+'菜品详情'"></return-bar>
    <template >
      <v-btn 
        color="primary" 
        fab 
        small 
        dark
        fixed
        bottom
        right
        :to="'/estimate/' + this.$route.params.id"
      >
        <v-icon>edit</v-icon>
      </v-btn>

      <!-- 菜品详情 -->
      <div class="subject-Gongluelist">
        <!-- 图片 -->
        <div class="poster my-gallery imgs1" itemscope>
          <figure itemprop="associatedMedia" itemscope v-for="(item, index) in images()" :key="index" itemtype="http://192.168.43.224:3001">
              <a :href="item" itemprop="contentUrl" data-size="0x0">
                  <div class="zoomImage1"  :style="{backgroundImage:'url('+item+')'}" itemprop="thumbnail"></div>
              </a>
          </figure>
        </div>

        <!-- 菜品简介 -->
        <div class="subject-intro">
          <div class="dining-info">
            <div class="user">
                <div class="name" v-text="dishItem.ds_name"></div>
                <div class="star">
                  <v-rating
                    readonly
                    dense
                    v-model="dishItem.ds_score" 
                    small half-increments 
                    color="yellow darken-3"
                  ></v-rating>
                  <div>({{dishItem.ds_score}})</div>
                </div>
            </div>
            <div class="star">
              <div @click="toStar(dish.ds_id)">
                <!-- {{item}} -->
                <v-rating
                  :value="dish.star"
                  length="1"
                  empty-icon="favorite_border"
                  full-icon="favorite"
                  readonly="readonly"
                  color="red"
                  background-color="grey lighten-1"
                ></v-rating>
              </div>
              <div class="">{{dishItem.ds_star}}</div>
            </div>
          </div>
          <v-divider></v-divider>
          
          <p class="dish-info">
            &nbsp;&nbsp;&nbsp;&nbsp;{{dishItem.ds_name+dishItem.ds_name+dishItem.ds_name+dishItem.ds_name+dishItem.ds_name}}
          </p>
        </div>
      </div>
      
      <!-- 餐厅简介 -->
        <br>
      <div class="subject-comments">
        <h2>{{dishItem.ds_name}}的所属餐厅</h2>
        <router-link  :to="'/hallinfo/' + hallItem.dh_id">
          <div class="card">
            <!-- 作图 -->
            <div class="img">
              <div class="zoomImage"  :style="{backgroundImage:'url('+hallItem.dh_main_img+')'}"></div>
            </div>
            <!-- 右详情 -->
            <div class="info_box" :style="{background:'#565254'}">
              <div class="title">{{hallItem.dh_name}}</div>
                <div class="dh-info">{{hallItem.dh_info}}</div>
                  <div class="pingfen">
                    <v-rating 
                      v-model="hallItem.dh_score" 
                      small 
                      dense
                      half-increments 
                      size="1"
                      color="white darken-3">
                    </v-rating>
                    <span class="score">{{hallItem.dh_score}}</span>
                  </div>
            </div>
          </div>
        </router-link>
      </div>

      <br>
      <!-- 更多评论 -->
      <div class="subject-comments">
        <h2>{{dishItem.ds_name}}的评论</h2>
        <div v-for="(value,index) in dishItemEs" :key="index" >
          <esjianjie v-if="index<3" :item="value" :i='index' :k='-4'></esjianjie>
        </div>
      </div>

      <!-- 更多评论 -->
      <!-- <div class="subject-comments">
        <div class="content-list">
          <a class="list-link" href="javascript:;">显示更多评论<i class="icon">&#xe87e;</i></a>
        </div>
      </div> -->
      <div class="subject-comments">
        <div class="content-list">
          <router-link class="list-link" tag="div" :to="'/dishEsList/' + dishItem.ds_id">
            <span v-if="dishItemEs&&dishItemEs.length>2">显示更多评价<i class="icon">&#xe87e;</i></span>
            <span v-else>暂无更多评价</span>
          </router-link>
        </div>
      </div>

    </template>

    <!-- 查看大图 -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- 预览区域顶部的默认UI，可以修改 -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  与图片相关的操作 -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Esjianjie from '../components/Card'
import ReturnBar from '../components/ReturnBar'
import Marking from '../components/Marking'
import Scroller from '../components/Scroller'
import Loading from '../components/Loading'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default {
  name: 'Gonglueview',
  components: {
    ReturnBar,
    Marking,
    Esjianjie,
    Scroller,
    Loading
  },
  data () {
    return {
      title2: '店铺详情',
      showLoading: true
    }
  },
  computed: {
    // Getting Vuex State from store/modules/subject
    ...mapState({
      dishItem: state => state.dish.dishItem,
      hallItem: state => state.hall.hallItem,
      dishItemImg: state => state.dish.dishItemImg,
      dishItemEs: state => state.dish.dishItemEs,
      starItem: state => state.star.ds_star
    }),
    dish: function () {
      var datadata = this.$store.state.dish.dishItem
      var stardate = this.$store.state.star.ds_star
      var itemdate = datadata
        for (let i=0;i<stardate.length; i++){
            if(itemdate.ds_id === stardate[i].st_id){
              this.$store.state.dish.dishItem.star = 1
            }
        }
      return this.$store.state.dish.dishItem
    }
  },
  methods: {
    toStar (id) {
      var info = {
        type: '',
        id: id,
        kind: '4'
      }
      if(this.$store.state.dish.dishItem.star === 1){
        info.type = 'removeStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.dish.dishItem.ds_star -= 1
            this.$store.state.dish.dishItem.star = 0
        })
      } 
      else if(this.$store.state.dish.dishItem.star=== 0){
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.dish.dishItem.ds_star += 1
            this.$store.state.dish.dishItem.star = 1
        })
      }
      // this.$store.dispatch('getUserStar')
    },
    initPhotoSwipeFromDOM (gallerySelector) {
      var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element
            let img = new Image()
            img.src =linkEl.getAttribute('href')
            linkEl.setAttribute(
              'data-size',
              img.naturalWidth + 'x' + img.naturalHeight
            )

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            console.log(item.src)
            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
              var topimg = linkEl.children[0].getAttribute("style");
                  topimg = /url\((\/?.+?\/?)\)/.exec(topimg)[1]
                item.msrc = topimg;
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
      };

      // 查找最近的父元素
      var closest = function closest(el, fn) {
          return el && ( fn(el) ? el : closest(el.parentNode, fn) );
      };

      // 当用户单击缩略图时触发
      var onThumbnailsClick = function(e) {
          e = e || window.event;
          e.preventDefault ? e.preventDefault() : e.returnValue = false;

          var eTarget = e.target || e.srcElement;

          // 找到幻灯片的根元素
          var clickedListItem = closest(eTarget, function(el) {
              return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
          });

          if(!clickedListItem) {
              return;
          }

          // 通过遍历所有子节点找到已单击项的索引
          // 或者，您可以通过数据属性定义索引
          var clickedGallery = clickedListItem.parentNode,
              childNodes = clickedListItem.parentNode.childNodes,
              numChildNodes = childNodes.length,
              nodeIndex = 0,
              index;

          for (var i = 0; i < numChildNodes; i++) {
              if(childNodes[i].nodeType !== 1) { 
                  continue; 
              }

              if(childNodes[i] === clickedListItem) {
                  index = nodeIndex;
                  break;
              }
              nodeIndex++;
          }



          if(index >= 0) {
              // 如果找到有效的索引，打开照片擦除
              openPhotoSwipe( index, clickedGallery );
          }
          return false;
      };

      // 从URL解析图片索引和图库索引(#&pid=1&gid=2)
      var photoswipeParseHash = function() {
          var hash = window.location.hash.substring(1),
          params = {};

          if(hash.length < 5) {
              return params;
          }

          var vars = hash.split('&');
          for (var i = 0; i < vars.length; i++) {
              if(!vars[i]) {
                  continue;
              }
              var pair = vars[i].split('=');  
              if(pair.length < 2) {
                  continue;
              }           
              params[pair[0]] = pair[1];
          }

          if(params.gid) {
              params.gid = parseInt(params.gid, 10);
          }

          return params;
      };

      var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
          var pswpElement = document.querySelectorAll('.pswp')[0],
              gallery,
              options,
              items;

          items = parseThumbnailElements(galleryElement);

          // 定义选项(如果需要)
          options = {

              // define gallery index (for URL)
              galleryUID: galleryElement.getAttribute('data-pswp-uid'),

              getThumbBoundsFn: function(index) {
                  // See Options -> getThumbBoundsFn section of documentation for more info
                  var thumbnail = items[index].el.getElementsByTagName('div')[0], // find thumbnail
                      pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                      rect = thumbnail.getBoundingClientRect(); 

                  return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
              }

          };

          // PhotoSwipe opened from URL
          if(fromURL) {
              if(options.galleryPIDs) {
                  // parse real index when custom PIDs are used 
                  // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                  for(var j = 0; j < items.length; j++) {
                      if(items[j].pid == index) {
                          options.index = j;
                          break;
                      }
                  }
              } else {
                  // in URL indexes start from 1
                  options.index = parseInt(index, 10) - 1;
              }
          } else {
              options.index = parseInt(index, 10);
          }

          // exit if index not found
          if( isNaN(options.index) ) {
              return;
          }

          if(disableAnimation) {
              options.showAnimationDuration = 0;
          }

          // Pass data to PhotoSwipe and initialize it
          gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
          gallery.init();
      };

      // 循环遍历所有gallery元素并绑定事件
      var galleryElements = document.querySelectorAll( gallerySelector );

      for(var i = 0, l = galleryElements.length; i < l; i++) {
          galleryElements[i].setAttribute('data-pswp-uid', i+1);
          galleryElements[i].onclick = onThumbnailsClick;
      }

      // 解析URL并打开包含#&pid=3&gid=1的gallery
      var hashData = photoswipeParseHash();
      if(hashData.pid && hashData.gid) {
          openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
      }
    },
    images: function () {
      let values = []
      let data = this.dishItem
      Object.keys(data).forEach(function(key){
          if(key.match(/img/)&&data[key]){
            values.push(data[key])
        }
      });
      return values
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch({//获取菜品信息
      type: 'getDishItem',
      id: id
    }).then(res => {
      this.images()
      this.$store.dispatch({ // 获取餐厅信息
        type: 'getSingleHall',
        id: res.dh_id
      }).then(res => {
        localStorage.setItem('dh_id',this.hallItem.dh_id)
      })
    })
    
    this.$store.dispatch('getUserStar')// 获取用户信息
    this.$store.dispatch({// 获取评价信息
      type: 'getDishItemEs',
      id: id
    }).then(res => {
      // console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.zoomImage1{
  display: inline-block;
  width:100%;
  height:0;
  padding-bottom: 133.33%;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}
.poster {
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;
  padding-bottom: 20px;
  figure{
    display: inline;
    margin: 0;
    width: 100%;
    height: 436px;
    position: relative;
    figcaption{
      width:32%;
      position: absolute;
      bottom: 0px;
      left: 29%;
      bottom: -20px;
      color: black;
    }
  }
}
.zoomImage{
  display: inline-block;
  width:32%;
  height:0;
  padding-bottom: 26%;
  border-radius: 5px;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}

// 菜品信息
.dining-info{
  height: 45px;
  display: flex;
  justify-content: space-between;
  margin-bottom: -5px;
  .name{
    font-size: 16px;
    font-weight: 550;
  }
  .date{
    color: #777;
    font-size: 12px;
  }
}  
.dish-info{
  margin-top: 10px;
  margin-bottom: 20px;
}
.star{
  z-index: 999;
  display: flex;
  align-items: center;
  margin-right: 15px;
}
h4{// 菜品名
  margin-left: 15px;
  margin-bottom: 5px;
}
.subject-intro {// 菜品简介
  padding: 0 1.5rem;
  p {
    font-size: 0.8rem;
    color: #494949;
  }
}

.subject-pics {// 推荐菜品
  color: #777;
  font-size: 13px;
}

.subject-comments h2{// 更多评论
  padding: 0 15px;
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
}

.subject-comments{
  .list-link {
    display: block;
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #777;
  }
}

.subject-view{// 大盒子
  margin-bottom: 5rem;
}
.theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    margin-bottom: 2.5rem;
    border-radius: 50%;
}

.card{
  display: flex;
  // margin: 0px 15px 10px 15px;
  justify-content: center;
  .img{
    width: 112px;
    .zoomImage{
      width:100%;
      height:0;
      padding-bottom: 100%;
      border-radius: 10px 0 0 10px;
      overflow:hidden;
      background-position: center center;
      background-repeat: no-repeat;
      -webkit-background-size:cover;
      -moz-background-size:cover;
      background-size:cover;
    }
  }
}

.info_box{
  height: 112px;
  width: 63%;
  background: #704d43;
  padding: 20px 15px 0 20px;
  border-radius: 0 10px 10px 0;
  .title{
    color: white;
    font-size: 16px !important;
    margin-bottom: 5px;
  }
  .dh-info{
    color: #dcdbdb;
    width: 190px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.pingfen{
  display: flex;
  .score{
    color: #dcdbdb;
    margin-left: 15px;
  }
}
</style>
