<template>
<!-- 评论详情 -->
  <div class="detail-view has-header">
    <return-bar title="评论详情"></return-bar>
      <!-- 图片 -->
      <div class="poster my-gallery" itemscope>
        <figure itemprop="associatedMedia" itemscope v-for="(item, index) in eventItemImg" :key="index" itemtype="http://192.168.43.224:3001">
            <a :href="item.es_img_path" itemprop="contentUrl" data-size="0x0">
                <div class="zoomImage"  :style="{backgroundImage:'url('+item.es_img_path+')'}" itemprop="thumbnail"></div>
            </a>
        </figure>
      </div>

      <!--用户及评论  -->
      <div class="info">
        <div class="describe">
          <!-- 用户名 -->
          <div class="user-box">
            <div class="user-info">
              <v-avatar color="grey darken-3" >
                <img :src="eventItem.us_pic" alt="">
              </v-avatar>
              <div class="name-info">
                <h6 class="name">{{eventItem.us_name}}</h6>
                <p class="date">{{formatData(eventItem.es_date)}}</p>
              </div>
            </div>
            <div class="right">
              <div @click="toStar()">
                <v-rating
                  :value="item.star||0"
                  length="1"
                  empty-icon="favorite_border"
                  full-icon="favorite"
                  readonly="readonly"
                  color="red"
                  background-color="grey lighten-1"
                ></v-rating>
              </div>
              <div>{{eventItem.es_star}}</div>
              
            </div>
          </div>
          <v-divider></v-divider>
          <!-- 评论内容 -->
          <div class="content">
            <div v-if="eventItem.es_content" class="content">{{doubleContent(eventItem.es_content)}}</div>
            <div v-if="eventItem.es_content" class="content">{{doubleContent(eventItem.es_content)}}</div>
          </div>
        </div>

         <!-- 餐厅简介 -->
         <br>
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
import ReturnBar from '../components/ReturnBar'
import Loading from '../components/Loading'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import HallInfo from '../components/HallInfo'

export default {
  name: 'detail-view',
  components: { ReturnBar, Loading, HallInfo },
  data () {
    return {
      showLoading: true,
    }
  },
  computed: {
    ...mapState({
      eventItemImg: state => state.estimate.eventItemImg,
      eventItem: state => state.estimate.eventItem,
      dh_id: state => state.estimate.dh_id,
      hallItem: state => state.hall.hallItem
    }),
    item: function () {
      // console.log(this.$store.state.star.es_star)
      var datadata = this.$store.state.estimate.eventItem
      var stardate = this.$store.state.star.es_star
        var itemdate = datadata
        for (let i=0;i<stardate.length; i++){
            if(itemdate.es_id === stardate[i].st_id){
              this.$store.state.estimate.eventItem.star = 1
            }
        }
      return this.$store.state.estimate.eventItem
    }
  },
  created () {
  },
  methods: {
    formatData (time) {
      return time.substring(0, 10)
    },
    doubleContent (str) {
      str = str + '美味佳肴、口齿留香、珍馐佳肴、秀色可餐、饕餮大餐、回味无穷、色味俱佳、垂涎欲滴、其味无穷'
      return str
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
            // console.log(item.src)
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
    toStar () {
      const id = this.$route.params.id
      // console.log(id)
      var info = {
        type: '',
        id: id,
        kind: '1'
      }
      if(this.$store.state.estimate.eventItem.star === 1){
        info.type = 'removeStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.estimate.eventItem.es_star -= 1
            this.$store.state.estimate.eventItem.star = 0
        })
      }
      else if(this.$store.state.estimate.eventItem.star === 0){
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.estimate.eventItem.es_star += 1
            this.$store.state.estimate.eventItem.star = 1
        })

      }
    }
  },
  mounted () {
    const id = this.$route.params.id
    const dh_id = this.$route.params.dh_id
    this.$store.dispatch({
      type: 'getSingleEvent',
      id: id
    }).then(res => {
      this.initPhotoSwipeFromDOM('.my-gallery')
      // console.log(this.eventItemImg)
    })
    this.$store.dispatch({
        type: 'getSingleHall',
        id: dh_id
      }).then(res => {
      })
    localStorage.removeItem('dh_id')
  }
}
</script>

<style lang="scss" scoped>
.zoomImage{
  display: inline-block;
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
.right{
  float: right;
  z-index: 9;
  display: flex;
  align-items: center;
  margin-right: 15px;
}
.poster {
  text-align: center;
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;
  figure{
    display: inline;
    margin: 0;
    width: 100%;
    height: 426px;
  }
  .zoomImage_box {
    // display: inline;
    .zoomImage{
    }
  }
}
.v-avatar img{
  border: 1px solid rgb(250, 248, 248);
}
.info{
  margin: 1rem;
}
.user-box{
  margin-left: 5px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info{
  display: flex;
  justify-content: flex-start;
}
.name-info{
  margin-left: 1rem;
  .date{
    font-size: 12px;
    color: #555
  }
}
.content{
  margin: 10px 4px 0px 4px;
}
.v-carousel__controls{
  background: none !important;
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
