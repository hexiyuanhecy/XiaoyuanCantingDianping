
<template>
  <div id="imgUploader">
    <div class="file-list">
      <div class="thumbnails my-gallery">
        <figure itemprop="associatedMedia" itemscope  class="thumbnail" v-for="(item,index) in files" :key="index">
          <a :href="item.src" itemprop="contentUrl" data-size="400x400" class="img-wrapper">
            <div class="zoomImage"  :style="{backgroundImage:'url('+item.src+')'}" itemprop="thumbnail"></div>
          </a>
          <span class="file-remove" @click="remove(index,$event)">×</span>
        </figure>
        <section class="thumbnail" v-if="this.files.length < 9">
          <div class="add">
          <span>+</span>
          <input type="file" @change="selectImgs()" multiple accept="image/*" ref="file">
          </div>
        </section>
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
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default {
  data () {
    return {
      files: [], // 文件缓存
      index: 0, // 序列号
      maxLength: 9, // 图片最大数量
      maxSize: 10240000 // 图片限制为10M内
    }
  },
  methods: {
    selectImgs () {
      let thisfile = this.$refs.file.files[0]
      let tempList = [] 
      let fileItem = {// 每次点击+号后选择的图片信息
        Id: this.index++,
        name: thisfile.name,
        size: thisfile.size,
        file: thisfile
      }
      // 将图片文件转成Base64显示预览图
      let reader = new FileReader()/* FileReader对象主要用于将文件内容读入内存，通过一系列异步接口，
                                      可以在主线程中访问本地文件。web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容，
                                      可以使用File对象或者Blob对象来指定所要处理的文件或数据。*/
      reader.onloadend = e => {// 事件 当读取操作成功完成时调用,readAsDataURL异步转成base64
          this.$set(fileItem, 'src', e.target.result) // 将图片base64编码写入文件src属性
      }
      if (fileItem.size > this.maxSize) {//如果图片过大
        console.log(this.lang.dynamic_over_size)
      } else {
        reader.readAsDataURL(thisfile)// 读取方式 异步读取文件内容，结果用data:url的字符串形式表示，它会将文件内容进行base64编码后输出
        this.files.push(fileItem)
      }
      setTimeout(() => {
        this.$emit('getFiles', this.files) // 向父组件传值
      }, 300)
      this.files.splice(9)
    },
    // 移除图片
    remove (index, e) {
      e.stopPropagation() // 阻止
      this.files.splice(index, 1)
      setTimeout(() => {
        this.$emit('removeFiles', index)
      }, 300)
    },
    // 引入photoSwipe(可预览、滑动)
    initPhotoSwipeFromDOM (gallerySelector) {
      let parseThumbnailElements = function (el) {
        let thumbElements = el.childNodes
        let numNodes = thumbElements.length
        let items = []
        let figureEl
        let linkEl
        let size
        let item
        for (let i = 0; i < numNodes - 1; i++) {
          figureEl = thumbElements[i]
          if (figureEl.nodeType !== 1) {
            continue
          }
          linkEl = figureEl.children[0]
          let img = new Image()
          img.src = linkEl.getAttribute('href')
          linkEl.setAttribute(
            'data-size',
            img.naturalWidth + 'x' + img.naturalHeight
          )
          size = linkEl.getAttribute('data-size').split('x')
            console.log(size)
          item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          }
          if (figureEl.children.length > 1) {
            item.title = figureEl.children[1].innerHTML
          }
          if (linkEl.children.length > 0) {
            item.msrc = linkEl.children[0].getAttribute('src')
          }
          item.el = figureEl
          items.push(item)
        }
        return items
      }
      let closest = function closest (el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn))
      }
      let onThumbnailsClick = function (e) {
        e = e || window.event
        // e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        let eTarget = e.target || e.srcElement
        let clickedListItem = closest(eTarget, function (el, e) {
          return el.tagName && el.tagName.toUpperCase() === 'FIGURE'
        })
        if (!clickedListItem) {
          return
        }
        let clickedGallery = clickedListItem.parentNode
        let childNodes = clickedListItem.parentNode.childNodes
        let numChildNodes = childNodes.length
        let nodeIndex = 0
        let index
        for (let i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue
          }
          if (childNodes[i] === clickedListItem) {
            index = nodeIndex
            break
          }
          nodeIndex++
        }
        if (index >= 0) {
          openPhotoSwipe(index, clickedGallery)
        }
        return false
      }
      let photoswipeParseHash = function () {
        let hash = window.location.hash.substring(1)
        let params = {}
        if (hash.length < 5) {
          return params
        }
        let vars = hash.split('&')
        for (let i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue
          }
          let pair = vars[i].split('=')
          if (pair.length < 2) {
            continue
          }
          params[pair[0]] = pair[1]
        }
        if (params.gid) {
          params.gid = parseInt(params.gid, 10)
        }
        return params
      }
      let openPhotoSwipe = function (
        index,
        galleryElement,
        disableAnimation,
        fromURL
        ) {
        let pswpElement = document.querySelectorAll('.pswp')[0]
        let gallery
        let options
        let items
        items = parseThumbnailElements(galleryElement)
        options = {
          history: false,
          tapToClose: true,
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),
          getThumbBoundsFn: function (index) {
            let thumbnail = items[index].el.getElementsByClassName('zoomImage')[0]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          }
        }
        if (fromURL) {
          if (options.galleryPIDs) {
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid === index) {
                options.index = j
                break
              }
            }
          } else {
            options.index = parseInt(index, 10) - 1
          }
        } else {
          options.index = parseInt(index, 10)
        }
        if (isNaN(options.index)) {
          return ''
        }
        if (disableAnimation) {
          options.showAnimationDuration = 0
        }

        gallery = new PhotoSwipe(
          pswpElement,
          PhotoSwipeUI_Default,
          items,
          options
        )
        gallery.init()
      }
      let galleryElements = document.querySelectorAll(gallerySelector)
      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1)
        galleryElements[i].onclick = onThumbnailsClick
      }
      let hashData = photoswipeParseHash()
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(
          hashData.pid,
          galleryElements[hashData.gid - 1],
          true,
          true
        )
      }
    }
  },
  mounted () {
    this.initPhotoSwipeFromDOM('.my-gallery')
  }
}
</script>

