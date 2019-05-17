<template>
  <div class="subject-view">
    <return-bar title="店铺详情"></return-bar>
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

      <!-- 餐厅详情 -->
      <div class="subject-Gongluelist">
        <!-- 图片 -->
        <div class="poster my-gallery imgs1" itemscope>
          <figure itemprop="associatedMedia" itemscope v-for="(item, index) in hallItemImg" :key="index" itemtype="http://192.168.43.224:3001">
              <a :href="item.dh_img_path" itemprop="contentUrl" data-size="0x0">
                  <div class="zoomImage1"  :style="{backgroundImage:'url('+item.dh_img_path+')'}" itemprop="thumbnail"></div>
              </a>
          </figure>
        </div>

        <!-- 餐厅简介 -->
        <div class="subject-intro">
          <div class="dining-info">
            <div class="user">
                <div class="name" v-text="hallItem.dh_name"></div>
                <div class="star">
                  <v-rating
                    readonly
                    dense
                    v-model="hallItem.dh_score" 
                    small half-increments 
                    color="yellow darken-3"
                  ></v-rating>
                  <div>({{hallItem.dh_score}})</div>
                </div>
            </div>
            <div class="star">
              <div @click="toStar(hall.dh_id)">
                <!-- {{item}} -->
                <v-rating
                  :value="hall.star"
                  length="1"
                  empty-icon="favorite_border"
                  full-icon="favorite"
                  readonly="readonly"
                  color="red"
                  background-color="grey lighten-1"
                ></v-rating>
              </div>
              <div class="">{{hallItem.dh_star}}</div>
            </div>
          </div>
          <v-divider></v-divider>
          
          <p class="hall-info">
            &nbsp;&nbsp;&nbsp;&nbsp;{{hallItem.dh_info+hallItem.dh_info+hallItem.dh_info+hallItem.dh_info+hallItem.dh_info}}
          </p>
        </div>

        <!-- 推荐菜品 -->
        <div class="subject-pics">
          <h4>{{hallItem.dh_name}}推荐菜品</h4>
          <div class="poster my-gallery imgs2" itemscope>
            <figure class="imgs22" itemprop="associatedMedia" itemscope v-for="(item, index) in hallItemDish" :key="index" itemtype="http://192.168.43.224:3001">
                <a :href="item.ds_img_path" itemprop="contentUrl" data-size="0x0">
                    <div class="zoomImage"  :style="{backgroundImage:'url('+item.ds_img_path+')'}" itemprop="thumbnail"></div>
                </a>
                <figcaption itemprop="caption description">{{item.ds_name}}</figcaption>
            </figure>
          </div>
            <!-- </li>
          </ul> -->
        </div>
      </div>

      <br>
      <!-- 更多评论 -->
      <div class="subject-comments">
        <h2>{{hallItem.dh_name}}的评论</h2>
        <esjianjie v-for="(value,index) in hallItemEs" :key="index" :item="value" :i='index' :k='index'></esjianjie>
      </div>

      <!-- 更多评论 -->
      <div class="subject-comments">
        <div class="content-list">
          <a class="list-link" href="javascript:;">显示更多评论<i class="icon">&#xe87e;</i></a>
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
      showLoading: true,
    }
  },
  computed: {
    // Getting Vuex State from store/modules/subject
    ...mapState({
      hallItem: state => state.hall.hallItem,
      hallItemImg: state => state.hall.hallItemImg,
      hallItemDish: state => state.hall.hallItemDish,
      hallItemEs: state => state.hall.hallItemEs,
      starItem: state => state.star.es_star
    }),
    hall: function () {
      console.log('item里的')
      var datadata = this.$store.state.hall.hallItem
      var stardate = this.$store.state.star.dh_star
      console.log(datadata)
      console.log(stardate)
      var itemdate = datadata
        for (let i=0;i<stardate.length; i++){
            if(itemdate.dh_id === stardate[i].st_id){
              this.$store.state.hall.hallItem.star = 1
            }
          
        }
      console.log('this.$store.state.hall.hallItemEs')
      console.log(this.$store.state.hall.hallItem)
      return this.$store.state.hall.hallItem
    }
  },
  methods: {
    toStar (id) {
      console.log(id)
      console.log(this.$store.state.hall.hallItem)
      var info = {
        type: '',
        id: id,
        kind: '2'
      }
      if(this.$store.state.hall.hallItem.star === 1){
        info.type = 'removeStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.hall.hallItem.dh_star -= 1
            this.$store.state.hall.hallItem.star = 0
        })
      } 
      else if(this.$store.state.hall.hallItem.star=== 0){
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.hall.hallItem.dh_star += 1
            this.$store.state.hall.hallItem.star = 1
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
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch({//获取餐厅评论
      type: 'getSingleHallEs',
      id: id
    })
    this.$store.dispatch({ // 获取餐厅信息
      type: 'getSingleHall',
      id: id
    })
    this.$store.dispatch('getUserStar')// 获取用户信息
    this.$store.dispatch({// 获取评价信息
      type: 'getSingleHallEs',
      id: id
    }).then(res => {
      this.initPhotoSwipeFromDOM('.imgs1')
      this.initPhotoSwipeFromDOM('.imgs2')
      this.showLoading = false
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

// 餐厅信息
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
.hall-info{
  margin-top: 10px;
  margin-bottom: 20px;
}
.star{
  z-index: 999;
  display: flex;
  align-items: center;
  margin-right: 15px;
}
h4{// 餐厅名
  margin-left: 15px;
  margin-bottom: 5px;
}
.subject-intro {// 餐厅简介
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
</style>