<style lang="scss" scoped>

.zoomImage{
  width:100%;
  height:0;
  padding-bottom: 100%;
  border-radius: 5px;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}
#imgUploader {
  flex: 1;
  margin-top: auto;
  .file-list {
  padding: 10px 0px;
  &::after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
  }
  .file-remove {// 删除图片
    position: absolute;
    font-size: 12px;
    right: 5px;
    top: 1px;
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1000;
  }

  &:hover .file-remove {
    display: inline;
  }
  }
}
.add {
  width: 100%;
  height: 101px;
  float: left;
  text-align: center;
  line-height: 110px;
  // font-size: 1.4rem;
  font-weight: 100;
  cursor: pointer;
  border: 1px dashed #ccc;
  color: #999;
  position: relative;
  // background: #f2f2f2;
  @media screen and(min-width:768px) and(max-width:1024px) {
  height: 180px;
  line-height: 180px;
  font-size: 56px;
  }
  .fa {
  font-size: 1.4em;
  color: #7dd2d9;
  }
}
.uploadBtn {
  position: relative;
  .empty {
  // position: absolute;
  right: 0;
  bottom: 0;
  background-color: #eee;
  color: #fff;
  padding: 0.2em 1em;
  }
}

.thumbnails {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  .thumbnail {
  position: relative;
  margin: 0 0 10px 0;
  padding-right: 5px;
  width: 33%;
  box-sizing: border-box;
  height: 110px;
  @media screen and(min-width:768px) and(max-width:1024px) {
    height: 180px;
  }
  // &:nth-child(3n){
  //   padding-right: 0;
  // }
  .img-wrapper {
    position: relative;
    display: flex;
    height: 110px;
    @media screen and(min-width:768px) and(max-width:1024px) {
    height: 180px;
    }
    img {
    width: auto;
    height: auto;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    }
  }
  }
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  // height: 104px;
  opacity: 0;
}
</style>
